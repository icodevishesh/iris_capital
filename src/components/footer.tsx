"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "./brand";
import { toast } from "sonner";
import { useState } from "react";

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="border-t border-border bg-white mt-24">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
              Transparent business funding for U.S. small and medium businesses.
              Fast approvals. Real specialists.
            </p>
            <div className="mt-6 hidden md:flex gap-2">
              {[
                {
                  Icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="h-5 w-5"
                    >
                      <path
                        fill="#0288D1"
                        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                      ></path>
                      <path
                        fill="#FFF"
                        d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                      ></path>
                    </svg>
                  ),
                  href: "#",
                  label: "LinkedIn",
                },
                {
                  Icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                      className="h-5 w-5"
                    >
                      <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                    </svg>
                  ),
                  href: "#",
                  label: "Twitter",
                },
                {
                  Icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="h-5 w-5"
                    >
                      <path
                        fill="#3F51B5"
                        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                      ></path>
                      <path
                        fill="#FFF"
                        d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
                      ></path>
                    </svg>
                  ),
                  href: "#",
                  label: "Facebook",
                },
                {
                  Icon: <Mail className="h-4 w-4" />,
                  href: "mailto:hello@iriscapital.com",
                  label: "Email",
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-gray-500 transition-colors hover:border-brand/40 hover:text-brand-deep"
                >
                  {Icon}
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Products"
            links={[
              { to: "/business-term-loan", label: "Business Term Loan" },
              { to: "/line-of-credit", label: "Line of Credit" },
              { to: "/apply", label: "Apply" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { to: "/about", label: "About us" },
              { to: "/blog", label: "Blog" },
              { to: "/contact", label: "Contact" },
            ]}
          />

          <div>
            <h4 className="text-sm font-semibold text-foreground">Get funding insights</h4>
            <p className="mt-2 text-sm text-gray-500">
              Monthly briefings for small business owners. No spam.
            </p>
            <form
              className="mt-4 flex flex-col gap-2.5 sm:flex-row lg:flex-col xl:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) {
                  toast.error("Enter a valid email");
                  return;
                }
                toast.success("You're subscribed. Thanks!");
                setEmail("");
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-11 w-full min-w-0 rounded-xl border border-input bg-background px-4 text-sm outline-none transition-colors placeholder:text-gray-500 focus:border-brand"
              />
              <button
                type="submit"
                className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-deep sm:w-auto lg:w-full xl:w-auto"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} IRIS Capital Partners. All rights reserved.
            IRIS Capital Partners is not a bank.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">Disclosures</a>
            <a href="#" className="hover:text-foreground">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              href={l.to}
              className="text-sm text-gray-500 transition-colors hover:text-foreground hover:text-black"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
