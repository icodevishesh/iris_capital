import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  ArrowRight,
  Check,
  Clock,
  Handshake,
  Layers,
  Scale,
  ShieldCheck,
  Landmark,
} from "lucide-react";
import professionalGirlImg from "@/assets/team-meeting-CpfSKKcs.jpg";
import professionalHandshakeImg from "@/assets/professional-handshake.png";

export const metadata: Metadata = {
  title: "Private Credit — IRIS Private Equity Group",
  description:
    "An alternative to traditional bank financing. Privately originated credit structured around the operating reality of your business.",
};

export default function PrivateCreditPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Section 1: Hero */}
      <section className="container-page py-12 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="eyebrow">
              <Layers className="h-3.5 w-3.5" /> PRIVATE CREDIT
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl text-foreground">
              An alternative to traditional bank financing
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-700">
              Iris provides an alternative to traditional bank financing for businesses seeking greater flexibility, responsiveness, and certainty throughout the financing process.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
              Traditional bank financing can involve rigid requirements, lengthy processes, and limited flexibility.
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-700">
              At Iris, we work directly with business owners and management teams to understand their businesses and structure financing around their specific circumstances - providing businesses with financing designed to support their growth and long-term objectives.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/apply"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-deep hover:-translate-y-0.5"
              >
                Apply <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-elevated">
            <Image
              src={professionalGirlImg}
              alt="Private credit executive in modern office"
              width={1200}
              height={900}
              priority
              className="aspect-[9/8] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Three Feature Cards */}
      {/* <section className="container-page py-6 md:py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Scale,
              title: "Structured with judgment",
              body: "Every facility is underwritten by people, not scorecards. We look at the business, its cash flow, and its trajectory.",
            },
            {
              icon: Handshake,
              title: "A direct relationship",
              body: "You work with the decision-makers throughout — from first conversation to closing and beyond.",
            },
            {
              icon: Clock,
              title: "A responsive process",
              body: "Clear communication and timely answers, so you can plan with confidence instead of waiting on a committee.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group flex flex-col items-start rounded-3xl border border-gray-200/80 bg-white p-7 sm:p-8 shadow-soft transition-all hover:shadow-elevated hover:-translate-y-0.5"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf4ff] text-brand-deep">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{body}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Section 3: Who We Work With */}
      <section className="container-page py-12 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-elevated">
            <Image
              src={professionalHandshakeImg}
              alt="Executive team meeting in boardroom"
              width={1400}
              height={1000}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/11]"
            />
          </div>
          <div>
            <span className="eyebrow">WHO WE WORK WITH</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
              Businesses that deserve a real conversation
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-gray-600">
              We finance established small and middle-market companies across a wide range of industries.
            </p>
            <div className="mt-8 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {[
                "Growth and expansion capital",
                "Working capital and liquidity",
                "Equipment and facilities",
                "Acquisitions and buyouts",
                "Recapitalizations",
                "Bridge and transitional financing",
              ].map((bullet) => (
                <div key={bullet} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                  <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Our Approach */}
      {/* <section className="py-12 md:py-20 border-t border-border/60 bg-white/40">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">OUR APPROACH</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              How we evaluate an opportunity
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                num: "01",
                icon: Landmark,
                title: "Understand the business",
                body: "We start with the operating reality — what the company does, how it earns, and where it is going.",
              },
              {
                num: "02",
                icon: ShieldCheck,
                title: "Assess the risk honestly",
                body: "We are direct about what works and what does not, so nobody spends time on a structure that will not hold.",
              },
              {
                num: "03",
                icon: Handshake,
                title: "Structure and finance",
                body: "We propose terms designed to be sustainable, then move to close with clear expectations on both sides.",
              },
            ].map(({ num, icon: Icon, title, body }) => (
              <div
                key={num}
                className="group relative flex flex-col items-start rounded-3xl border border-gray-200/80 bg-white p-7 sm:p-8 shadow-soft transition-all hover:shadow-elevated hover:-translate-y-0.5"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf4ff] text-brand-deep">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-3xl font-bold text-slate-300">{num}</span>
                </div>
                <h3 className="mt-6 text-base font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Section 5: CTA Banner */}
      <section className="container-page py-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand p-8 sm:p-12 md:p-14 text-white shadow-elevated">
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-white">
                Let&apos;s discuss your financing needs
              </h2>
              <p className="mt-3 max-w-lg text-sm sm:text-base text-white/90">
                Tell us about your business and we will tell you honestly whether we are the right partner.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/apply"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-brand-deep transition-all hover:bg-white/95 hover:-translate-y-0.5"
              >
                Apply <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-white/40 px-6 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
