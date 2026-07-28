import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, isAuthenticated, serialize } from "@/lib/models";

export const dynamic = "force-dynamic";

// Admin: aggregated stats for the dashboard.
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const leads = db.collection(COLLECTIONS.leads);
  const applications = db.collection(COLLECTIONS.applications);

  const [
    totalLeads,
    totalApplications,
    pending,
    approved,
    review,
    declined,
    recentDocs,
  ] = await Promise.all([
    leads.countDocuments({}),
    applications.countDocuments({}),
    applications.countDocuments({ status: "Pending" }),
    applications.countDocuments({ status: "Approved" }),
    applications.countDocuments({ status: "Review" }),
    applications.countDocuments({ status: "Declined" }),
    applications.find({}).sort({ createdAt: -1 }).limit(6).toArray(),
  ]);

  const decided = approved + declined;
  const conversion = decided > 0 ? (approved / decided) * 100 : 0;

  return NextResponse.json({
    kpis: {
      totalLeads,
      totalApplications,
      pending,
      approved,
      review,
      declined,
    },
    conversion: Number(conversion.toFixed(1)),
    recent: recentDocs.map(serialize),
  });
}
