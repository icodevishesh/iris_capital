import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  ArrowRight,
  Layers,
  Phone,
} from "lucide-react";
import professionalGirlImg from "@/assets/boardroom-exec-yh7islmn.jpg";
import businessExecutive from "@/assets/8e6e096a-6b3c-4f0e-b263-43860b3e4f85.jpeg"

import { CtaLink } from "@/components/brand";

export const metadata: Metadata = {
  title: "IRIS Private Equity Group — Fast Business Funding, Built on Trust",
  description:
    "Business term loans and lines of credit from $5,000 to $500,000. Transparent terms, fast approvals, and same-day funding for U.S. small businesses.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      {/* <Highlights /> */}
      <HowItWorks />
      <PrivateCredit />
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
              Private Credit.
              <br />
              <span className="text-brand-deep">Built on trust.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-700">
              Iris Private Equity Group provides privately originated credit to small and middle-market businesses across North America, with a focus on historically resilient industries.<br/><br/>
              We serve as a trusted partner, helping business owners and management teams to provide flexible financing solutions at competitive costs of capital to support their long-term growth.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink to="/apply" className="bg-brand-deep">Apply</CtaLink>
              <CtaLink to="/contact" variant="secondary" className="border border-[#032B6B]" >
                <Phone className="h-4 w-4" />
                Speak with us
              </CtaLink>
            </div>
            {/* <div className="mt-10 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700 sm:gap-6 sm:text-sm">
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
            </div> */}
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-gray-300 bg-card shadow-elevated">
              <Image
                src={professionalGirlImg}
                alt="Hero Image"
                width={1400}
                height={1000}
                priority
                className="aspect-[4/3] w-full object-cover md:aspect-[6/5]"
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

function HowItWorks() {
  const steps = [
    {
      n: "Step 1",
      title: "Apply",
      body: "Complete our secure online application.",
    },
    {
      n: "Step 2",
      title: "Review",
      body: "Our team evaluates your business, financial profile, and financing objectives.",
    },
    {
      n: "Step 3",
      title: "Finance",
      body: "We work efficiently to deliver a financing solution aligned with your needs.",
    },
  ];
  return (
    <section className="container-page py-8 md:pb-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          How it works
        </h2>
      </div>
      <div className="mt-14 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {steps.map(({ n, title, body }, i) => (
          <div
            key={n}
            className="group relative w-[85vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-3xl border border-border bg-white p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated md:w-auto md:max-w-none md:shrink"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-deep rounded-full bg-[#edf4ff] px-3.5 py-1">{n}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">{body}</p>
            {i < steps.length - 1 && (
              <div
                aria-hidden
                className="absolute right-6 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-border md:block"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-14 flex justify-center">
        <CtaLink to="/apply" className="bg-brand">Apply</CtaLink>
      </div>
    </section>
  );
}

function PrivateCredit() {
  return (
    <section className="container-page py-12 md:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white  shadow-soft">
          <Image
            src={businessExecutive}
            alt="Private credit executive in modern office"
            width={1200}
            height={900}
            priority
            className="h-auto w-full object-cover rounded-3xl"
          />
        </div>
        <div className="flex flex-col items-start max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-[#edf4ff] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-deep">
            <Layers className="h-3.5 w-3.5 text-brand-deep" />
            <span>Private Credit</span>
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-[1.15]">
            An alternative to traditional bank financing
          </h2>
          <p className="mt-6 text-base text-gray-700 leading-relaxed">
            Iris provides an alternative to traditional bank financing for businesses seeking greater flexibility, responsiveness, and certainty throughout the financing process.
          </p>
          <p className="mt-4 text-base text-gray-700 leading-relaxed">
            Traditional bank financing can involve rigid requirements, lengthy processes, and limited flexibility.
          </p>
          <p className="mt-4 text-base text-gray-700 leading-relaxed">
            At Iris, we work directly with business owners and management teams to understand their businesses and structure financing around their specific circumstances — providing businesses with financing designed to support their growth and long-term objectives.
          </p>
          <div className="mt-8">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-deep hover:-translate-y-0.5"
            >
              Apply <ArrowRight className="h-4 w-4" />
            </Link>
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
    <section className="container-page py-8">
      <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-brand p-10 text-brand-foreground shadow-elevated md:p-16">
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
