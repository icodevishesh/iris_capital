import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, isAuthenticated, serialize } from "@/lib/models";

export const dynamic = "force-dynamic";

const createSchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  businessName: z.string().trim().min(1).max(160),
  businessAddress: z.string().trim().min(5).max(300),
  timeInBusiness: z.string().min(1),
  industry: z.string().min(1),
  monthlyRevenue: z.string().min(1),
  requestedAmount: z.string().min(1),
  documents: z
    .array(z.object({ name: z.string(), size: z.string() }))
    .default([]),
});

// Admin: list all applications (newest first).
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = await getDb();
  const docs = await db
    .collection(COLLECTIONS.applications)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json({ applications: docs.map(serialize) });
}

// Public: submit the funding application.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const db = await getDb();
  const application = {
    ...parsed.data,
    status: "Pending" as const,
    notes: "",
    createdAt: new Date().toISOString(),
  };
  const result = await db
    .collection(COLLECTIONS.applications)
    .insertOne(application);
  return NextResponse.json(
    { id: result.insertedId.toString() },
    { status: 201 },
  );
}
