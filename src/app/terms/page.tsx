"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  Landmark,
  Check,
  Clock,
  ShieldCheck,
  CircleDollarSign,
  Calendar,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import documentsImg from "@/assets/documents.jpg";

export default function TermLoanPage() {
  return (
    <div>
      <ProductHero
        eyebrow="Business Term Loan"
        title="Predictable funding for the moves that grow your business"
        body="Fixed monthly payments and clear terms — for expansion, equipment, hiring, or working capital."
        image={documentsImg.src}
      />
      <ProductStats
        items={[
          { icon: CircleDollarSign, label: "Loan amounts", value: "$5K – $500K" },
          { icon: Calendar, label: "Terms", value: "6 – 24 months" },
          { icon: Clock, label: "Funding speed", value: "As fast as 24 hrs" },
          { icon: TrendingUp, label: "Rates", value: "Competitive fixed" },
        ]}
      />
      <FeaturesGrid
        title="Why choose a term loan"
        items={[
          { title: "Fixed payments", body: "Know your exact payment for the life of the loan." },
          { title: "One lump sum", body: "Full amount funded upfront so you can execute your plan without delay." },
          { title: "Build business credit", body: "On-time payments help you strengthen your business credit profile." },
          { title: "Use it your way", body: "Expansion, inventory, marketing, equipment, or refinancing — your call." },
          { title: "No prepayment penalties", body: "Pay early and save without extra fees." },
          { title: "Dedicated specialist", body: "One human point of contact through funding and beyond." },
        ]}
      />
      <EligibilitySection />
      <FAQSection />
      <ApplyBanner />
    </div>
  );
}

function ProductHero({
  eyebrow,
  title,
  body,
  image,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
}) {
  return (
    <section className="container-page py-8 md:py-16">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">
            <Landmark className="h-3.5 w-3.5" /> {eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-gray-600">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/apply"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-deep hover:-translate-y-0.5"
            >
              Apply now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-semibold text-foreground hover:bg-accent"
            >
              Speak with us
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
            {["No hard credit pull to apply", "No obligation", "Same-day funding available"].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border shadow-elevated">
          <Image
            src={image}
            alt="Business owner reviewing documents"
            width={1400}
            height={1000}
            loading="lazy"
            className="aspect-[5/4] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function ProductStats({
  items,
}: {
  items: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }[];
}) {
  return (
    <section className="container-page py-8 md:py-0">
      <div className="grid gap-4 rounded-3xl border border-border bg-white p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4 rounded-2xl p-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand-deep">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">{label}</p>
              <p className="mt-0.5 text-base font-semibold">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesGrid({
  title,
  items,
}: {
  title: string;
  items: { title: string; body: string }[];
}) {
  return (
    <section className="container-page py-8 md:py-16">
      <div className="max-w-2xl">
        <span className="eyebrow">Benefits</span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      </div>
      <div className="mt-10 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
        {items.map(({ title, body }) => (
          <div
            key={title}
            className="group w-[85vw] max-w-[300px] shrink-0 snap-center rounded-2xl border border-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated md:w-auto md:max-w-none md:shrink"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand-deep">
              <Check className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EligibilitySection() {
  const items = [
    "U.S.-based business",
    "6+ months in business",
    "$10,000+ in monthly revenue",
    "Business bank account",
    "Owner 18+ years old",
    "Personal credit score 550+",
  ];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-8 md:py-16 border-y border-border bg-white">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="eyebrow">
            <ShieldCheck className="h-3.5 w-3.5" /> Basic eligibility
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What you&apos;ll need to qualify
          </h2>
          <p className="mt-4 max-w-lg text-gray-600">
            We look at the health of your business, not just your credit score.
            Most applications receive a decision within one business day.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((i, idx) => (
            <li
              key={i}
              className={`flex items-center gap-3 rounded-lg border border-border bg-white p-4 transition-all duration-500 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-success/10 text-success">
                <Check className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "How much can I borrow?",
      a: "Term loans range from $5,000 to $500,000. Your specific offer depends on business revenue, time in business, and financial health.",
    },
    {
      q: "How fast can I get funded?",
      a: "Many customers receive funding within 24 hours of approval. Complex applications may take a bit longer.",
    },
    {
      q: "Will applying affect my credit score?",
      a: "No. Our initial application uses a soft credit pull and does not impact your personal credit score.",
    },
    {
      q: "Do I need collateral?",
      a: "Most term loans do not require specific collateral. A standard UCC filing and personal guarantee are typical.",
    },
    {
      q: "What documents do I need?",
      a: "Typically the last three months of business bank statements, your driver's license, and basic business information.",
    },
  ];
  return (
    <section className="container-page py-8 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Common questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 divide-y divide-border rounded-2xl border border-border bg-white px-6 shadow-soft">
          {faqs.map(({ q, a }, i) => (
            <AccordionItem key={q} value={`item-${i}`} className="border-none">
              <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-gray-600">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function ApplyBanner() {
  return (
    <section className="container-page py-8 md:py-0 bg-card/50">
      <div className="rounded-3xl border border-border bg-white p-10 text-center shadow-soft md:p-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          See what you qualify for
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-gray-600">
          Complete our application in about five minutes. No hard credit pull.
        </p>
        <Link
          href="/apply"
          className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-brand px-8 text-base font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-deep hover:-translate-y-0.5"
        >
          Apply now <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
