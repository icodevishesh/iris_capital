"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Business Term Loan", href: "/terms" },
  { label: "Lines of Credit", href: "/credit" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
          <Image
            src="/iris-logo-v2.png"
            alt="IRIS Capital Partners"
            width={180}
            height={48}
            priority
            className="h-18 w-auto object-contain"
          />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "font-semibold text-blue-600 underline decoration-blue-600 decoration-2 underline-offset-8"
                    : "text-gray-600 underline-offset-8 transition-colors hover:text-blue-600 hover:underline hover:decoration-blue-600"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/apply"
            className="hidden sm:inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-deep hover:-translate-y-0.5"
          >
            Apply Now
          </Link>

          {/* Hamburger toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-gray-700 hover:bg-accent md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-card px-6 py-5 shadow-elevated md:hidden">
          <nav className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    isActive ? "font-semibold text-brand-deep" : "text-gray-600 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/apply"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-brand-foreground shadow-soft hover:bg-brand-deep"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
