
import Link from "next/link";
import { ArrowRight, Compass, Handshake, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";
import handshakeImg from "@/assets/handshake.jpg";
import ownerDogImg from "@/assets/owner-dog.jpg";

export default function AboutPage() {
  return (
    <div>
      <section className="container-page pt-14 pb-16 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">About IRIS</span>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Real people funding real businesses
          </h1>
          <p className="mt-6 text-lg text-gray-500">
            We founded IRIS Capital Partners because small business owners deserve
            transparent terms, human support, and funding that arrives when they need it.
          </p>
        </div>
        <div className="mt-14 overflow-hidden rounded-3xl border border-border shadow-elevated">
          <img
            src={handshakeImg.src}
            alt="Business partners meeting"
            width={1600}
            height={800}
            className="aspect-[16/7] w-full object-cover"
          />
        </div>
      </section>

      <section className="container-page mt-8 md:mt-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Built by operators, for operators
            </h2>
            <p className="mt-4 text-gray-500">
              After years watching hard-working business owners get stuck in slow, opaque
              lending processes, our founders set out to build a different kind of lender —
              one that treats speed, honesty, and long-term relationships as the product.
            </p>
            <p className="mt-4 text-gray-500">
              Today, IRIS Capital Partners funds thousands of American businesses each year,
              from local restaurants to growing SaaS companies. Every application is reviewed
              by a real human specialist.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-elevated">
            <img
              src={ownerDogImg.src}
              alt="Small business owner at home with her dog"
              width={1200}
              height={1000}
              loading="lazy"
              className="aspect-[6/5] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-24 border-y border-border bg-white/50">
        <div className="container-page grid gap-10 py-20 md:grid-cols-3">
          {[
            {
              icon: Compass,
              title: "Mission",
              body: "Give every U.S. small business fast, fair access to the capital they need to grow.",
            },
            {
              icon: Heart,
              title: "Philosophy",
              body: "Transparent terms. Human judgment. Long-term relationships over one-time transactions.",
            },
            {
              icon: Sparkles,
              title: "Promise",
              body: "No hidden fees. No pressure tactics. A real person to talk to — from application through payoff.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-white p-8 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand-deep">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container-page mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Timeline</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Our journey</h2>
        </div>
        <ol className="relative mx-auto mt-14 max-w-2xl border-l-2 border-border pl-8">
          {[
            { year: "2016", title: "IRIS founded", body: "Launched with a mission to fund underserved small businesses." },
            { year: "2018", title: "$100M funded", body: "Passed our first major funding milestone across 15 states." },
            { year: "2021", title: "Nationwide", body: "Now supporting businesses in all 50 U.S. states." },
            { year: "2024", title: "$1B+ funded", body: "Crossed $1 billion in cumulative funding to 12,000+ businesses." },
          ].map((e) => (
            <li key={e.year} className="mb-10 last:mb-0">
              <div className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-background bg-brand" />
              <p className="text-sm font-semibold text-brand-deep">{e.year}</p>
              <h3 className="mt-1 text-lg font-semibold">{e.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{e.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page mt-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Why businesses choose us</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            The difference is in the details
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "Transparent" },
            { icon: Users, t: "Human specialists" },
            { icon: Handshake, t: "Relationship-first" },
            { icon: Sparkles, t: "Fast & fair" },
          ].map(({ icon: Icon, t }) => (
            <div key={t} className="rounded-2xl border border-border bg-white p-6 text-center shadow-soft">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand-deep">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-semibold">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-24">
        <div className="rounded-3xl border border-border bg-white p-10 text-center shadow-soft md:p-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Let's fund your next chapter
          </h2>
          <Link
            href="/apply"
            className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-brand px-8 text-base font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-deep hover:-translate-y-0.5"
          >
            Apply now <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
