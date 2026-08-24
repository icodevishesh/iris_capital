
import Link from "next/link";
import Image from "next/image";
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
          <p className="mt-6 text-base leading-relaxed text-gray-700">
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

      {/* Our Philosophy Section */}
      <section className="container-page py-8 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="lg:order-2">
            <span className="eyebrow">OUR PHILOSOPHY</span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Integrity. Discipline.<br />Partnership.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-gray-700">
              We treat our business partners with the same respect, transparency, and integrity that we expect in return.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-700">
              We believe the best financing relationships are built for the long term — and that our success is ultimately measured by the success of the businesses we support.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/apply"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-deep hover:-translate-y-0.5"
              >
                Apply now
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-brand shadow-soft transition-all hover:bg-gray-100 border border-border hover:-translate-y-0.5"
              >
                Speak with Us
              </Link>
            </div>
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
    </div>
  );
}
