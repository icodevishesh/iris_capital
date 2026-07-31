"use client";

import React, { memo, useMemo } from "react";
import {
  Users,
  FileText,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { useDashboardData } from "@/lib/hooks/use-admin-queries";
import { StatusBadge } from "@/components/status-badge";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

const KpiCard = memo(function KpiCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/10 text-brand-deep">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-600">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
});

const RecentRow = memo(function RecentRow({
  r,
}: {
  r: {
    id: string;
    businessName: string;
    fullName: string;
    requestedAmount: string;
    status: string;
    createdAt: string;
  };
}) {
  return (
    <tr className="hover:bg-blue-600/5">
      <td className="py-3 font-medium">{r.businessName}</td>
      <td className="py-3 text-gray-600">{r.fullName}</td>
      <td className="py-3">{r.requestedAmount}</td>
      <td className="py-3">
        <StatusBadge status={r.status} />
      </td>
      <td className="py-3 text-gray-600">{formatDate(r.createdAt)}</td>
    </tr>
  );
});

export default function DashboardHome() {
  const { data, isLoading } = useDashboardData();

  const kpis = useMemo(() => {
    if (!data) return [];
    return [
      { label: "Total Leads", value: data.kpis.totalLeads, icon: Users },
      { label: "Applications", value: data.kpis.totalApplications, icon: FileText },
      { label: "Pending", value: data.kpis.pending, icon: Clock },
      { label: "Approved", value: data.kpis.approved, icon: CheckCircle2 },
    ];
  }, [data]);

  return (
    <div>
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">Overview of your funding pipeline.</p>
        </div>
        <p className="text-xs text-gray-600">Last updated just now</p>
      </div>

      {isLoading ? (
        <div className="mt-16 flex items-center justify-center gap-2 text-sm text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading dashboard…
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {kpis.map(({ label, value, icon }) => (
              <KpiCard key={label} label={label} value={value} icon={icon} />
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent applications</h2>
                <a
                  href="/admin/applications"
                  className="text-xs font-semibold text-brand-deep hover:underline"
                >
                  View all
                </a>
              </div>
              <div className="mt-4 overflow-x-auto">
                {data && data.recent.length > 0 ? (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-wider text-gray-600">
                        <th className="pb-3 font-semibold">Business</th>
                        <th className="pb-3 font-semibold">Applicant</th>
                        <th className="pb-3 font-semibold">Amount</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {data.recent.map((r) => (
                        <RecentRow key={r.id} r={r} />
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="py-8 text-center text-sm text-gray-600">
                    No applications yet.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="text-lg font-semibold">Pipeline</h2>
              <p className="mt-1 text-sm text-gray-600">Applications by status</p>
              <div className="mt-6 space-y-4">
                {data &&
                  (
                    [
                      { label: "Pending", value: data.kpis.pending },
                      { label: "Review", value: data.kpis.review },
                      { label: "Approved", value: data.kpis.approved },
                      { label: "Declined", value: data.kpis.declined },
                    ] as const
                  ).map((r) => {
                    const total = data.kpis.totalApplications || 1;
                    const pct = Math.round((r.value / total) * 100);
                    return (
                      <div key={r.label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium">{r.label}</span>
                          <span className="text-gray-600">{r.value}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-brand"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-8 rounded-lg border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Approval rate
                </p>
                <p className="mt-1 text-2xl font-bold">{data?.conversion ?? 0}%</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-success">
                  <ArrowUpRight className="h-3 w-3" /> approved vs decided
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
