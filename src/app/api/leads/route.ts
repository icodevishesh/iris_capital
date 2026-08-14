import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/mongodb";
import { COLLECTIONS, isAuthenticated, serialize } from "@/lib/models";
import { sendContactEmails } from "@/lib/mailer";

export const dynamic = "force-dynamic";

const createSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  message: z.string().trim().min(5).max(1500),
});

// Admin: list all leads (newest first).
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = await getDb();
  const docs = await db
    .collection(COLLECTIONS.leads)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json({ leads: docs.map(serialize) });
}

// Public: submit the contact form.
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
  const lead = {
    ...parsed.data,
    status: "New" as const,
    createdAt: new Date().toISOString(),
  };
  const result = await db.collection(COLLECTIONS.leads).insertOne(lead);

  // Send the thank-you email to the user and the notification to the internal
  // inbox. A mail failure must not fail the submission that we already stored.
  try {
    await sendContactEmails(parsed.data);
  } catch (err) {
    console.error("Failed to send contact emails:", err);
  }

  return NextResponse.json(
    { id: result.insertedId.toString() },
    { status: 201 },
  );
}
