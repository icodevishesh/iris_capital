import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/mongodb";
import redis from "@/lib/redis";
import {
  BLOG_CATEGORIES,
  COLLECTIONS,
  isAuthenticated,
  serialize,
} from "@/lib/models";

export const dynamic = "force-dynamic";

const createSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().max(200).default(""),
  subtitle: z.string().trim().max(300).default(""),
  author: z.string().trim().min(1).max(120),
  category: z.enum(BLOG_CATEGORIES),
  bannerImage: z.string().trim().default(""),
  content: z.string().min(1),
  // Optional client-supplied publish date; defaults to now.
  createdAt: z.string().optional(),
});

export async function GET() {
  const cached = await redis.get("blogs");

  if (cached) {
    return NextResponse.json(
      { blogs: JSON.parse(cached) },
      {
        headers: {
          "X-Cache": "HIT",
        },
      },
    );
  }

  const db = await getDb();

  const docs = await db
    .collection(COLLECTIONS.blogs)
    .find(
      {},
      {
        projection: {
          title: 1,
          slug: 1,
          subtitle: 1,
          author: 1,
          category: 1,
          bannerImage: 1,
          createdAt: 1,
        },
      }
    )
    .sort({ createdAt: -1 })
    .toArray();

  const blogs = docs.map(serialize);

  await redis.set(
    "blogs",
    JSON.stringify(blogs),
    {
      EX: 300,
    }
  );

  return NextResponse.json(
    { blogs },
    {
      headers: {
        "X-Cache": "MISS",
      },
    }
  );
}

// export async function GET() {
//   const db = await getDb();

//   const docs = await db
//     .collection(COLLECTIONS.blogs)
//     .find({}, {
//       projection: {
//         title: 1,
//         slug: 1,
//         subtitle: 1,
//         author: 1,
//         category: 1,
//         bannerImage: 1,
//         createdAt: 1,
//       },
//     })
//     .sort({ createdAt: -1 })
//     .toArray();

//   const blogs = docs.map(serialize);

//   return NextResponse.json(
//     { blogs },
//     {
//       headers: {
//         "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
//       },
//     },
//   );
// }


export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = createSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const now = new Date().toISOString();
  const { createdAt, ...rest } = parsed.data;
  const blog = {
    ...rest,
    createdAt: createdAt ? new Date(createdAt).toISOString() : now,
    updatedAt: now,
  };
  const db = await getDb();
  const result = await db.collection(COLLECTIONS.blogs).insertOne(blog);

  // Drop the list cache so the new post shows up on the next read.
  await redis.del("blogs");

  return NextResponse.json(
    { id: result.insertedId.toString() },
    { status: 201 },
  );
}
