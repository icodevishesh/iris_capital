"use client";

import React, { memo } from "react";

export const StatusBadge = memo(function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Approved: "bg-success/10 text-success",
    Pending: "bg-amber-500/10 text-amber-600",
    Review: "bg-brand/10 text-brand-deep",
    Declined: "bg-destructive/10 text-destructive",
    New: "bg-muted text-gray-600",
    Contacted: "bg-brand/10 text-brand-deep",
    Qualified: "bg-success/10 text-success",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        map[status] ?? "bg-muted text-gray-600"
      }`}
    >
      {status}
    </span>
  );
});
