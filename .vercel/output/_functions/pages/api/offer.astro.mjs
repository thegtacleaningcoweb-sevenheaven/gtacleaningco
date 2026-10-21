import { r as readEnv, a as asRecord, b as readJson, c as clientError, t as textField, j as json, n as normalizeEmail, d as normalizePhone, s as sendMail, w as welcomeMail, o as ownerOfferMail, e as sentAt, f as serverError } from '../../chunks/mailer_cFFu9cQd.mjs';
import path from 'node:path';
export { renderers } from '../../renderers.mjs';

function redisConfig() {
  const url = readEnv("UPSTASH_REDIS_REST_URL") || readEnv("KV_REST_API_URL");
  const token = readEnv("UPSTASH_REDIS_REST_TOKEN") || readEnv("KV_REST_API_TOKEN");
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}
async function redis(command) {
  const config = redisConfig();
  if (!config) throw new Error("Redis is not configured");
  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  });
  const payload = await response.json();
  if (!response.ok || payload.error) {
    throw new Error(payload.error || "Redis request failed");
  }
  return payload.result ?? null;
}
path.join(process.cwd(), ".data", "offers.json");
Promise.resolve();
async function claimRedis(record) {
  const emailKey = `offer:email:${record.email}`;
  const phoneKey = `offer:phone:${record.phone}`;
  const [emailHit, phoneHit] = await Promise.all([redis(["GET", emailKey]), redis(["GET", phoneKey])]);
  if (emailHit || phoneHit) return "exists";
  const payload = JSON.stringify(record);
  const savedEmail = await redis(["SET", emailKey, payload, "NX"]);
  if (savedEmail !== "OK") return "exists";
  const savedPhone = await redis(["SET", phoneKey, payload, "NX"]);
  if (savedPhone !== "OK") {
    await redis(["DEL", emailKey]);
    return "exists";
  }
  return "saved";
}
async function claimOffer(record) {
  if (redisConfig()) return claimRedis(record);
  throw new Error("Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN before going live.");
}
async function releaseOffer(record) {
  if (redisConfig()) {
    await redis(["DEL", `offer:email:${record.email}`, `offer:phone:${record.phone}`]);
    return;
  }
  return;
}

const prerender = false;
const POST = async ({ request }) => {
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
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
