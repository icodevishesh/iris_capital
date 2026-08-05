import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
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

// Cache a single blog for 5 hours (in seconds).
const BLOG_CACHE_TTL = 5 * 60 * 60;
const blogKey = (id: string) => `blog:${id}`;

const updateSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().max(200).default(""),
  subtitle: z.string().trim().max(300).default(""),
  author: z.string().trim().min(1).max(120),
  category: z.enum(BLOG_CATEGORIES),
  bannerImage: z.string().trim().default(""),
  content: z.string().min(1),
  createdAt: z.string().optional(),
});

// Public: fetch a single blog post.
export async function GET(
  _request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const cached = await redis.get(blogKey(id));
  if (cached) {
    return NextResponse.json(
      { blog: JSON.parse(cached) },
      { headers: { "X-Cache": "HIT" } },
    );
  }

  const db = await getDb();
  const doc = await db
    .collection(COLLECTIONS.blogs)
    .findOne({ _id: new ObjectId(id) });
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const blog = serialize(doc);
  await redis.set(blogKey(id), JSON.stringify(blog), { EX: BLOG_CACHE_TTL });

  return NextResponse.json({ blog }, { headers: { "X-Cache": "MISS" } });
}

// Admin: update a blog post.
export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { createdAt, ...rest } = parsed.data;
  const update: Record<string, unknown> = {
    ...rest,
    updatedAt: new Date().toISOString(),
  };
  if (createdAt) update.createdAt = new Date(createdAt).toISOString();

  const db = await getDb();
  const result = await db
    .collection(COLLECTIONS.blogs)
    .updateOne({ _id: new ObjectId(id) }, { $set: update });
  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Drop stale caches so the edit is visible on the next read.
  await redis.del([blogKey(id), "blogs"]);

  return NextResponse.json({ ok: true });
}

// Admin: delete a blog post.
export async function DELETE(
  _request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const db = await getDb();
  const result = await db
    .collection(COLLECTIONS.blogs)
    .deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Drop stale caches so the deleted post disappears on the next read.
  await redis.del([blogKey(id), "blogs"]);

  return NextResponse.json({ ok: true });
}
