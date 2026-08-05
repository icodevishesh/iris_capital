"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Layers,
  Check,
  Clock,
  ShieldCheck,
  Repeat,
  Wallet,
  Zap,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImg from "@/assets/hero-owner.jpg";


export default function LineOfCreditPage() {
  return (
    <div>
      <section className="container-page py-8 md:py-16">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">
              <Layers className="h-3.5 w-3.5" /> Business Line of Credit
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Flexible working capital, on demand
            </h1>
            <p className="mt-6 max-w-lg text-lg text-gray-600">
              Draw funds when you need them. Only pay interest on what you use.
              A revolving line that grows with your business.
            </p>
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
              {["Draw anytime", "No draw fees", "Interest on used funds only"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-elevated">
            <Image
              src={heroImg}
              alt="Business owner managing finances online"
              width={1600}
              height={1200}
              loading="lazy"
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-8 md:py-0">
        <div className="grid gap-4 rounded-3xl border border-border bg-white p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
          {[
            { icon: Wallet, label: "Credit line", value: "Up to $250K" },
            { icon: Repeat, label: "Structure", value: "Revolving" },
            { icon: Zap, label: "Draw time", value: "Same-day access" },
            { icon: ShieldCheck, label: "Fees", value: "No draw or maintenance fees" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl p-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand-deep">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                  {label}
                </p>
                <p className="mt-0.5 text-base font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-8 md:py-16">
        <div className="max-w-2xl">
          <span className="eyebrow">Funding features</span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Working capital, exactly when you need it
          </h2>
        </div>
        <div className="mt-10 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
          {[
            { icon: Repeat, title: "Revolving credit", body: "As you repay, your available credit refills automatically." },
            { icon: Zap, title: "Instant draws", body: "Transfer to your business bank account in minutes." },
            { icon: Wallet, title: "Pay for what you use", body: "Interest only accrues on the portion you actually draw." },
            { icon: Clock, title: "No draw fees", body: "Move money in and out without hidden charges." },
            { icon: ShieldCheck, title: "Transparent terms", body: "Clear rate schedules and no surprise costs." },
            { icon: Check, title: "Grow your line", body: "Increase your credit limit as your business scales." },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group w-[85vw] max-w-[300px] shrink-0 snap-center rounded-2xl border border-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated md:w-auto md:max-w-none md:shrink"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand-deep">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-8 md:py-0">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">Common questions</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10 divide-y divide-border rounded-2xl border border-border bg-white px-6 shadow-soft">
            {[
              { q: "Is there a fee to keep the line open?", a: "No. There are no maintenance or inactivity fees. You only pay interest when you draw." },
              { q: "How much can I access?", a: "Lines of credit are approved from $5,000 up to $250,000 based on your business profile." },
              { q: "Can I draw more than once?", a: "Yes. Draw as many times as needed, up to your available limit. Your line refills as you repay." },
              { q: "How long does approval take?", a: "Most applications are reviewed within one business day." },
            ].map(({ q, a }, i) => (
              <AccordionItem key={q} value={`i-${i}`} className="border-none">
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

      <section className="container-page md:pt-16">
        <div className="rounded-3xl border border-border bg-white p-10 text-center shadow-soft md:p-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Open your line of credit</h2>
          <p className="mx-auto mt-3 max-w-lg text-gray-600">
            Apply in minutes. Access your credit the moment you need it.
          </p>
          <Link
            href="/apply"
            className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-brand px-8 text-base font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-deep hover:-translate-y-0.5"
          >
            Apply now <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
