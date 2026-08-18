
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, Handshake, Heart, Scale, ShieldCheck, Sparkles, Users } from "lucide-react";
import handshakeImg from "@/assets/handshake.jpg";
import ownerDogImg from "@/assets/professional-girl.png";

export default function AboutPage() {
  return (
    <div>
      <section className="container-page py-8 md:py-16">
        <div className="grid gap-0 md:gap-12 lg:grid-cols-2 lg:items-start">
          <div className="mx-auto max-w-3xl">
          <span className="eyebrow">About IRIS</span>
          <h1 className="mt-5 text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            A private credit <span className="text-brand-deep">partner</span> <br/>you can rely on
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
           
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
             At Iris, our focus is simple: provide business owners with thoughtful solutions, responsive service, and a reliable source of financing.
             <br/><br/>
             We believe that successful financing relationships are built on understanding the business, communicating clearly, and following through.
             <br/><br/>
             Our team approaches every opportunity with discipline, integrity, and a long-term perspective. We seek to build lasting relationships with the businesses and management teams we finance.
          </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-elevated">
          <Image
            src={handshakeImg}
            alt="Business partners meeting"
            width={1600}
            height={800}
            loading="lazy"
            className="aspect-9/8 w-full object-cover"
          />
          </div>
        </div>
      </section>

      {/* our philosophy */}
      <section className="container-page pt-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="lg:order-2">
            <span className="eyebrow">Who We Are</span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Experienced capital, delivered directly
            </h2>
            <p className="mt-6 text-base leading-relaxed text-gray-600">
              We work directly with business owners, management teams, and their advisors to understand what a company needs and to structure credit that supports it. Because we originate and hold our own facilities, decisions are made by the people you speak with — not by a distant committee.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Many of the businesses we finance come to us after finding traditional bank processes slow, rigid, or poorly matched to their circumstances. Our role is to bring judgment and flexibility to those situations while remaining disciplined about risk.
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

      {/* Our Philosophy Section */}
      <section className="mt-16 border-t border-border bg-white/40 py-12 md:pt-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-200/60 bg-[#edf4ff] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-deep">
              OUR PHILOSOPHY
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              Integrity. Discipline.<br />Partnership.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              We treat our business partners with the same respect, transparency, and integrity that we expect in return.
              We believe the best financing relationships are built for the long term — and that our success is ultimately measured by the success of the businesses we support.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Integrity",
                body: "We say what we mean and we are direct about what we can and cannot do. Clear terms, clear expectations, no surprises.",
              },
              {
                icon: Scale,
                title: "Discipline",
                body: "We underwrite carefully and structure credit that is sustainable for the business over the life of the facility.",
              },
              {
                icon: Handshake,
                title: "Partnership",
                body: "We invest in long-term relationships and remain a responsive, accessible partner well beyond closing.",
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
          <div className="flex items-center justify-center gap-4">
          <Link
            href="/apply"
            className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-brand px-8 text-base font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-deep hover:-translate-y-0.5"
          >
            Apply now
          </Link>

          <Link
            href="/contact"
            className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-brand-foreground px-8 text-base font-semibold text-brand shadow-soft transition-all hover:bg-gray-100 border hover:-translate-y-0.5"
          >
            Speak with Us
          </Link>
        </div>
        </div>
      </section>
    </div>
  );
}
