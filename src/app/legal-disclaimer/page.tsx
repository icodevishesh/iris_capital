import Link from "next/link";
import { Metadata } from "next";
import { AlertCircle, ShieldCheck, FileText, Lock, ArrowRight, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal Disclaimer | IRIS Private Equity Group",
  description:
    "Legal disclaimer and financing disclosures for IRIS Private Equity Group products and services.",
};

export default function LegalDisclaimerPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header Banner */}
      <section className="container-page py-12 md:py-16">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <AlertCircle className="h-3.5 w-3.5" /> Disclosures
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Legal Disclaimer
          </h1>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            Please read this legal disclaimer carefully before using our website or applying for financing with IRIS Private Equity Group.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-page pb-16 md:pb-24">
        <div className="max-w-4xl rounded-3xl border border-border bg-white p-8 md:p-12 shadow-soft">
          <div className="space-y-8 text-foreground">
            {/* Informational Purpose */}
            <div className="flex gap-4 items-start">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand-deep mt-1">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">Informational Purposes Only</h2>
                <p className="text-gray-600 leading-relaxed">
                  The information contained on this website is for informational purposes only and does not constitute a commitment to lend, an offer of credit, or financial advice.
                </p>
              </div>
            </div>

            <hr className="border-border" />

            {/* Credit Approval */}
            <div className="flex gap-4 items-start">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand-deep mt-1">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">Credit Approval & Requirements</h2>
                <p className="text-gray-600 leading-relaxed">
                  All financing products offered by IRIS Private Equity Group are subject to credit approval, underwriting review, and verification of application information. Approval is not guaranteed.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Loan amounts, rates, fees, repayment terms, and eligibility requirements vary based on multiple factors including, but not limited to:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2.5 pt-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 border border-border/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>
                    Time in business
                  </li>
                  <li className="flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 border border-border/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>
                    Monthly or annual revenue
                  </li>
                  <li className="flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 border border-border/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>
                    Credit history
                  </li>
                  <li className="flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 border border-border/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>
                    Industry risk profile
                  </li>
                  <li className="flex items-center gap-2 sm:col-span-2 rounded-lg bg-accent px-3.5 py-2 border border-border/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>
                    Existing debt obligations
                  </li>
                </ul>
              </div>
            </div>

            <hr className="border-border" />

            {/* Modifications & Forward Looking */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-accent/50 p-6 space-y-2">
                <h3 className="font-semibold text-foreground text-base">Product Modifications</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  IRIS Private Equity Group reserves the right to modify, suspend, or discontinue loan products at any time without notice.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-accent/50 p-6 space-y-2">
                <h3 className="font-semibold text-foreground text-base">Forward-Looking Statements</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  This website may contain forward-looking statements regarding funding speed or approval timelines. Actual results may vary depending on applicant circumstances and documentation completion.
                </p>
              </div>
            </div>


          </div>

          {/* Page Cross-Links Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-4">
              Related Legal Pages
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/privacy-policy"
                className="group flex items-center justify-between rounded-2xl border border-border p-5 transition-all hover:border-brand/40 hover:bg-accent shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand-deep">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground group-hover:text-brand-deep">
                      Privacy Policy
                    </h4>
                    <p className="text-xs text-gray-600">How we collect and protect your data</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/terms-and-conditions"
                className="group flex items-center justify-between rounded-2xl border border-border p-5 transition-all hover:border-brand/40 hover:bg-accent shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand-deep">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground group-hover:text-brand-deep">
                      Terms and Conditions
                    </h4>
                    <p className="text-xs text-gray-600">Website usage rules and requirements</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
