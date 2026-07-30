"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Mail, Phone, Trash2, Loader2, Inbox } from "lucide-react";
import { toast } from "sonner";
import { StatusBadge } from "../dashboard/page";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "New" | "Contacted" | "Qualified";
  createdAt: string;
};

const STATUSES = ["All", "New", "Contacted", "Qualified"] as const;

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

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");
  const [selected, setSelected] = useState<Lead | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLeads(data.leads);
    } catch {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/leads");
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (active) setLeads(data.leads);
      } catch {
        toast.error("Failed to load leads");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const rows = useMemo(
    () =>
      leads.filter((l) => {
        const inS = status === "All" || l.status === status;
        const inQ =
          !q.trim() ||
          [l.name, l.email, l.phone].some((v) =>
            v.toLowerCase().includes(q.toLowerCase()),
          );
        return inS && inQ;
      }),
    [leads, q, status],
  );

  const updateStatus = async (lead: Lead, next: Lead["status"]) => {
    setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, status: next } : l)));
    setSelected((s) => (s && s.id === lead.id ? { ...s, status: next } : s));
    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
      load();
    }
  };

  const remove = async (lead: Lead) => {
    setLeads((ls) => ls.filter((l) => l.id !== lead.id));
    if (selected?.id === lead.id) setSelected(null);
    try {
      const res = await fetch(`/api/leads/${lead.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Lead deleted");
    } catch {
      toast.error("Failed to delete lead");
      load();
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="mt-1 text-sm text-gray-500">
            Contact form submissions from your website.
          </p>
        </div>
        <p className="text-xs text-gray-500">{leads.length} total</p>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search leads"
              className="h-10 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm outline-none focus:border-brand"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  status === s
                    ? "bg-brand text-brand-foreground"
                    : "border border-border bg-background text-gray-500 hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading leads…
          </div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-muted text-gray-400">
              <Inbox className="h-6 w-6" />
            </div>
            <p className="text-sm text-gray-500">No leads found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-gray-500">
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Contact</th>
                  <th className="p-4 font-semibold">Message</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((l) => (
                  <tr
                    key={l.id}
                    onClick={() => setSelected(l)}
                    className="cursor-pointer hover:bg-accent/60"
                  >
                    <td className="p-4 font-medium">{l.name}</td>
                    <td className="p-4 text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3" /> {l.email}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <Phone className="h-3 w-3" /> {l.phone}
                      </div>
                    </td>
                    <td className="max-w-xs p-4 text-gray-500">
                      <p className="truncate">{l.message}</p>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={l.status} />
                    </td>
                    <td className="p-4 text-gray-500">{formatDate(l.createdAt)}</td>
                    <td className="p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(l);
                        }}
                        aria-label="Delete"
                        className="grid h-9 w-9 place-items-center rounded-lg border border-border text-gray-400 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <LeadDetail
          lead={selected}
          onClose={() => setSelected(null)}
          onStatus={(s) => updateStatus(selected, s)}
          onDelete={() => remove(selected)}
        />
      )}
    </div>
  );
}

function LeadDetail({
  lead,
  onClose,
  onStatus,
  onDelete,
}: {
  lead: Lead;
  onClose: () => void;
  onStatus: (s: Lead["status"]) => void;
  onDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-md flex-col bg-card shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{lead.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{formatDate(lead.createdAt)}</p>
          </div>
          <StatusBadge status={lead.status} />
        </div>
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <div className="space-y-2">
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 text-sm hover:bg-accent"
            >
              <Mail className="h-4 w-4 text-brand-deep" /> {lead.email}
            </a>
            <a
              href={`tel:${lead.phone}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 text-sm hover:bg-accent"
            >
              <Phone className="h-4 w-4 text-brand-deep" /> {lead.phone}
            </a>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Message
            </h3>
            <p className="mt-2 whitespace-pre-wrap rounded-xl border border-border bg-background p-4 text-sm">
              {lead.message}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status
            </h3>
            <select
              value={lead.status}
              onChange={(e) => onStatus(e.target.value as Lead["status"])}
              className="mt-2 h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
            >
              {["New", "Contacted", "Qualified"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border p-6">
          <button
            onClick={onDelete}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-semibold text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
          <button
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-brand-foreground hover:bg-brand-deep"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
