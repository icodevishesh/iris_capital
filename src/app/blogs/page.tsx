"use client";

import Link from "next/link";
import { Search, ArrowRight, Clock, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const CATEGORIES = ["All", "Funding 101", "Growth", "Cash Flow", "Case Studies"] as const;

type Blog = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  category: (typeof CATEGORIES)[number];
  bannerImage: string;
  content: string;
  createdAt: string;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function readMinutes(html?: string) {
  if (!html) return 1;
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function BannerImage({ blog, className }: { blog: Blog; className?: string }) {
  if (blog.bannerImage) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={blog.bannerImage} alt={blog.title} loading="lazy" className={className} />;
  }
  return (
    <div
      className={`grid place-items-center bg-gradient-to-br from-brand/15 to-brand/5 ${className ?? ""}`}
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-brand-deep">
        {blog.category}
      </span>
    </div>
  );
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setBlogs(data.blogs);
      } catch {
        // Silent fail on public page; show empty state.
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    return blogs.filter((a) => {
      const inCat = cat === "All" || a.category === cat;
      const inQ =
        !q.trim() ||
        a.title.toLowerCase().includes(q.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(q.toLowerCase());
      return inCat && inQ;
    });
  }, [blogs, q, cat]);

  const featured = blogs[0];
  const rest = blogs.slice(1);
  const grid = q || cat !== "All" ? filtered : rest;

  return (
    <div>
      <section className="container-page py-8 md:py-16">
        <div className="max-w-2xl">
          <span className="eyebrow">Blog</span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Insights for growing businesses
          </h1>
          <p className="mt-5 text-md md:text-lg text-gray-600">
            Guides, playbooks, and honest takes on funding and running a small business.
          </p>
        </div>
      </section>

      {loading ? (
        <section className="container-page flex items-center justify-center gap-2 py-24 text-sm text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading articles…
        </section>
      ) : blogs.length === 0 ? (
        <section className="container-page py-24 text-center text-gray-600">
          No articles published yet. Check back soon.
        </section>
      ) : (
        <>
          {featured && (
            <section className="container-page">
              <Link
                href={`/blogs/${featured.slug || featured.id}`}
                className="group grid overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-all hover:shadow-elevated md:grid-cols-[340px_1fr] lg:grid-cols-[400px_1fr]"
              >
                <div className="h-60 overflow-hidden md:h-[300px]">
                  <BannerImage
                    blog={featured}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <span className="eyebrow w-fit text-[11px]">Featured</span>
                  <h2 className="mt-3 text-xl font-bold leading-tight tracking-tight md:text-2xl lg:text-3xl">
                    {featured.title}
                  </h2>
                  {featured.subtitle && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{featured.subtitle}</p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                    <span>{featured.author}</span>
                    <span>·</span>
                    <span>{formatDate(featured.createdAt)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {readMinutes(featured.content)} min read
                    </span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-deep group-hover:underline">
                    Read article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </section>
          )}

          <section className="container-page mt-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search articles"
                  className="h-11 w-full rounded-lg border border-input bg-white pl-10 pr-4 text-sm outline-none transition-colors focus:border-brand"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      cat === c
                        ? "bg-brand text-brand-foreground"
                        : "border border-border bg-white text-gray-600 hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="container-page mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {grid.map((a) => (
                <Link
                  href={`/blogs/${a.slug || a.id}`}
                  key={a.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <BannerImage
                      blog={a}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-deep">
                      {a.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold leading-snug">{a.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-gray-600">{a.subtitle}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
                      <span>{formatDate(a.createdAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {readMinutes(a.content)} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {(q || cat !== "All") && filtered.length === 0 && (
              <p className="mt-8 text-center text-sm text-gray-600">
                No articles match your search.
              </p>
            )}
          </section>
        </>
      )}

      <section className="container-page mt-24">
        <div className="rounded-3xl border border-border bg-white p-10 shadow-soft md:p-16">
          <div className="mx-auto max-w-xl text-center">
            <span className="eyebrow">Newsletter</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Monthly insights, in your inbox
            </h2>
            <p className="mt-3 text-gray-600">
              Short, useful briefings for small business owners. Unsubscribe anytime.
            </p>
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) return toast.error("Enter a valid email");
                toast.success("You're subscribed. Thanks!");
                setEmail("");
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-12 flex-1 rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-brand"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-deep"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
