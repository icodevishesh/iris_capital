"use client";

import React, { memo, useMemo, useState, useCallback } from "react";
import { Download, FileText, Search, X, Loader2, Inbox, Trash2 } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import {
  useApplicationsData,
  useUpdateApplication,
  useDeleteApplication,
  ApplicationItem as App,
} from "@/lib/hooks/use-admin-queries";

const STATUSES = ["All", "Pending", "Review", "Approved", "Declined"] as const;

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

const ApplicationRow = memo(function ApplicationRow({
  a,
  onSelect,
}: {
  a: App;
  onSelect: (app: App) => void;
}) {
  const handleClick = useCallback(() => {
    onSelect(a);
  }, [a, onSelect]);

  return (
    <tr onClick={handleClick} className="cursor-pointer hover:bg-blue-600/5">
      <td className="p-4 font-medium">{a.businessName}</td>
      <td className="p-4 text-gray-600">{a.fullName}</td>
      <td className="p-4 font-semibold">{a.requestedAmount}</td>
      <td className="p-4 text-gray-600">{a.industry}</td>
      <td className="p-4">
        <StatusBadge status={a.status} />
      </td>
      <td className="p-4 text-gray-600">{formatDate(a.createdAt)}</td>
    </tr>
  );
});

export default function ApplicationsPage() {
  const { data: apps = [], isLoading } = useApplicationsData();
  const updateMutation = useUpdateApplication();
  const deleteMutation = useDeleteApplication();

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");
  const [selected, setSelected] = useState<App | null>(null);

  const handleSelect = useCallback((app: App) => {
    setSelected(app);
  }, []);

  const rows = useMemo(
    () =>
      apps.filter((a) => {
        const inS = status === "All" || a.status === status;
        const inQ =
          !q.trim() ||
          [a.fullName, a.businessName, a.email].some((v) =>
            (v || "").toLowerCase().includes(q.toLowerCase()),
          );
        return inS && inQ;
      }),
    [apps, q, status],
  );

  const save = useCallback(
    (id: string, patch: { status?: App["status"]; notes?: string }) => {
      updateMutation.mutate({ id, patch });
    },
    [updateMutation],
  );

  const remove = useCallback(
    (id: string) => {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          setSelected((prev) => (prev?.id === id ? null : prev));
        },
      });
    },
    [deleteMutation],
  );

  const exportCsv = useCallback(() => {
    const header = ["Business", "Applicant", "Email", "Amount", "Status", "Date"];
    const csv = [
      header,
      ...rows.map((r) => [
        r.businessName,
        r.fullName,
        r.email,
        r.requestedAmount,
        r.status,
        formatDate(r.createdAt),
      ]),
    ]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "applications.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [rows]);

  return (
    <div>
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
          <p className="mt-1 text-sm text-gray-600">All funding applications received.</p>
        </div>
        <button
          onClick={exportCsv}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-semibold hover:bg-accent cursor-pointer"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search applications"
              className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-brand"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  status === s
                    ? "bg-brand text-brand-foreground"
                    : "border border-border bg-background text-gray-600 hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading applications…
          </div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-gray-400">
              <Inbox className="h-6 w-6" />
            </div>
            <p className="text-sm text-gray-600">No applications found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-600">
                  <th className="p-4 font-semibold">Business</th>
                  <th className="p-4 font-semibold">Applicant</th>
                  <th className="p-4 font-semibold">Requested</th>
                  <th className="p-4 font-semibold">Industry</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((a) => (
                  <ApplicationRow key={a.id} a={a} onSelect={handleSelect} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <AppDetail
          app={selected}
          onClose={() => setSelected(null)}
          onSave={save}
          onDelete={remove}
        />
      )}
    </div>
  );
}

function AppDetail({
  app,
  onClose,
  onSave,
  onDelete,
}: {
  app: App;
  onClose: () => void;
  onSave: (id: string, patch: { status?: App["status"]; notes?: string }) => void;
  onDelete: (id: string) => void;
}) {
  const [status, setStatus] = useState(app.status);
  const [notes, setNotes] = useState(app.notes);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-xl flex-col bg-card shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-6">
          <div>
            <p className="font-mono text-xs text-gray-600">{formatDate(app.createdAt)}</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">{app.businessName}</h2>
            <p className="mt-1 text-sm text-gray-600">
              {app.fullName} · {app.email}
            </p>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-lg text-gray-600 hover:bg-accent hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <Section title="Applicant profile">
            <Row k="Name" v={app.fullName} />
            <Row k="Email" v={app.email} />
            <Row k="Phone" v={app.phone} />
          </Section>
          <Section title="Business information">
            <Row k="Business" v={app.businessName} />
            <Row k="Address" v={app.businessAddress} />
            <Row k="Industry" v={app.industry} />
            <Row k="Monthly revenue" v={app.monthlyRevenue} />
            <Row k="Time in business" v={app.timeInBusiness} />
            <Row k="Requested amount" v={app.requestedAmount} />
          </Section>
          <Section title="Documents">
            {app.documents.length === 0 ? (
              <p className="text-sm text-gray-600">No documents uploaded.</p>
            ) : (
              <ul className="space-y-2">
                {app.documents.map((d, i) => (
                  <li
                    key={`${d.name}-${i}`}
                    className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand-deep">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{d.name}</p>
                      <p className="text-xs text-gray-600">{d.size}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Section>
          <Section title="Internal notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:border-brand"
              placeholder="Add a note…"
            />
          </Section>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border p-6">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <span className="font-medium">Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as App["status"])}
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
              >
                {["Pending", "Review", "Approved", "Declined"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <button
              onClick={() => onDelete(app.id)}
              aria-label="Delete application"
              className="grid h-10 w-10 place-items-center rounded-lg border border-border text-red-600 hover:bg-red-600/5 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => {
              onSave(app.id, { status, notes });
              onClose();
            }}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-brand px-5 text-sm font-semibold text-brand-foreground hover:bg-brand-deep cursor-pointer"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-600">{title}</h3>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 text-sm">
      <span className="text-gray-600">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
