"use client";


import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  message: z.string().trim().min(5, "Tell us a little more").max(1500),
});

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  return (
    <div>
      <section className="container-page py-16">
        <div className="max-w-2xl">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Talk to a specialist
          </h1>
          <p className="mt-5 text-md md:text-lg text-gray-600">
            Whether you are evaluating a potential financing opportunity or simply exploring your options, we welcome the opportunity to learn more about your business. 
            <br/><br/>
            Tell us about your company, your financing objectives, and where you are headed. Our team will be in touch to determine whether Iris may be the right financing partner for your business.
          </p>
        </div>
      </section>

      <section className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "info@irisprivateequitygroup.com" },
              { icon: Phone, label: "Phone", value: "+1 4438574714" },
              { icon: MapPin, label: "Office", value: "1000 NW NORTH RIVER DR, MIAMI, US" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand-deep">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">{label}</p>
                  <p className="mt-1 font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            className="rounded-3xl border border-border bg-white p-8 shadow-soft md:p-10"
            onSubmit={async (e) => {
              e.preventDefault();
              const parsed = schema.safeParse(form);
              if (!parsed.success) {
                const errs: Record<string, string> = {};
                parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
                setErrors(errs);
                return;
              }
              setErrors({});
              setSubmitting(true);
              try {
                const res = await fetch("/api/leads", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(parsed.data),
                });
                if (!res.ok) throw new Error("Request failed");
                toast.success("Thanks! We'll be in touch shortly.");
                setForm({ name: "", email: "", phone: "", message: "" });
              } catch {
                toast.error("Something went wrong. Please try again.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                  placeholder="Jane Cooper"
                  autoComplete="name"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </Field>
              <Field label="Phone" error={errors.phone} className="md:col-span-2">
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input"
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                />
              </Field>
              <Field label="How can we help?" error={errors.message} className="md:col-span-2">
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input min-h-[140px] resize-y py-3"
                  placeholder="Tell us about your business and what you're looking to fund…"
                />
              </Field>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-deep disabled:opacity-60 md:w-auto"
            >
              {submitting ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </section>
      <style>{`
        .input {
          width: 100%;
          height: 48px;
          border-radius: 12px;
          border: 1px solid #ccc;
          background: var(--background);
          padding: 0 14px;
          font-size: 14px;
          outline: none;
          transition: border-color .15s;
        }
        .input:focus { border-color: var(--brand); }
      `}</style>
    </div>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
