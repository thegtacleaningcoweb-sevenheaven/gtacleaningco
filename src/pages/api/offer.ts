import type { APIRoute } from "astro";
import { asRecord, clientError, normalizeEmail, normalizePhone, readJson, serverError, textField, json } from "../../lib/http";
import { ownerOfferMail, sendMail, sentAt, welcomeMail } from "../../lib/mailer";
import { claimOffer, releaseOffer } from "../../lib/offers";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = asRecord(await readJson(request));
    if (!body) return clientError("Please enter your email and phone.");
    if (textField(body.company, 200)) return json({ ok: true, status: "sent" });

    const email = normalizeEmail(textField(body.email, 254));
    const phoneDisplay = textField(body.phone, 40);
    const phone = normalizePhone(phoneDisplay);
    if (!email) return clientError("Enter a valid email address.");
    if (!phone) return clientError("Enter a 10-digit phone number.");

    const record = {
      email,
      phone,
      phoneDisplay,
      createdAt: new Date().toISOString(),
    };
    const result = await claimOffer(record);

    if (result === "exists") {
      return json({ ok: true, status: "exists" });
    }

    try {
      await Promise.all([sendMail(welcomeMail(email)), sendMail(ownerOfferMail(email, phoneDisplay, sentAt()))]);
    } catch (error) {
      await releaseOffer(record);
      throw error;
    }
    return json({ ok: true, status: "sent" });
  } catch (error) {
    return serverError(error);
  }
};
