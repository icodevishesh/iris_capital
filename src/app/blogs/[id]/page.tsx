import Link from "next/link";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { ArrowLeft, Clock } from "lucide-react";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, serialize, type Blog } from "@/lib/models";
import { RelatedBlogsCarousel } from "./related-carousel";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function readMinutes(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

async function getBlog(id: string): Promise<(Blog & { id: string }) | null> {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  const doc = await db.collection(COLLECTIONS.blogs).findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return serialize(doc) as unknown as Blog & { id: string };
}

async function getAllBlogs(): Promise<(Blog & { id: string })[]> {
  const db = await getDb();
  const docs = await db
    .collection(COLLECTIONS.blogs)
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map((doc) => serialize(doc) as unknown as Blog & { id: string });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [blog, allBlogs] = await Promise.all([getBlog(id), getAllBlogs()]);
  if (!blog) notFound();

  const otherBlogs = allBlogs.filter((b) => b.id !== blog.id);
  const carouselBlogs = otherBlogs.length > 0 ? otherBlogs : allBlogs;

  return (
    <article>
      <section className="container-page pt-14 pb-8 md:pt-20">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight md:text-4xl">
            {blog.title}
          </h1>
          {blog.subtitle && <p className="mt-4 text-sm text-gray-500">{blog.subtitle}</p>}
          <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
            <span className="font-medium text-foreground">{blog.author}</span>
            <span>·</span>
            <span>{formatDate(blog.createdAt)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {readMinutes(blog.content)} min read
            </span>
          </div>
        </div>
      </section>

      {blog.bannerImage && (
        <section className="container-page">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.bannerImage}
              alt={blog.title}
              className="w-full max-h-[360px] md:max-h-[400px] object-cover"
            />
          </div>
        </section>
      )}

      <section className="container-page py-12">
        <div
          className="blog-content mx-auto max-w-4xl text-[17px] leading-relaxed text-foreground"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </section>

      {/* Interactive Carousel for Other Articles */}
      <RelatedBlogsCarousel blogs={carouselBlogs} />

      <style>{`
        .blog-content h1, .blog-content h2, .blog-content h3 { font-weight: 700; letter-spacing: -0.01em; margin: 1.4em 0 0.5em; }
        .blog-content h1 { font-size: 2rem; }
        .blog-content h2 { font-size: 1.6rem; }
        .blog-content h3 { font-size: 1.3rem; }
        .blog-content p { margin: 1em 0; }
        .blog-content ul, .blog-content ol { margin: 1em 0; padding-left: 1.5em; list-style: revert; }
        .blog-content li { margin: 0.35em 0; }
        .blog-content a { color: var(--brand); text-decoration: underline; }
        .blog-content img { border-radius: 12px; margin: 1.5em 0; max-width: 100%; }
        .blog-content blockquote { border-left: 3px solid var(--brand); padding-left: 1em; margin: 1.2em 0; color: #555; font-style: italic; }
        .blog-content strong { font-weight: 700; }
      `}</style>
    </article>
  );
}
