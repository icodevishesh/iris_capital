"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Shield } from "lucide-react";

const NAV_ITEMS = [
  { label: "Business Term Loan", href: "/terms" },
  { label: "Lines of Credit", href: "/credit" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight text-foreground">
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-brand text-brand-foreground shadow-soft">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-bold">IRIS <span className="text-gray-600 font-semibold">Capital</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "text-blue-600 underline decoration-blue-600 decoration-2 underline-offset-8 font-semibold"
                    : "text-gray-500 hover:text-blue-600 hover:underline hover:decoration-blue-600 underline-offset-8 transition-colors"
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
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-deep hover:-translate-y-0.5"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </header>
  );
}
