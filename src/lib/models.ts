// Shared types and small helpers for the admin data model.
import { cookies } from "next/headers";
import { WithId, Document } from "mongodb";
import { SESSION_COOKIE, verifySessionToken } from "./auth";

export const COLLECTIONS = {
  leads: "leads",
  applications: "applications",
  blogs: "blogs",
} as const;

export type LeadStatus = "New" | "Contacted" | "Qualified";

export interface Lead {
  name: string;
  email: string;
  phone: string;
  message: string;
  status: LeadStatus;
  createdAt: string; // ISO string
}

export type ApplicationStatus = "Pending" | "Review" | "Approved" | "Declined";

export interface ApplicationDoc {
  name: string;
  size: string;
}

export interface Application {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessAddress: string;
  timeInBusiness: string;
  industry: string;
  monthlyRevenue: string;
  requestedAmount: string;
  documents: ApplicationDoc[];
  status: ApplicationStatus;
  notes: string;
  createdAt: string; // ISO string
}

export const BLOG_CATEGORIES = [
  "Funding 101",
  "Growth",
  "Cash Flow",
  "Case Studies",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface Blog {
  title: string;
  subtitle: string;
  author: string;
  category: BlogCategory;
  bannerImage: string; // data URL or external URL
  content: string; // HTML
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

// Convert a MongoDB document (with ObjectId _id) into a plain JSON-safe object
// where `id` is the string form of `_id`.
export function serialize<T extends Document>(doc: WithId<T>) {
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest };
}

// Returns true when the current request carries a valid admin session cookie.
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}
