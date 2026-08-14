import nodemailer, { type Transporter } from "nodemailer";

// SMTP configuration is read from the environment. All are required for mail
// to be sent; if any are missing we throw early with a helpful message.
const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER;
const password = process.env.SMTP_PASSWORD;

// Address that receives internal notifications when a form is submitted.
export const NOTIFY_EMAIL = process.env.CONTACT_EMAIL || user || "";

// The "from" address for every outgoing mail. Must match the authenticated
// SMTP user, otherwise providers such as Office 365 reject the message.
const FROM_ADDRESS = `Iris Private Equity Group <${user}>`;

// Reuse a single transporter across hot reloads in development so we don't
// open a new connection pool on every request.
declare global {
  var _mailTransporter: Transporter | undefined;
}

function getTransporter(): Transporter {
  if (!host || !user || !password) {
    throw new Error(
      "Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER and " +
        "SMTP_PASSWORD in your .env file.",
    );
  }

  if (global._mailTransporter) return global._mailTransporter;

  const transporter = nodemailer.createTransport({
    host,
    port,
    // Port 465 uses implicit TLS; 587 (and others) upgrade via STARTTLS.
    secure: port === 465,
    auth: { user, pass: password },
  });

  if (process.env.NODE_ENV !== "production") {
    global._mailTransporter = transporter;
  }
  return transporter;
}

type Mail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

async function sendMail(mail: Mail): Promise<void> {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: FROM_ADDRESS,
    to: mail.to,
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  });
}

// --- Shared HTML helpers -------------------------------------------------

const BRAND = "Iris Private Equity Group";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function layout(heading: string, body: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;">
  <h2 style="color:#0b3d2e;margin:0 0 16px;">${heading}</h2>
  ${body}
  <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0;" />
  <p style="font-size:12px;color:#888;">${BRAND}<br/>This is an automated message, please do not reply directly.</p>
</div>`;
}

function detailRows(fields: Array<[string, string]>): string {
  return `<table style="border-collapse:collapse;width:100%;font-size:14px;">
${fields
  .map(
    ([label, value]) =>
      `<tr><td style="padding:6px 12px 6px 0;color:#555;vertical-align:top;font-weight:bold;">${escapeHtml(
        label,
      )}</td><td style="padding:6px 0;">${escapeHtml(value || "-")}</td></tr>`,
  )
  .join("\n")}
</table>`;
}

// --- Contact form --------------------------------------------------------

export type ContactLead = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function sendContactEmails(lead: ContactLead): Promise<void> {
  const details: Array<[string, string]> = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Message", lead.message],
  ];

  // 1) Thank-you email to the person who submitted the form.
  const userHtml = layout(
    `Thank you for reaching out, ${escapeHtml(lead.name)}`,
    `<p>We have received your message and a member of our team will get back to you shortly.</p>
     <p style="margin-top:16px;font-weight:bold;">Your submission:</p>
     ${detailRows(details)}`,
  );
  const userText =
    `Thank you for reaching out, ${lead.name}.\n\n` +
    `We have received your message and a member of our team will get back to you shortly.\n\n` +
    `Your submission:\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nMessage: ${lead.message}\n\n${BRAND}`;

  // 2) Notification email to the internal inbox.
  const adminHtml = layout(
    "New contact form submission",
    `<p>A new user has submitted the contact form.</p>${detailRows(details)}`,
  );
  const adminText =
    `New contact form submission.\n\n` +
    `Name: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nMessage: ${lead.message}`;

  await Promise.all([
    sendMail({
      to: lead.email,
      subject: `Thank you for contacting ${BRAND}`,
      html: userHtml,
      text: userText,
    }),
    sendMail({
      to: NOTIFY_EMAIL,
      subject: `New contact form submission from ${lead.name}`,
      html: adminHtml,
      text: adminText,
      replyTo: lead.email,
    }),
  ]);
}

// --- Apply now form ------------------------------------------------------

export type FundingApplication = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessAddress: string;
  timeInBusiness: string;
  industry: string;
  monthlyRevenue: string;
  requestedAmount: string;
  documents?: Array<{ name: string; size: string }>;
};

export async function sendApplicationEmails(
  application: FundingApplication,
): Promise<void> {
  const documents = application.documents ?? [];
  const details: Array<[string, string]> = [
    ["Full Name", application.fullName],
    ["Email", application.email],
    ["Phone", application.phone],
    ["Business Name", application.businessName],
    ["Business Address", application.businessAddress],
    ["Time in Business", application.timeInBusiness],
    ["Industry", application.industry],
    ["Monthly Revenue", application.monthlyRevenue],
    ["Requested Amount", application.requestedAmount],
    [
      "Documents",
      documents.length
        ? documents.map((d) => `${d.name} (${d.size})`).join(", ")
        : "None",
    ],
  ];

  // 1) Confirmation email to the applicant.
  const userHtml = layout(
    `Application received, ${escapeHtml(application.fullName)}`,
    `<p>Thank you for applying for funding with ${BRAND}. We have received your application and our team will review it and reach out to you soon.</p>
     <p style="margin-top:16px;font-weight:bold;">Application summary:</p>
     ${detailRows(details)}`,
  );
  const userText =
    `Application received, ${application.fullName}.\n\n` +
    `Thank you for applying for funding with ${BRAND}. We have received your application and our team will review it and reach out to you soon.\n\n` +
    details.map(([l, v]) => `${l}: ${v || "-"}`).join("\n") +
    `\n\n${BRAND}`;

  // 2) Notification email to the internal inbox.
  const adminHtml = layout(
    "New funding application",
    `<p>A new user has submitted the apply now form.</p>${detailRows(details)}`,
  );
  const adminText =
    `New funding application.\n\n` +
    details.map(([l, v]) => `${l}: ${v || "-"}`).join("\n");

  await Promise.all([
    sendMail({
      to: application.email,
      subject: `Your funding application with ${BRAND}`,
      html: userHtml,
      text: userText,
    }),
    sendMail({
      to: NOTIFY_EMAIL,
      subject: `New funding application from ${application.fullName}`,
      html: adminHtml,
      text: adminText,
      replyTo: application.email,
    }),
  ]);
}
