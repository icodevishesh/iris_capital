
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Handshake, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";
import handshakeImg from "@/assets/handshake.jpg";
import ownerDogImg from "@/assets/professional-girl.png";

export default function AboutPage() {
  return (
    <div>
      <section className="container-page py-8 md:py-16">
        <div className="grid gap-0 md:gap-12 lg:grid-cols-2 lg:items-center">
          <div className="mx-auto max-w-3xl">
          <span className="eyebrow">About IRIS Capital Partners</span>
          <h1 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-5xl">
            Direct Business Lending.<br />
            <span className="text-brand-deep">Built on Trust.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
           
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
             IRIS Capital Partners is a privately operated lending firm committed to delivering fast, transparent, and responsible financing solutions to small and mid-sized businesses across the United States. <br/><br/>
            We understand that access to capital is critical to sustainable growth. Whether you are expanding operations, acquiring equipment, managing working capital, or pursuing new opportunities, our role is to provide structured financing that supports your long-term success.
          </p>
          </div>
          <div className="mt-14 overflow-hidden rounded-3xl border border-border shadow-elevated">
          <Image
            src={handshakeImg}
            alt="Business partners meeting"
            width={1600}
            height={800}
            loading="lazy"
            className="aspect-7/5 w-full object-cover"
          />
          </div>
        </div>
      </section>

      {/* our philosophy */}
      <section className="container-page pt-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="lg:order-2">
            <span className="eyebrow">Our Philosophy</span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Financing should be clear, efficient, and aligned with <span className="text-brand-deep">real-world business needs.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-gray-600">
              Traditional lending institutions often impose lengthy approval timelines, rigid qualification standards, and excessive documentation requirements.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              We take a performance-based approach — evaluating your business revenue, operation stability, and growth trajectory to structure practical financing solutions.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-elevated lg:order-1">
            <Image
              src={ownerDogImg}
              alt="Small business owner at home with her dog"
              width={1200}
              height={1000}
              loading="lazy"
              className="aspect-[6/5] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-12 border-y border-border bg-white/50">
        <div className="container-page grid gap-10 py-8 md:py-16 md:grid-cols-3">
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
            <div
              key={title}
              className="group rounded-2xl border border-border bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-lg"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand-deep transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-semibold transition-colors duration-300 group-hover:text-brand-deep">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pt-8 md:pt-16">
        <div className="max-w-2xl">
          <span className="eyebrow">Why businesses choose us</span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            The difference is in the details
          </h2>
        </div>
        <div className="mt-10 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
          {[
            { icon: ShieldCheck, t: "Transparent" },
            { icon: Users, t: "Human specialists" },
            { icon: Handshake, t: "Relationship-first" },
            { icon: Sparkles, t: "Fast & fair" },
          ].map(({ icon: Icon, t }) => (
            <div
              key={t}
              className="group w-[60vw] max-w-[220px] shrink-0 snap-center rounded-2xl border border-border bg-white p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-lg md:w-auto md:max-w-none md:shrink"
            >
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand-deep transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-semibold transition-colors duration-300 group-hover:text-brand-deep">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTC section */}
      <section className="container-page pt-8 md:pt-16">
        <div className="rounded-3xl border border-border bg-white p-8 text-center shadow-soft md:p-16">
          <h2 className="text-xl font-bold tracking-tight md:text-4xl">
            Let&apos;s fund your next chapter
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
