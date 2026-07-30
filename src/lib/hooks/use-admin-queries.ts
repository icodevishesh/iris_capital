"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type DashboardData = {
  kpis: {
    totalLeads: number;
    totalApplications: number;
    pending: number;
    approved: number;
    review: number;
    declined: number;
  };
  conversion: number;
  recent: {
    id: string;
    businessName: string;
    fullName: string;
    requestedAmount: string;
    status: string;
    createdAt: string;
  }[];
};

export type ApplicationItem = {
  id: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  businessAddress: string;
  requestedAmount: string;
  industry: string;
  monthlyRevenue: string;
  timeInBusiness: string;
  status: "Approved" | "Pending" | "Review" | "Declined";
  createdAt: string;
  documents: { name: string; size: string }[];
  notes: string;
};

export type LeadItem = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "New" | "Contacted" | "Qualified";
  createdAt: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  author: string;
  category: "Funding 101" | "Growth" | "Cash Flow" | "Case Studies";
  bannerImage: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
};

export const ADMIN_KEYS = {
  dashboard: ["admin", "dashboard"] as const,
  applications: ["admin", "applications"] as const,
  leads: ["admin", "leads"] as const,
  blogs: ["admin", "blogs"] as const,
};

// 1. Dashboard Query
export function useDashboardData() {
  return useQuery<DashboardData>({
    queryKey: ADMIN_KEYS.dashboard,
    queryFn: async ({ signal }) => {
      const res = await fetch("/api/dashboard", { signal });
      if (!res.ok) throw new Error("Failed to fetch dashboard");
      return res.json();
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

// 2. Applications Query
export function useApplicationsData() {
  return useQuery<ApplicationItem[]>({
    queryKey: ADMIN_KEYS.applications,
    queryFn: async ({ signal }) => {
      const res = await fetch("/api/applications", { signal });
      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      return data.applications ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

// 3. Leads Query
export function useLeadsData() {
  return useQuery<LeadItem[]>({
    queryKey: ADMIN_KEYS.leads,
    queryFn: async ({ signal }) => {
      const res = await fetch("/api/leads", { signal });
      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = await res.json();
      return data.leads ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

// 4. Blogs Query
export function useBlogsData() {
  return useQuery<BlogPost[]>({
    queryKey: ADMIN_KEYS.blogs,
    queryFn: async ({ signal }) => {
      const res = await fetch("/api/blogs", { signal });
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      return data.blogs ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });
}

// 4. Update Application Mutation (Optimistic)
export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      patch,
    }: {
      id: string;
      patch: { status?: ApplicationItem["status"]; notes?: string };
    }) => {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error("Failed to update application");
      return res.json();
    },
    onMutate: async ({ id, patch }) => {
      await queryClient.cancelQueries({ queryKey: ADMIN_KEYS.applications });
      const previousApps = queryClient.getQueryData<ApplicationItem[]>(
        ADMIN_KEYS.applications,
      );

      if (previousApps) {
        queryClient.setQueryData<ApplicationItem[]>(
          ADMIN_KEYS.applications,
          previousApps.map((a) => (a.id === id ? { ...a, ...patch } : a)),
        );
      }
      return { previousApps };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousApps) {
        queryClient.setQueryData(ADMIN_KEYS.applications, context.previousApps);
      }
      toast.error("Failed to save changes");
    },
    onSuccess: () => {
      toast.success("Application updated");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.applications });
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.dashboard });
    },
  });
}

// 5. Delete Application Mutation (Optimistic)
export function useDeleteApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete application");
      return res.json();
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ADMIN_KEYS.applications });
      const previousApps = queryClient.getQueryData<ApplicationItem[]>(
        ADMIN_KEYS.applications,
      );

      if (previousApps) {
        queryClient.setQueryData<ApplicationItem[]>(
          ADMIN_KEYS.applications,
          previousApps.filter((a) => a.id !== id),
        );
      }
      return { previousApps };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousApps) {
        queryClient.setQueryData(ADMIN_KEYS.applications, context.previousApps);
      }
      toast.error("Failed to delete application");
    },
    onSuccess: () => {
      toast.success("Application deleted");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.applications });
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.dashboard });
    },
  });
}

// 6. Update Lead Mutation (Optimistic)
export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: LeadItem["status"];
    }) => {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update lead");
      return res.json();
    },
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ADMIN_KEYS.leads });
      const previousLeads = queryClient.getQueryData<LeadItem[]>(
        ADMIN_KEYS.leads,
      );

      if (previousLeads) {
        queryClient.setQueryData<LeadItem[]>(
          ADMIN_KEYS.leads,
          previousLeads.map((l) => (l.id === id ? { ...l, status } : l)),
        );
      }
      return { previousLeads };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousLeads) {
        queryClient.setQueryData(ADMIN_KEYS.leads, context.previousLeads);
      }
      toast.error("Failed to update status");
    },
    onSuccess: () => {
      toast.success("Status updated");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.leads });
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.dashboard });
    },
  });
}

// 7. Delete Lead Mutation (Optimistic)
export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete lead");
      return res.json();
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ADMIN_KEYS.leads });
      const previousLeads = queryClient.getQueryData<LeadItem[]>(
        ADMIN_KEYS.leads,
      );

      if (previousLeads) {
        queryClient.setQueryData<LeadItem[]>(
          ADMIN_KEYS.leads,
          previousLeads.filter((l) => l.id !== id),
        );
      }
      return { previousLeads };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousLeads) {
        queryClient.setQueryData(ADMIN_KEYS.leads, context.previousLeads);
      }
      toast.error("Failed to delete lead");
    },
    onSuccess: () => {
      toast.success("Lead deleted");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.leads });
      queryClient.invalidateQueries({ queryKey: ADMIN_KEYS.dashboard });
    },
  });
}
