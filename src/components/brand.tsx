import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-brand-foreground shadow-soft"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 18V6M12 18V6M20 18V6" />
          <path d="M4 12h16" />
        </svg>
      </span>
      <span className="text-[1.05rem] font-bold tracking-tight text-foreground">
        IRIS <span className="font-medium text-gray-600">Capital</span>
      </span>
    </Link>
  );
}

export function CtaLink({
  to,
  children,
  variant = "primary",
  className,
}: {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const base =
    "group inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold transition-all duration-200";
  const styles =
    variant === "primary"
      ? "bg-brand text-brand-foreground shadow-soft hover:bg-brand-deep hover:shadow-elevated hover:-translate-y-0.5"
      : variant === "secondary"
        ? "border border-border bg-card text-foreground hover:border-brand/40 hover:bg-accent"
        : "text-brand-deep hover:bg-accent";
  return (
    <Link href={to} className={cn(base, styles, className)}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
