export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export async function readJson(request: Request, max = 20_000): Promise<unknown> {
  const length = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(length) && length > max) return null;
  const text = await request.text();
  if (text.length > max) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

export function asRecord(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

export function textField(value: unknown, max = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function listField(value: unknown, max = 20) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, max);
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(value: string) {
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !emailPattern.test(email)) return "";
  return email;
}

/** Canadian numbers, with or without a leading country code. */
export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const local = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (local.length !== 10) return "";
  return local;
}

export function clientError(message: string, status = 400) {
  return json({ ok: false, error: message }, status);
}

export function serverError(error: unknown) {
  console.error(error);
  return json(
    { ok: false, error: "We couldn't send that just now. Please call us and we'll take it from here." },
    500,
  );
}
