import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  ArrowRight,
  Check,
  Clock,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  FileText,
  Wallet,
  Sparkles,
  Users,
  BadgeCheck,
  HeartHandshake,
  LineChart,
  Landmark,
  Layers,
  Zap,
  Phone
} from "lucide-react";
import heroImg from "@/assets/owner-dog.jpg";
import handshakeImg from "@/assets/handshake.jpg";
import { CtaLink } from "@/components/brand";

export const metadata: Metadata = {
  title: "IRIS Capital Partners — Fast Business Funding, Built on Trust",
  description:
    "Business term loans and lines of credit from $5,000 to $500,000. Transparent terms, fast approvals, and same-day funding for U.S. small businesses.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Highlights />
      <HowItWorks />
      <Services />
      <WhyIris />
      {/* <Stats /> */}
      <CtaBanner />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(29,78,216,0.1)_0%,transparent_70%)]"
      />
      <div className="container-page py-8 md:py-16">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-foreground md:text-6xl lg:text-[4.25rem]">
              Fast business funding.
              <br />
              <span className="text-brand-deep">Built on trust.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600">
              Business funding from <strong className="font-bold text-brand-deep">$5,000 to $500,000</strong> with
              transparent terms, fast approvals, and funding available as soon as the same day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink to="/apply" className="bg-brand-deep">Apply now</CtaLink>
              <CtaLink to="/contact" variant="secondary" className="border border-[#032B6B]" >
                <Phone className="h-4 w-4" />
                Speak with us
              </CtaLink>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700 sm:gap-6 sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EBF3FF] text-[#032B6B]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span>Soft credit pull</span>
              </div>
              <div className="hidden h-8 w-px bg-gray-200 sm:block" />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EBF3FF] text-[#032B6B]">
                  <FileText className="h-5 w-5" />
                </div>
                <span>No obligation</span>
              </div>
              <div className="hidden h-8 w-px bg-gray-200 sm:block" />
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EBF3FF] text-[#032B6B]">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="leading-tight">
                  5-minute<br />application
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-gray-300 bg-card shadow-elevated">
              <Image
                src={heroImg}
                alt="Hero Image"
                width={1400}
                height={1000}
                priority
                className="aspect-[4/3] w-full object-contain md:aspect-[6/5]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  className,
  icon,
  title,
  body,
  trailing,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  trailing?: string;
}) {
  return (
    <div
      className={`hidden md:flex ${className ?? ""} min-w-[220px] items-center gap-3 rounded-2xl border border-border bg-white p-3.5 shadow-elevated`}
    >
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand-deep">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-600">{title}</p>
        <p className="text-sm font-semibold text-foreground">{body}</p>
      </div>
      {trailing && (
        <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-semibold text-success">
          {trailing}
        </span>
      )}
    </div>
  );
}

function Highlights() {
  const items = [
    { icon: DollarSign, label: "Funding", value: "$5K – $500K" },
    { icon: Clock, label: "Funding speed", value: "As fast as 24 hours" },
    { icon: ShieldCheck, label: "Collateral", value: "No collateral required" },
    { icon: TrendingUp, label: "Rates", value: "Competitive rates" },
  ];
  return (
    <section className="container-page py-8 md:py-0">
      <div className="grid gap-4 rounded-3xl border border-border bg-white p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-blue-600/5">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand-deep">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                {label}
              </p>
              <p className="mt-0.5 text-base font-semibold text-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: FileText,
      title: "Apply",
      body: "Complete our 5-minute online application. Soft credit pull only — no impact to your credit score.",
    },
    {
      n: "02",
      icon: Sparkles,
      title: "Review",
      body: "A dedicated specialist reviews your application and works with you to structure the right offer.",
    },
    {
      n: "03",
      icon: Wallet,
      title: "Receive funds",
      body: "Approve your terms, sign digitally, and receive funds in your business bank account — often the same day.",
    },
  ];
  return (
    <section className="container-page py-8 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">How it works</span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Funding in three simple steps
        </h2>
        <p className="mt-4 text-gray-600">
          A clear, human process — from application to funds in your account.
        </p>
      </div>
      <div className="mt-14 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {steps.map(({ n, icon: Icon, title, body }, i) => (
          <div
            key={n}
            className="group relative w-[85vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated md:w-auto md:max-w-none md:shrink"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-brand-foreground shadow-soft">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-5xl font-bold text-brand/10">{n}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{body}</p>
            {i < steps.length - 1 && (
              <div
                aria-hidden
                className="absolute right-6 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-border md:block"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Landmark,
      title: "Business Term Loan",
      desc: "Predictable, fixed-payment funding for expansion, equipment, hiring, or working capital.",
      bullets: ["$5K – $500K", "Terms 6–60 months", "Fixed monthly payments"],
      to: "/terms",
    },
    {
      icon: Layers,
      title: "Business Line of Credit",
      desc: "Flexible working capital you can draw on as needed. Only pay interest on what you use.",
      bullets: ["Revolving credit", "Draw anytime", "Interest on used funds only"],
      to: "/credit",
    },
  ];
  return (
    <section className="container-page py-8 md:py-0">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <span className="eyebrow">Funding solutions</span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Two flexible ways to fund your business
          </h2>
        </div>
        <Link href="/apply" className="hidden text-sm font-semibold text-brand-deep hover:underline md:inline-flex md:items-center md:gap-1">
          Start your application <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map(({ icon: Icon, title, desc, bullets, to }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated md:p-10"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand-deep">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">{desc}</p>
            <ul className="mt-6 space-y-2.5">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-success" /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Link
                href={to}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-deep hover:-translate-y-0.5"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/apply"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground hover:bg-accent"
              >
                Apply
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyIris() {
  const points = [
    { icon: Clock, title: "Fast decisions", body: "Most applications reviewed within one business day." },
    { icon: ShieldCheck, title: "Transparent terms", body: "No hidden fees. Every rate and cost explained upfront." },
    { icon: Users, title: "Experienced specialists", body: "A real funding advisor guides you from start to finish." },
    { icon: HeartHandshake, title: "Dedicated support", body: "Long-term relationships, not one-time transactions." },
    { icon: LineChart, title: "Funding solutions", body: "Term loans and lines of credit tailored to your growth." },
    { icon: BadgeCheck, title: "Trust first", body: "Straightforward answers, always. No pressure, ever." },
  ];
  return (
    <section className="py-8 md:py-16 border-y border-border bg-white/50">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:items-stretch">
          <div className="flex flex-col">
            <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border shadow-elevated">
              <Image
                src={handshakeImg}
                alt="Business partners shaking hands"
                width={1400}
                height={1000}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <div>
              <span className="eyebrow">Why IRIS</span>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Financing that respects your time and your business
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-600">
              We work with small and medium businesses across the United States to
              structure funding that actually fits — and stands behind it with real support.
            </p>
            <div className="mt-6 sm:mt-8 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
              {points.map(({ icon: Icon, title, body }) => (
                <div key={title} className="w-[75vw] max-w-[260px] shrink-0 snap-center rounded-2xl border border-border bg-white p-5 sm:w-auto sm:max-w-none sm:shrink">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand-deep">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h4 className="mt-3 text-sm font-semibold">{title}</h4>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// function Stats() {
//   const stats = [
//     { v: "$1.4B+", l: "Loans processed" },
//     { v: "24 hours", l: "Average approval time" },
//     { v: "4.9 / 5", l: "Customer satisfaction" },
//     { v: "12,000+", l: "Businesses funded" },
//   ];
//   return (
//     <section className="container-page mt-28">
//       <div className="grid gap-6 rounded-3xl border border-border bg-white p-8 shadow-soft sm:grid-cols-2 lg:grid-cols-4 lg:p-12">
//         {stats.map(({ v, l }) => (
//           <div key={l} className="text-center sm:text-left">
//             <p className="text-4xl font-bold tracking-tight text-brand-deep md:text-5xl">{v}</p>
//             <p className="mt-2 text-sm font-medium text-gray-600">{l}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

function CtaBanner() {
  return (
    <section className="container-page py-8 md:pt-16">
      <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-r from-[#032B6B] via-[#032B6B] to-[#022153] p-10 text-brand-foreground shadow-elevated md:p-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
              Ready to grow your business?
            </h2>
            <p className="mt-3 max-w-lg text-white/80">
              Apply in five minutes. Get a decision — often within 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-brand-deep transition-all hover:bg-white/95 hover:-translate-y-0.5"
            >
              Apply today <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-6 text-sm font-semibold text-white hover:bg-white/10"
            >
              Talk to a specialist
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
