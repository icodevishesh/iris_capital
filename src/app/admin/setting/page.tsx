"use client";


import { useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [company, setCompany] = useState("IRIS Capital Partners");
  const [email, setEmail] = useState("hello@iriscapital.com");
  const [phone, setPhone] = useState("1 (800) 555-0134");
  const [notify, setNotify] = useState(true);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-gray-500">Manage your workspace preferences.</p>

      <div className="mt-8 space-y-6">
        <Card title="Company profile" desc="Public-facing company information.">
          <FormField label="Company name">
            <input value={company} onChange={(e) => setCompany(e.target.value)} className="admin-input" />
          </FormField>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Support email">
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="admin-input" />
            </FormField>
            <FormField label="Support phone">
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="admin-input" />
            </FormField>
          </div>
        </Card>

        <Card title="Notifications" desc="Choose how you'd like to be notified about new applications.">
          <label className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background p-4">
            <div>
              <p className="text-sm font-medium">Email me on new applications</p>
              <p className="text-xs text-gray-500">Receive an email the moment a lead completes the funnel.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notify}
              onClick={() => setNotify((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition-colors ${notify ? "bg-brand" : "bg-muted"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-transform ${
                  notify ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </label>
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
      <style>{`.admin-input { width: 100%; height: 44px; border-radius: 12px; border: 1px solid var(--input); background: var(--background); padding: 0 14px; font-size: 14px; outline: none; } .admin-input:focus { border-color: var(--brand); }`}</style>
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
