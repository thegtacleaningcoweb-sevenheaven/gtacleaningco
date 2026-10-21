import type { APIRoute } from "astro";
import {
  asRecord,
  clientError,
  json,
  listField,
  normalizeEmail,
  normalizePhone,
  readJson,
  serverError,
  textField,
} from "../../lib/http";
import { customerQuoteMail, ownerQuoteMail, sendMail, type QuoteDetails } from "../../lib/mailer";

export const prerender = false;

function blank(value: string) {
  return value || "—";
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = asRecord(await readJson(request));
    if (!body) return clientError("Please complete the form and try again.");
    if (textField(body.company, 200)) return json({ ok: true });

    const name = textField(body.name, 120);
    const email = normalizeEmail(textField(body.email, 254));
    const phoneDisplay = textField(body.phone, 40);
    if (!name) return clientError("Please add your name.");
    if (!email) return clientError("Enter a valid email so we can confirm we received your request.");
    if (phoneDisplay && !normalizePhone(phoneDisplay)) return clientError("Enter a 10-digit phone number, or leave the phone blank.");

    const details: QuoteDetails = {
      name,
      email,
      phone: phoneDisplay,
      address: textField(body.address, 200),
      when: textField(body.when, 120),
      propertyType: textField(body.propertyType, 80),
      bedrooms: textField(body.bedrooms, 8),
      bathrooms: textField(body.bathrooms, 8),
      levels: textField(body.levels, 8),
      sqft: textField(body.sqft, 12),
      basement: textField(body.basement, 80),
      household: blank(listField(body.household).join(", ")),
      pets: textField(body.pets, 200),
      service: textField(body.service, 80),
      frequency: textField(body.frequency, 40),
      lastClean: textField(body.lastClean, 200),
      neglected: textField(body.neglected, 1000),
      addons: blank(listField(body.addons).join(", ")),
      delicate: textField(body.delicate, 300),
      priorities: textField(body.priorities, 1000),
    };

    await Promise.all([sendMail(customerQuoteMail(details)), sendMail(ownerQuoteMail(details))]);
    return json({ ok: true });
  } catch (error) {
    return serverError(error);
  }
};
