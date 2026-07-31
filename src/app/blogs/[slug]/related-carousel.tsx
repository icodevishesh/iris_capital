"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ArrowRight, Clock } from "lucide-react";
import type { Blog } from "@/lib/models";

type BlogWithId = Blog & { id: string };

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

export function RelatedBlogsCarousel({ blogs }: { blogs: BlogWithId[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="border-t border-border bg-slate-50/50 py-16">
      <div className="container-page max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="eyebrow text-[11px]">Keep Reading</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              Explore More Articles
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-600">
              {selectedIndex + 1} of {blogs.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={scrollPrev}
                aria-label="Previous article"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-white text-gray-600 shadow-xs transition-colors hover:bg-accent hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next article"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-white text-gray-600 shadow-xs transition-colors hover:bg-accent hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft" ref={emblaRef}>
          <div className="flex">
            {blogs.map((b) => (
              <div key={b.id} className="min-w-0 flex-[0_0_100%]">
                <Link
                  href={`/blogs/${b.slug || b.id}`}
                  className="group grid md:grid-cols-[320px_1fr] lg:grid-cols-[360px_1fr]"
                >
                  <div className="h-56 overflow-hidden md:h-[280px]">
                    {b.bannerImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={b.bannerImage}
                        alt={b.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full place-items-center bg-gradient-to-br from-brand/15 to-brand/5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-brand-deep">
                          {b.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <span className="w-fit rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand-deep">
                      {b.category}
                    </span>
                    <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight md:text-2xl">
                      {b.title}
                    </h3>
                    {b.subtitle && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{b.subtitle}</p>
                    )}
                    <div className="mt-4 flex items-center gap-3 text-xs text-gray-600">
                      <span>{b.author}</span>
                      <span>·</span>
                      <span>{formatDate(b.createdAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {readMinutes(b.content)} min
                      </span>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-deep group-hover:underline">
                      Read article <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {blogs.length > 1 && (
          <div className="mt-4 flex justify-center gap-1.5">
            {blogs.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  selectedIndex === i ? "w-6 bg-brand" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
