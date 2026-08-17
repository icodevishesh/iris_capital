import Link from "next/link";
import { Metadata } from "next";
import { FileText, Lock, AlertCircle, ChevronRight, ShieldAlert, Scale, CheckCircle2, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | IRIS Private Equity Group",
  description:
    "Review the Terms and Conditions governing your use of the IRIS Private Equity Group website and services.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
      <section className="container-page py-12 md:py-16">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <FileText className="h-3.5 w-3.5" /> Terms of Use
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
            By accessing or using this website, you agree to the following terms and conditions:
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-page pb-16 md:pb-24">
        <div className="max-w-4xl rounded-3xl border border-border bg-white p-8 md:p-12 shadow-soft">
          <div className="space-y-10 text-foreground">
            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand-deep text-xs font-semibold">1</span>
                Eligibility
              </h2>
              <p className="text-gray-600 leading-relaxed rounded-2xl border border-border bg-accent/40 p-5 flex items-start gap-3">
                <UserCheck className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <span>
                  You must be at least 18 years old and authorized to act on behalf of the business applying for financing.
                </span>
              </p>
            </div>

            <hr className="border-border" />

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand-deep text-xs font-semibold">2</span>
                No Guarantee of Approval
              </h2>
              <p className="text-gray-600 leading-relaxed rounded-2xl border border-border bg-accent/40 p-5 flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <span>
                  Submission of an application does not guarantee approval or funding. All applications undergo underwriting review.
                </span>
              </p>
            </div>

            <hr className="border-border" />

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand-deep text-xs font-semibold">3</span>
                Accuracy of Information
              </h2>
              <p className="text-gray-600 leading-relaxed rounded-2xl border border-border bg-accent/40 p-5 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <span>
                  You agree that all information submitted is accurate and complete. Providing false or misleading information may result in denial of funding.
                </span>
              </p>
            </div>

            <hr className="border-border" />

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand-deep text-xs font-semibold">4</span>
                Electronic Communications Consent
              </h2>
              <p className="text-gray-600 leading-relaxed rounded-2xl border border-border bg-accent/40 p-5">
                By submitting your information, you consent to receive communications via phone, email, and SMS regarding your application and funding status.
              </p>
            </div>

            <hr className="border-border" />

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand-deep text-xs font-semibold">5</span>
                Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed rounded-2xl border border-border bg-accent/40 p-5">
                All website content, branding, logos, and materials are property of IRIS Private Equity Group and may not be reproduced without permission.
              </p>
            </div>

            <hr className="border-border" />

            {/* Section 6 & 7 */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border p-6 space-y-2">
                <h3 className="font-semibold text-foreground text-base flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand/10 text-brand-deep text-xs font-semibold">6</span>
                  Limitation of Liability
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  IRIS Private Equity Group shall not be liable for any indirect, incidental, or consequential damages arising from use of this website.
                </p>
              </div>

              <div className="rounded-2xl border border-border p-6 space-y-2">
                <h3 className="font-semibold text-foreground text-base flex items-center gap-2">
                  <Scale className="h-4 w-4 text-brand-deep" />
                  7. Governing Law
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the State of New York.
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
                href="/legal-disclaimer"
                className="group flex items-center justify-between rounded-2xl border border-border p-5 transition-all hover:border-brand/40 hover:bg-accent shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand-deep">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground group-hover:text-brand-deep">
                      Legal Disclaimer
                    </h4>
                    <p className="text-xs text-gray-600">Disclosures on lending & offers</p>
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
