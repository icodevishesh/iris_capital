import Link from "next/link";
import { Metadata } from "next";
import { Lock, Mail, Phone, ShieldCheck, FileText, AlertCircle, ChevronRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | IRIS Private Equity Group",
  description:
    "Learn how IRIS Private Equity Group collects, uses, and safeguards your business and personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header Section */}
      <section className="container-page py-12 md:py-16">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <Lock className="h-3.5 w-3.5" /> Privacy & Data
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm font-medium text-gray-500">
            Effective Date: September 1, 2018
          </p>
          <p className="mt-3 text-gray-600 text-base md:text-lg leading-relaxed">
            IRIS Private Equity Group respects your privacy and is committed to protecting your information.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-page pb-16 md:pb-24">
        <div className="max-w-4xl rounded-3xl border border-border bg-white p-8 md:p-12 shadow-soft">
          <div className="space-y-10 text-foreground">
            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand-deep text-xs font-semibold">1</span>
                Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may collect the following types of information when you interact with our website or apply for financing:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 pt-1 text-sm text-gray-700">
                {[
                  "Business information (legal name, EIN, revenue)",
                  "Personal identification information (name, phone, email)",
                  "Financial documents (bank statements, tax documents)",
                  "Credit information",
                  "Website usage data (IP address, browser type, cookies)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 rounded-xl border border-border/80 bg-accent/40 p-3.5">
                    <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-border" />

            {/* Section 2 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand-deep text-xs font-semibold">2</span>
                How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use collected information to fulfill financing services and maintain regulatory standards:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 pt-1 text-sm text-gray-700">
                {[
                  "Process loan applications",
                  "Verify identity and business information",
                  "Conduct underwriting and credit reviews",
                  "Communicate regarding funding",
                  "Improve website functionality",
                  "Comply with legal and regulatory requirements",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-accent/40 p-3.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-border" />

            {/* Section 3 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand-deep text-xs font-semibold">3</span>
                Credit Authorization
              </h2>
              <p className="text-gray-600 leading-relaxed rounded-2xl border border-border bg-accent/50 p-5">
                By submitting an application, you authorize IRIS Private Equity Group to obtain consumer and/or business credit reports and verify submitted information.
              </p>
            </div>

            <hr className="border-border" />

            {/* Section 4 */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/10 text-brand-deep text-xs font-semibold">4</span>
                Information Sharing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                As a direct lender, we do not sell applicant information to third-party lenders. We may share information with:
              </p>
              <ul className="space-y-2.5 pt-1 text-sm text-gray-700">
                {[
                  "Service providers assisting in underwriting or servicing",
                  "Credit bureaus",
                  "Legal or regulatory authorities when required by law",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-lg border border-border bg-white p-3 shadow-xs">
                    <ShieldCheck className="h-4 w-4 text-brand-deep shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-border" />

            {/* Sections 5, 6, 7 */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-border p-6 space-y-2">
                <h3 className="font-semibold text-foreground text-base">5. Data Security</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We implement industry-standard administrative, technical, and physical safeguards to protect your information.
                </p>
              </div>

              <div className="rounded-2xl border border-border p-6 space-y-2">
                <h3 className="font-semibold text-foreground text-base">6. Cookies & Tracking</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our website may use cookies and analytics tools to enhance user experience and monitor site performance.
                </p>
              </div>

              <div className="rounded-2xl border border-border p-6 space-y-2">
                <h3 className="font-semibold text-foreground text-base">7. Your Rights</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  You may request access, correction, or deletion of your personal information, subject to legal retention requirements.
                </p>
              </div>
            </div>

            <hr className="border-border" />

            {/* Contact Information */}
            <div className="rounded-2xl bg-brand/5 border border-brand/20 p-6 space-y-3">
              <h3 className="font-semibold text-brand-deep text-base">Privacy Inquiries</h3>
              <p className="text-sm text-gray-600">
                If you have questions or concerns regarding our privacy policy or data handling practices, please contact us:
              </p>
              <div className="flex flex-wrap gap-6 pt-2 text-sm">
                <a
                  href="mailto:info@irisprivateequitygroup.com"
                  className="flex items-center gap-2 font-medium text-brand hover:text-brand-deep transition-colors"
                >
                  <Mail className="h-4 w-4" /> info@irisprivateequitygroup.com
                </a>
                <a
                  href="tel:9173850474"
                  className="flex items-center gap-2 font-medium text-brand hover:text-brand-deep transition-colors"
                >
                  <Phone className="h-4 w-4" /> 917-385-0474
                </a>
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
