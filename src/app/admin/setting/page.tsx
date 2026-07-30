"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [company, setCompany] = useState("IRIS Capital Partners");
  const [email, setEmail] = useState("hello@iriscapital.com");
  const [phone, setPhone] = useState("1 (800) 555-0134");

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-gray-500">Manage your workspace preferences.</p>

      <div className="mt-8 space-y-6">
        <Card title="Company profile" desc="Public-facing company information.">
          <FormField label="Company name">
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </FormField>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Support email">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </FormField>
            <FormField label="Support phone">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </FormField>
          </div>
        </Card>

        <div className="flex justify-end">
          <button
            onClick={() => toast.success("Settings saved")}
            className="h-11 rounded-xl bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-soft hover:bg-brand-deep"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
      <div className="max-w-lg">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{desc}</p>
      </div>
      <div className="mt-6 space-y-4">{children}</div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
