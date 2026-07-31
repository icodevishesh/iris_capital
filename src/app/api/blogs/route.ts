import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/mongodb";
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

// Public: list blogs (newest first). Available to everyone for the blog page.
export async function GET() {
  console.time("API");

  const db = await getDb();

  console.time("Mongo");
  const docs = await db
    .collection(COLLECTIONS.blogs)
    .find({}, {
      projection: {
        title: 1,
        slug: 1,
        subtitle: 1,
        author: 1,
        category: 1,
        bannerImage: 1,
        createdAt: 1,
      },
    })
    .sort({ createdAt: -1 })
    .toArray();
  console.timeEnd("Mongo");

  console.time("Serialize");
  const blogs = docs.map(serialize);
  console.timeEnd("Serialize");

  console.timeEnd("API");

  return NextResponse.json({ blogs });
}

// export async function GET() {
//   console.time("API");

//   console.time("DB");
//   const db = await getDb();
//   console.timeEnd("DB");

//   console.timeEnd("DB");

//   console.time("collection");
//   const docs = await db
//     .collection(COLLECTIONS.blogs)
//     .find({})
//     .sort({ createdAt: -1 })
//     .toArray();
//   console.timeEnd("collection");

//   console.time("map");
//   return NextResponse.json({ blogs: docs.map(serialize) });
//   console.timeEnd("map");

//   console.timeEnd("API");
// }

// Admin: create a blog post.
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
  return NextResponse.json(
    { id: result.insertedId.toString() },
    { status: 201 },
  );
}
