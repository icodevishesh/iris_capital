"use client";

import { useEffect, useRef, useState } from "react";
import {
  Edit3,
  Plus,
  Trash2,
  X,
  Loader2,
  Inbox,
  ImageIcon,
  Eye,
  Code2,
} from "lucide-react";
import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";
import { useBlogsData, ADMIN_KEYS } from "@/lib/hooks/use-admin-queries";

const CATEGORIES = ["Funding 101", "Growth", "Cash Flow", "Case Studies"] as const;
type Category = (typeof CATEGORIES)[number];

type Post = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  author: string;
  category: Category;
  bannerImage: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
};

// `slug` is derived from the title on save, so it isn't part of the editable draft.
type Draft = Omit<Post, "id" | "slug" | "updatedAt"> & { id?: string };

// Build a URL-friendly slug from a title.
// e.g. "This is Iris Capital" -> "this-is-iris-capital"
function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

function toDateInput(iso: string) {
  try {
    return new Date(iso).toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

export default function BlogsAdmin() {
  const { data: posts = [], isLoading: loading } = useBlogsData();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Draft | null>(null);

  const startNew = () =>
    setEditing({
      title: "",
      subtitle: "",
      author: "",
      category: "Funding 101",
      bannerImage: "",
      content: "",
      createdAt: new Date().toISOString(),
    });

  const remove = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.blogs });
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const save = async (draft: Draft) => {
    const payload = {
      title: draft.title,
      slug: slugify(draft.title),
      subtitle: draft.subtitle,
      author: draft.author,
      category: draft.category,
      bannerImage: draft.bannerImage,
      content: draft.content,
      createdAt: draft.createdAt,
    };
    try {
      const res = await fetch(
        draft.id ? `/api/blogs/${draft.id}` : "/api/blogs",
        {
          method: draft.id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed");
      }
      toast.success(draft.id ? "Post updated" : "Post published");
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.blogs });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save post");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blogs</h1>
          <p className="mt-1 text-sm text-gray-600">Create, edit, and publish articles.</p>
        </div>
        <button
          onClick={startNew}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground shadow-soft hover:bg-brand-deep"
        >
          <Plus className="h-4 w-4" /> Add blog
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading posts…
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-gray-400">
              <Inbox className="h-6 w-6" />
            </div>
            <p className="text-sm text-gray-600">No blog posts yet.</p>
            <button
              onClick={startNew}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground hover:bg-brand-deep"
            >
              <Plus className="h-4 w-4" /> Create your first post
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-600">
                  <th className="p-4 font-semibold">Post</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Author</th>
                  <th className="p-4 font-semibold">Published</th>
                  <th className="p-4 font-semibold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-600/5">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {p.bannerImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.bannerImage}
                            alt=""
                            loading="lazy"
                            className="h-12 w-16 shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="grid h-12 w-16 shrink-0 place-items-center rounded-lg bg-muted text-gray-400">
                            <ImageIcon className="h-4 w-4" />
                          </div>
                        )}
                        <div className="min-w-0 max-w-md">
                          <p className="line-clamp-1 font-medium">{p.title}</p>
                          {p.subtitle && (
                            <p className="line-clamp-1 text-xs text-gray-600">{p.subtitle}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{p.category}</td>
                    <td className="p-4 text-gray-600">{p.author}</td>
                    <td className="p-4 text-gray-600">{formatDate(p.createdAt)}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditing(p)}
                          aria-label="Edit"
                          className="grid h-9 w-9 place-items-center rounded-lg border border-border text-gray-600 hover:bg-accent hover:text-blue-600"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => remove(p.id)}
                          aria-label="Delete"
                          className="grid h-9 w-9 place-items-center rounded-lg border border-border text-red-600 hover:bg-red-600/10 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <PostEditor draft={editing} onClose={() => setEditing(null)} onSave={save} />
      )}
    </div>
  );
}

function PostEditor({
  draft,
  onClose,
  onSave,
}: {
  draft: Draft;
  onClose: () => void;
  onSave: (p: Draft) => void;
}) {
  const [p, setP] = useState<Draft>(draft);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onBanner = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be under 3MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setP((prev) => ({ ...prev, bannerImage: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    if (!p.title.trim()) return toast.error("Title is required");
    if (!p.author.trim()) return toast.error("Author name is required");
    if (!p.content.trim()) return toast.error("Content is required");
    setSaving(true);
    await onSave(p);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-2xl flex-col bg-card shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border p-3">
          <h2 className="text-xl font-semibold">
            {p.id ? "Edit Blog" : "Add Blog"}
          </h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-lg text-gray-600 hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          {/* Banner image */}
          <div>
            <span className="mb-1.5 block text-sm font-medium">Banner image</span>
            <div
              onClick={() => fileRef.current?.click()}
              className="relative flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-background transition-colors hover:border-brand/40"
              style={{ minHeight: 160 }}
            >
              {p.bannerImage ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.bannerImage} alt="Banner preview" loading="lazy" className="h-40 w-full object-cover" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setP({ ...p, bannerImage: "" });
                    }}
                    className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-black/60 text-white hover:bg-black/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 py-8 text-gray-600">
                  <ImageIcon className="h-6 w-6" />
                  <p className="text-sm font-medium">Click to upload a banner</p>
                  <p className="text-xs">PNG or JPG, up to 3MB</p>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onBanner(e.target.files?.[0])}
            />
          </div>

          <Field label="Title">
            <input
              value={p.title}
              onChange={(e) => setP({ ...p, title: e.target.value })}
              className="h-10 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="How to choose the right funding"
            />
          </Field>

          <Field label="Subtitle">
            <input
              value={p.subtitle}
              onChange={(e) => setP({ ...p, subtitle: e.target.value })}
              className="h-10 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="A short supporting line"
            />
          </Field>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Author name">
              <input
                value={p.author}
                onChange={(e) => setP({ ...p, author: e.target.value })}
                className="h-10 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                placeholder="Ana Ruiz"
              />
            </Field>
            <Field label="Category">
              <select
                value={p.category}
                onChange={(e) => setP({ ...p, category: e.target.value as Category })}
                className="h-10 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Publish date">
            <input
              type="date"
              value={toDateInput(p.createdAt)}
              onChange={(e) =>
                setP({
                  ...p,
                  createdAt: new Date(e.target.value).toISOString(),
                })
              }
              className="h-10 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </Field>

          {/* Content — HTML supported */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium">Content (HTML supported)</span>
              <button
                type="button"
                onClick={() => setPreview((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-gray-600 hover:text-foreground"
              >
                {preview ? (
                  <>
                    <Code2 className="h-3.5 w-3.5" /> Edit HTML
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5" /> Preview
                  </>
                )}
              </button>
            </div>
            {preview ? (
              <div
                className="min-h-[220px] rounded-lg border border-border bg-background p-4 text-sm [&_a]:text-brand [&_a]:underline [&_h1]:my-2 [&_h1]:text-xl [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-bold [&_h3]:mb-1 [&_h3]:mt-3 [&_h3]:text-base [&_h3]:font-bold [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: p.content || "<p class='text-gray-400'>Nothing to preview.</p>" }}
              />
            ) : (
              <textarea
                value={p.content}
                onChange={(e) => setP({ ...p, content: e.target.value })}
                className="min-h-[220px] w-full rounded-lg border border-border bg-background p-3.5 font-mono text-[13px] leading-relaxed text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                placeholder="<h2>Section heading</h2>\n<p>Write your article using HTML tags for formatting…</p>\n<ul>\n  <li>Point one</li>\n</ul>"
              />
            )}
            <p className="mt-1.5 text-xs text-gray-600">
              Use tags like <code>&lt;h2&gt;</code>, <code>&lt;p&gt;</code>,{" "}
              <code>&lt;strong&gt;</code>, <code>&lt;ul&gt;</code>, and <code>&lt;a&gt;</code> for formatting.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border p-3">
          <button
            onClick={onClose}
            className="h-10 rounded-lg border border-border bg-background px-4 text-sm font-semibold hover:bg-accent"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-brand-foreground hover:bg-brand-deep disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {p.id ? "Save changes" : "Publish post"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
