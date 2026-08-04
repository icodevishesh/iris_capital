"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  Upload,
  X,
  Building2,
  User,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const step1Schema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  businessName: z.string().trim().min(1, "Business name is required").max(160),
  businessAddress: z.string().trim().min(5, "Enter a valid address").max(300),
});

const step2Schema = z.object({
  timeInBusiness: z.string().min(1, "Select an option"),
  industry: z.string().min(1, "Select an industry"),
  monthlyRevenue: z.string().min(1, "Select revenue range"),
  requestedAmount: z.string().min(1, "Select funding amount"),
});

const step4Schema = z.object({
  consent: z.literal(true, { message: "You must agree to continue" }),
});

const STEPS = [
  { n: 1, title: "Applicant", icon: User },
  { n: 2, title: "Business", icon: Building2 },
  { n: 3, title: "Documents", icon: FileText },
  { n: 4, title: "Review", icon: ShieldCheck },
];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessAddress: "",
    timeInBusiness: "",
    industry: "",
    monthlyRevenue: "",
    requestedAmount: "",
    consent: false,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const progress = useMemo(() => ((step - 1) / STEPS.length) * 100 + 12, [step]);

  const validate = () => {
    let schema;
    if (step === 1) schema = step1Schema;
    else if (step === 2) schema = step2Schema;
    else if (step === 4) schema = step4Schema;
    if (!schema) return true;
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const next = () => {
    if (!validate()) return;
    if (step === 3 && files.length === 0) {
      toast.error("Please upload at least one bank statement");
      return;
    }
    setStep((s) => Math.min(4, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  };

  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          businessName: form.businessName,
          businessAddress: form.businessAddress,
          timeInBusiness: form.timeInBusiness,
          industry: form.industry,
          monthlyRevenue: form.monthlyRevenue,
          requestedAmount: form.requestedAmount,
          documents: files.map((f) => ({
            name: f.name,
            size: `${Math.max(1, Math.round(f.size / 1024))} KB`,
          })),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Could not submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <SuccessScreen />;

  return (
    <div className="bg-background">
      <section className="container-page pt-14 pb-6 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Application</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Apply for funding
          </h1>
          <p className="mt-3 text-gray-600">
            5 minutes. Soft credit check. No obligation.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="mb-8 flex items-center justify-between gap-2">
            {STEPS.map(({ n, title, icon: Icon }) => {
              const active = step === n;
              const done = step > n;
              return (
                <div key={n} className="flex flex-1 items-center gap-3">
                  <div
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg border transition-all ${
                      done
                        ? "border-brand bg-brand text-brand-foreground"
                        : active
                          ? "border-brand bg-brand/10 text-brand-deep"
                          : "border-border bg-card text-gray-600"
                    }`}
                  >
                    {done ? <Check className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                      Step {n}
                    </p>
                    <p className={`text-sm font-semibold ${active || done ? "text-foreground" : "text-gray-600"}`}>
                      {title}
                    </p>
                  </div>
                  {n < STEPS.length && <div className="mx-2 hidden h-px flex-1 bg-border md:block" />}
                </div>
              );
            })}
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-brand transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-white p-6 shadow-soft md:p-10">
          {step === 1 && <Step1 form={form} setForm={setForm} errors={errors} />}
          {step === 2 && <Step2 form={form} setForm={setForm} errors={errors} />}
          {step === 3 && <Step3 files={files} setFiles={setFiles} />}
          {step === 4 && <Step4 form={form} setForm={setForm} files={files} errors={errors} />}

          <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-accent disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < 4 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-deep hover:-translate-y-0.5"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-deep hover:-translate-y-0.5 disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit application"} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-gray-600">
          Applying will not affect your credit score. IRIS Capital Partners uses a soft pull to review your application.
        </p>
      </section>
      <FormStyles />
    </div>
  );
}

/* ---------------- Steps ---------------- */

function Step1({
  form,
  setForm,
  errors,
}: {
  form: any;
  setForm: (v: any) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Tell us about you</h2>
      <p className="mt-1 text-sm text-gray-600">We&apos;ll use this to reach out with your offer.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={errors.fullName}>
          <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="input" placeholder="Jane Cooper" autoComplete="name" />
        </Field>
        <Field label="Email" error={errors.email}>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="jane@company.com" autoComplete="email" />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" placeholder="(555) 123-4567" autoComplete="tel" />
        </Field>
        <Field label="Business name" error={errors.businessName}>
          <input value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} className="input" placeholder="Cooper Coffee Co." autoComplete="organization" />
        </Field>
        <Field label="Business address" error={errors.businessAddress} className="md:col-span-2">
          <input value={form.businessAddress} onChange={(e) => setForm({ ...form, businessAddress: e.target.value })} className="input" placeholder="123 Main St, Austin, TX 78701" autoComplete="street-address" />
        </Field>
      </div>
    </div>
  );
}

function Step2({
  form,
  setForm,
  errors,
}: {
  form: any;
  setForm: (v: any) => void;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">About your business</h2>
      <p className="mt-1 text-sm text-gray-600">This helps us structure the right funding for you.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Field label="Time in business" error={errors.timeInBusiness}>
          <select value={form.timeInBusiness} onChange={(e) => setForm({ ...form, timeInBusiness: e.target.value })} className="input">
            <option value="">Select…</option>
            <option>Less than 6 months</option>
            <option>6–12 months</option>
            <option>1–3 years</option>
            <option>3+ years</option>
          </select>
        </Field>
        <Field label="Industry" error={errors.industry}>
          <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} className="input">
            <option value="">Select…</option>
            {["Retail", "Restaurant", "Construction", "Healthcare", "Professional Services", "eCommerce", "Manufacturing", "Other"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Monthly revenue" error={errors.monthlyRevenue}>
          <select value={form.monthlyRevenue} onChange={(e) => setForm({ ...form, monthlyRevenue: e.target.value })} className="input">
            <option value="">Select…</option>
            {["Under $10K", "$10K – $25K", "$25K – $50K", "$50K – $100K", "$100K+"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Requested funding" error={errors.requestedAmount}>
          <select value={form.requestedAmount} onChange={(e) => setForm({ ...form, requestedAmount: e.target.value })} className="input">
            <option value="">Select…</option>
            {["$5K – $25K", "$25K – $50K", "$50K – $100K", "$100K – $250K", "$250K – $500K"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>
    </div>
  );
}

function Step3({ files, setFiles }: { files: File[]; setFiles: (f: File[]) => void }) {
  const [dragging, setDragging] = useState(false);
  const onDrop = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      const arr = Array.from(list);
      const valid: File[] = [];
      arr.forEach((f) => {
        const ok = ["application/pdf", "image/jpeg", "image/png"].includes(f.type);
        const size = f.size <= 10 * 1024 * 1024;
        if (!ok) return toast.error(`${f.name} — unsupported type (PDF, JPG, PNG only)`);
        if (!size) return toast.error(`${f.name} — file over 10MB`);
        valid.push(f);
      });
      setFiles([...files, ...valid]);
    },
    [files, setFiles],
  );

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Upload documents</h2>
      <p className="mt-1 text-sm text-gray-600">
        Please upload your last 3 months of business bank statements. PDF, JPG, or PNG. Up to 10MB per file.
      </p>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          onDrop(e.dataTransfer.files);
        }}
        className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
          dragging ? "border-brand bg-brand/5" : "border-border bg-background hover:border-brand/40"
        }`}
      >
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand-deep">
          <Upload className="h-6 w-6" />
        </div>
        <p className="mt-4 text-base font-semibold">Drag & drop files here</p>
        <p className="mt-1 text-sm text-gray-600">or click to browse</p>
        <input
          type="file"
          multiple
          accept="application/pdf,image/jpeg,image/png"
          className="hidden"
          onChange={(e) => onDrop(e.target.files)}
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-6 space-y-2">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand-deep">
                <FileText className="h-4 w-4" />
              </div>
              <div className="flex-1 truncate">
                <p className="truncate text-sm font-medium">{f.name}</p>
                <p className="text-xs text-gray-600">{(f.size / 1024).toFixed(0)} KB</p>
              </div>
              <button
                type="button"
                aria-label={`Remove ${f.name}`}
                onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                className="grid h-9 w-9 place-items-center rounded-lg text-gray-600 hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Step4({
  form,
  setForm,
  files,
  errors,
}: {
  form: any;
  setForm: (v: any) => void;
  files: File[];
  errors: Record<string, string>;
}) {
  const rows: [string, string][] = [
    ["Full name", form.fullName],
    ["Email", form.email],
    ["Phone", form.phone],
    ["Business", form.businessName],
    ["Address", form.businessAddress],
    ["Time in business", form.timeInBusiness],
    ["Industry", form.industry],
    ["Monthly revenue", form.monthlyRevenue],
    ["Requested funding", form.requestedAmount],
    ["Documents", `${files.length} file${files.length === 1 ? "" : "s"}`],
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Review your application</h2>
      <p className="mt-1 text-sm text-gray-600">Take a moment to confirm your details before you submit.</p>
      <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-background">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[140px_1fr] gap-4 p-4 text-sm md:grid-cols-[200px_1fr]">
            <dt className="text-gray-600">{k}</dt>
            <dd className="font-medium">{v || <span className="text-gray-600">—</span>}</dd>
          </div>
        ))}
      </dl>
      <label className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-background p-4 text-sm">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-1 h-4 w-4 rounded border-input accent-[color:var(--brand)]"
        />
        <span className="text-gray-600">
          I agree to the{" "}
          <a href="#" className="font-medium text-brand-deep underline">Terms of Service</a> and{" "}
          <a href="#" className="font-medium text-brand-deep underline">Privacy Policy</a>, and consent to a soft
          credit inquiry for pre-qualification purposes.
        </span>
      </label>
      {errors.consent && <p className="mt-2 text-xs text-destructive">{errors.consent}</p>}
    </div>
  );
}

function SuccessScreen() {
  return (
    <section className="container-page py-24">
      <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-10 text-center shadow-elevated md:p-14">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-success/10 text-success">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">Thank you</h1>
        <p className="mt-3 text-gray-600">
          Your application has been received. A funding specialist will contact you shortly — often within one business day.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-deep"
          >
            Back to home
          </Link>
          <Link
            href="/blogs"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 text-sm font-semibold hover:bg-accent"
          >
            <Sparkles className="h-4 w-4" /> Read the blog
          </Link>
        </div>
      </div>
    </section>
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
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function FormStyles() {
  return (
    <style>{`
      .input {
        width: 100%;
        height: 48px;
        border-radius: 12px;
        border: 1px solid #ccc;
        background: var(--background);
        padding: 0 14px;
        font-size: 14px;
        color: var(--foreground);
        outline: none;
        transition: border-color .15s, box-shadow .15s;
      }
      .input:focus {
        border-color: var(--brand);
        box-shadow: 0 0 0 4px color-mix(in oklch, var(--brand) 15%, transparent);
      }
      select.input { appearance: none; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236b7280'><path d='M5.5 7.5l4.5 5 4.5-5z'/></svg>"); background-repeat: no-repeat; background-position: right 10px center; padding-right: 32px; }
    `}</style>
  );
}
