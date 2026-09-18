import { Resend } from "resend";
import type { Magnet } from "./magnets";
import type {
  ContactInput,
  LeadMagnetInput,
  NewsletterInput,
  TutorApplicationInput,
} from "./schemas";

const DEFAULT_SENDER = "onboarding@resend.dev";
const DEFAULT_RECIPIENT = "aqaexaminergeorginapinto@outlook.com";

type Email = { to: string; subject: string; html: string; replyTo?: string };

/**
 * Sends one email. Failures are logged and never thrown: the database row is
 * the source of truth, and a submission must not fail because of email.
 * Always await this; a serverless function can be frozen once it responds.
 */
export async function sendEmail({ to, subject, html, replyTo }: Email): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(`RESEND_API_KEY not set, skipping email: ${subject}`);
    return;
  }
  try {
    const { data, error } = await new Resend(apiKey).emails.send({
      from: process.env.SENDER_EMAIL || DEFAULT_SENDER,
      to: [to],
      subject,
      html,
      replyTo,
    });
    if (error) console.error(`Resend rejected email "${subject}"`, error);
    else console.info(`Resend email sent id=${data?.id}`);
  } catch (err) {
    console.error(`Resend email failed: ${subject}`, err);
  }
}

const ownerAddress = () => process.env.NOTIFICATION_EMAIL || DEFAULT_RECIPIENT;

// ---------- templates ----------

export const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

const multiline = (s: string) => escapeHtml(s.trim()).replace(/\n/g, "<br>");
const firstWord = (s: string) => s.trim().split(/\s+/)[0] || "them";
const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const layout = (eyebrow: string, heading: string, intro: string, inner: string) => `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background:#FBF7F2; padding:24px;">
      <div style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:16px; padding:28px; border:1px solid #f1e2e8;">
        <p style="font-family:'Caveat',cursive; color:#E11D67; font-size:22px; margin:0;">${eyebrow}</p>
        <h1 style="font-size:22px; color:#2A1F26; margin:6px 0 4px 0;">${heading}</h1>
        <p style="color:#6B5E62; margin:0 0 18px 0; font-size:14px;">${intro}</p>
        ${inner}
      </div>
    </div>`;

// Values are escaped here; labels are fixed strings.
const details = (rows: [label: string, value: string | null | undefined, href?: string][]) => `
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse; font-size:14px;">
          ${rows
            .map(([label, value, href]) => {
              const v = escapeHtml(value || "—");
              const cell = href
                ? `<a href="${escapeHtml(href)}" style="color:#E11D67; text-decoration:none;">${v}</a>`
                : v;
              return `<tr><td style="padding:8px 0; color:#6B5E62; width:120px; vertical-align:top;">${label}</td><td style="padding:8px 0; color:#2A1F26;">${cell}</td></tr>`;
            })
            .join("\n          ")}
        </table>`;

const block = (label: string, body: string) => `
        <p style="margin:18px 0 6px 0; color:#6B5E62; font-size:14px;">${label}</p>
        <div style="background:#FCE2EC; color:#2A1F26; padding:16px 18px; border-radius:12px; font-size:15px; line-height:1.5;">
          ${multiline(body)}
        </div>`;

const footnote = (text: string) =>
  `<p style="margin-top:22px; font-size:12px; color:#6B5E62;">${text}</p>`;

const sentAt = (createdAt: string) =>
  `Sent ${escapeHtml(createdAt)} via thetravellingtutorx.co.uk`;

// ---------- notifications to the owner ----------

export function notifyContact(c: ContactInput, createdAt: string) {
  const role = titleCase(c.role);
  const subject = c.subject || "(no subject)";
  return sendEmail({
    to: ownerAddress(),
    replyTo: c.email,
    subject: `New enquiry from ${c.name} (${role}) — ${subject}`,
    html: layout(
      "new enquiry · the travelling tutor x",
      "New contact form submission",
      sentAt(createdAt),
      details([
        ["Name", c.name],
        ["Email", c.email, `mailto:${c.email}`],
        ["Role", role],
        ["Subject", subject],
      ]) +
        block("Message", c.message) +
        footnote(`Reply directly to this email to respond to ${escapeHtml(firstWord(c.name))}.`),
    ),
  });
}

export function notifyNewsletter(n: NewsletterInput, createdAt: string) {
  return sendEmail({
    to: ownerAddress(),
    replyTo: n.email,
    subject: `New newsletter signup: ${n.email}`,
    html: layout(
      "new subscriber · the travelling tutor x",
      "New newsletter signup",
      sentAt(createdAt),
      details([
        ["Email", n.email, `mailto:${n.email}`],
        ["Signed up from", n.source],
      ]),
    ),
  });
}

export function notifyLeadMagnet(l: LeadMagnetInput, magnet: Magnet, createdAt: string) {
  const status = magnet.ready
    ? "They've been emailed the download link."
    : "This pack's file isn't uploaded yet, so they haven't been sent anything. Reply to send it by hand.";
  return sendEmail({
    to: ownerAddress(),
    replyTo: l.email,
    subject: `New ${l.audience} download: ${magnet.title}`,
    html: layout(
      "new download · the travelling tutor x",
      "Someone requested a free resource",
      sentAt(createdAt),
      details([
        ["First name", l.first_name],
        ["Email", l.email, `mailto:${l.email}`],
        ["Audience", titleCase(l.audience)],
        ["Resource", magnet.title],
      ]) + footnote(escapeHtml(status)),
    ),
  });
}

export function notifyTutorApplication(t: TutorApplicationInput, createdAt: string) {
  return sendEmail({
    to: ownerAddress(),
    replyTo: t.email,
    subject: `New tutor partner application: ${t.name}`,
    html: layout(
      "new tutor partner · the travelling tutor x",
      "New Tutor Training Programme signup",
      sentAt(createdAt),
      details([
        ["Name", t.name],
        ["Email", t.email, `mailto:${t.email}`],
        ["Phone", t.phone],
      ]) +
        block("Qualifications", t.qualifications) +
        block("Experience", t.experience) +
        block("Why they're joining", t.why_join) +
        footnote(
          "They were sent on to the Stripe Payment Link. Check the Stripe dashboard to confirm the deposit was paid.",
        ),
    ),
  });
}

// ---------- emails to visitors ----------

export function sendLeadMagnetDownload(l: LeadMagnetInput, magnet: Magnet, downloadUrl: string) {
  const url = escapeHtml(downloadUrl);
  const title = escapeHtml(magnet.title);
  return sendEmail({
    to: l.email,
    subject: `Your free resource: ${magnet.title}`,
    html: layout(
      "the travelling tutor x",
      `Hi ${escapeHtml(l.first_name)}, here's your download`,
      `Thanks for requesting <strong>${title}</strong>.`,
      `
        <p style="margin:8px 0 22px 0;">
          <a href="${url}" style="display:inline-block; background:#E11D67; color:#ffffff; text-decoration:none; font-weight:600; padding:12px 24px; border-radius:999px;">Download ${title}</a>
        </p>
        <p style="color:#6B5E62; font-size:14px; margin:0;">If the button doesn't work, copy this link into your browser:<br>
          <a href="${url}" style="color:#E11D67; word-break:break-all;">${url}</a>
        </p>` +
        footnote(
          "Questions about Sociology? Just reply to this email.<br>Georgina · The Travelling Tutor X",
        ),
    ),
    replyTo: ownerAddress(),
  });
}
