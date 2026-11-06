import { offerAmount, offerCode } from "../data/offer";
import { site } from "../data/site";
import { isProd, readEnv } from "./env";

type Mail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

function ownerEmail() {
  const email = readEnv("OWNER_EMAIL");
  if (email) return email;
  if (isProd()) throw new Error("Set OWNER_EMAIL before going live.");
  return "owner@localhost";
}

function fromAddress() {
  return readEnv("EMAIL_FROM") || `${site.name} <onboarding@resend.dev>`;
}

function esc(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function row(label: string, value: string) {
  const shown = value.trim() || "—";
  return `<tr>
    <td style="padding:8px 12px 8px 0;color:#5c656c;font-size:14px;vertical-align:top;width:42%">${esc(label)}</td>
    <td style="padding:8px 0;color:#121416;font-size:15px;font-weight:600;vertical-align:top">${esc(shown)}</td>
  </tr>`;
}

function section(title: string, rows: string) {
  return `<h2 style="margin:28px 0 8px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#094078">${esc(title)}</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #dce2e6">${rows}</table>`;
}

function logoUrl() {
  return new URL("/images/email-logo.png", site.url).href;
}

function shell(preheader: string, body: string) {
  const logo = logoUrl();
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f4f6f7;color:#121416;font-family:Figtree,Segoe UI,Helvetica,Arial,sans-serif">
    <div style="display:none;max-height:0;overflow:hidden">${esc(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f7;padding:24px 12px">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
            <tr>
              <td style="background:#094078;padding:0;line-height:0">
                <a href="${esc(site.url)}" style="display:block;text-decoration:none">
                  <img src="${esc(logo)}" width="560" height="112" alt="${esc(site.name)}" style="display:block;width:100%;max-width:560px;height:auto;border:0;outline:none;text-decoration:none" />
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:28px">${body}
                <p style="margin:32px 0 0;color:#5c656c;font-size:13px;line-height:1.5">${esc(site.slogan)}<br>${esc(site.city)}, ${esc(site.region)} · ${esc(site.phoneDisplay)} · ${esc(site.email)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function line(label: string, value: string) {
  return `${label}: ${value.trim() || "—"}`;
}

export function welcomeMail(to: string): Mail {
  const html = shell(
    `Your code is ${offerCode}. ${offerAmount} off your first cleaning.`,
    `<p style="margin:0;font-size:13px;letter-spacing:0.14em;font-weight:700;color:#094078">GET ${esc(offerAmount)} OFF</p>
     <h1 style="margin:8px 0 0;font-size:28px;line-height:1.15">on your first cleaning</h1>
     <p style="margin:16px 0 0;font-size:16px;line-height:1.5;color:#5c656c">Thanks for signing up. Your code is ready. Mention it when you book and we'll take ${esc(offerAmount)} off your first visit.</p>
     <p style="margin:22px 0 0;padding:18px;background:#f4f6f7;border-radius:12px;text-align:center">
       <span style="display:block;font-size:12px;letter-spacing:0.14em;color:#5c656c">YOUR CODE</span>
       <strong style="display:block;margin-top:6px;font-size:32px;letter-spacing:0.08em;color:#094078">${esc(offerCode)}</strong>
     </p>
     <h2 style="margin:28px 0 8px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#094078">How to use it</h2>
     <ol style="margin:0;padding-left:18px;color:#121416;font-size:15px;line-height:1.6">
       <li>Request a quote on our site, or reply to this email.</li>
       <li>Tell us the code <strong>${esc(offerCode)}</strong> when you book.</li>
       <li>${esc(offerAmount)} comes off the first cleaning only.</li>
     </ol>
     <h2 style="margin:28px 0 8px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#094078">Good to know</h2>
     <ul style="margin:0;padding-left:18px;color:#121416;font-size:15px;line-height:1.6">
       <li>One code per email address or phone number.</li>
       <li>It applies to your first cleaning only.</li>
       <li>This email is your copy. Keep it for the booking.</li>
     </ul>`,
  );
  const text = [
    `${site.name}`,
    "",
    `GET ${offerAmount} OFF on your first cleaning`,
    "",
    `Your code: ${offerCode}`,
    "",
    "How to use it",
    "1. Request a quote on our site, or reply to this email.",
    `2. Tell us the code ${offerCode} when you book.`,
    `3. ${offerAmount} comes off the first cleaning only.`,
    "",
    "Good to know",
    "- One code per email address or phone number.",
    "- It applies to your first cleaning only.",
    "",
    site.slogan,
    `${site.city}, ${site.region} · ${site.phoneDisplay} · ${site.email}`,
  ].join("\n");
  return {
    to,
    replyTo: ownerEmail(),
    subject: `Your ${offerAmount} off code is ${offerCode}`,
    html,
    text,
  };
}

export function ownerOfferMail(email: string, phoneDisplay: string, when: string): Mail {
  const html = shell(
    `New offer signup: ${email}`,
    `<h1 style="margin:0;font-size:24px">New ${esc(offerAmount)} offer signup</h1>
     <p style="margin:12px 0 0;color:#5c656c;font-size:15px">Someone asked for the first-cleaning code. ${esc(offerCode)} was emailed to them.</p>
     ${section("Signup", row("Email", email) + row("Phone", phoneDisplay) + row("Code sent", offerCode) + row("When", when))}`,
  );
  const text = [
    `New ${offerAmount} offer signup`,
    "",
    line("Email", email),
    line("Phone", phoneDisplay),
    line("Code sent", offerCode),
    line("When", when),
  ].join("\n");
  return {
    to: ownerEmail(),
    replyTo: email,
    subject: `New $25 offer signup — ${email}`,
    html,
    text,
  };
}

export type QuoteDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  when: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  levels: string;
  sqft: string;
  basement: string;
  household: string;
  pets: string;
  service: string;
  frequency: string;
  lastClean: string;
  neglected: string;
  addons: string;
  delicate: string;
  priorities: string;
};

function quoteSections(details: QuoteDetails) {
  const contact =
    row("Name", details.name) +
    row("Email", details.email) +
    row("Phone", details.phone) +
    row("Address", details.address) +
    row("Frequency", details.frequency) +
    row("Preferred time", details.when);
  const property =
    row("Property", details.propertyType) +
    row("Bedrooms", details.bedrooms) +
    row("Bathrooms", details.bathrooms) +
    row("Levels", details.levels) +
    row("Square feet", details.sqft) +
    row("Basement", details.basement) +
    row("Household", details.household) +
    row("Pets", details.pets);
  const service =
    row("Service", details.service) +
    row("Last professional clean", details.lastClean) +
    row("Neglected areas", details.neglected) +
    row("Add-ons", details.addons) +
    row("Delicate surfaces", details.delicate) +
    row("Priorities", details.priorities);
  return { contact, property, service };
}

function quoteText(details: QuoteDetails) {
  return [
    "Contact",
    line("Name", details.name),
    line("Email", details.email),
    line("Phone", details.phone),
    line("Address", details.address),
    line("Frequency", details.frequency),
    line("Preferred time", details.when),
    "",
    "Service",
    line("Service", details.service),
    line("Last professional clean", details.lastClean),
    line("Neglected areas", details.neglected),
    line("Add-ons", details.addons),
    line("Delicate surfaces", details.delicate),
    line("Priorities", details.priorities),
    "",
    "Property",
    line("Property", details.propertyType),
    line("Bedrooms", details.bedrooms),
    line("Bathrooms", details.bathrooms),
    line("Levels", details.levels),
    line("Square feet", details.sqft),
    line("Basement", details.basement),
    line("Household", details.household),
    line("Pets", details.pets),
  ].join("\n");
}

export function customerQuoteMail(details: QuoteDetails): Mail {
  const parts = quoteSections(details);
  const html = shell(
    "We received your cleaning request.",
    `<h1 style="margin:0;font-size:26px">We received your request</h1>
     <p style="margin:12px 0 0;color:#5c656c;font-size:16px;line-height:1.5">Thanks, ${esc(details.name) || "there"}. Your details are with our team. This confirms we received them. It is not a confirmed booking yet. We'll reply with your quote and availability.</p>
     ${section("What you sent", parts.contact)}
     ${section("Service", parts.service)}
     ${section("Property", parts.property)}`,
  );
  const text = [
    site.name,
    "",
    "We received your request",
    "",
    "Your details are with our team. This confirms we received them. It is not a confirmed booking yet. We'll reply with your quote and availability.",
    "",
    quoteText(details),
    "",
    site.slogan,
    `${site.phoneDisplay} · ${site.email}`,
  ].join("\n");
  return {
    to: details.email,
    replyTo: ownerEmail(),
    subject: `We received your cleaning request — ${site.name}`,
    html,
    text,
  };
}

export function ownerQuoteMail(details: QuoteDetails): Mail {
  const parts = quoteSections(details);
  const html = shell(
    `New quote request from ${details.name}`,
    `<h1 style="margin:0;font-size:26px">New quote request</h1>
     <p style="margin:12px 0 0;color:#5c656c;font-size:16px">Reply to this email to reach ${esc(details.name) || "the client"} directly.</p>
     ${section("Contact", parts.contact)}
     ${section("Service", parts.service)}
     ${section("Property", parts.property)}`,
  );
  const text = [`New quote request`, "", quoteText(details)].join("\n");
  return {
    to: ownerEmail(),
    replyTo: details.email,
    subject: `New quote request — ${details.name || details.email}`,
    html,
    text,
  };
}

async function writeOutbox(message: Mail) {
  const [{ mkdir, writeFile }, path] = await Promise.all([import("node:fs/promises"), import("node:path")]);
  const dir = path.join(process.cwd(), ".data", "outbox");
  await mkdir(dir, { recursive: true });
  const stamp = new Date().toISOString().replaceAll(":", "-");
  const file = path.join(dir, `${stamp}-${message.subject.slice(0, 24).replaceAll(/[^\w]+/g, "-")}.json`);
  await writeFile(
    file,
    JSON.stringify({ to: message.to, replyTo: message.replyTo, subject: message.subject, text: message.text, html: message.html }, null, 2),
  );
}

export async function sendMail(message: Mail) {
  const key = readEnv("RESEND_API_KEY");
  if (!key) {
    if (isProd()) throw new Error("Set RESEND_API_KEY before going live.");
    await writeOutbox(message);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress(),
      to: [message.to],
      subject: message.subject,
      html: message.html,
      text: message.text,
      reply_to: message.replyTo,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend ${response.status}: ${detail.slice(0, 300)}`);
  }
}

export function sentAt() {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Toronto",
  }).format(new Date());
}
