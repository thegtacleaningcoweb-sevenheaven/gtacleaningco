import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { isProd, readEnv } from "./env";

export type OfferRecord = {
  email: string;
  phone: string;
  phoneDisplay: string;
  createdAt: string;
};

type FileDb = { offers: OfferRecord[] };

function redisConfig() {
  const url = readEnv("UPSTASH_REDIS_REST_URL") || readEnv("KV_REST_API_URL");
  const token = readEnv("UPSTASH_REDIS_REST_TOKEN") || readEnv("KV_REST_API_TOKEN");
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

async function redis(command: string[]) {
  const config = redisConfig();
  if (!config) throw new Error("Redis is not configured");
  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  const payload = (await response.json()) as { result?: string | null; error?: string };
  if (!response.ok || payload.error) {
    throw new Error(payload.error || "Redis request failed");
  }
  return payload.result ?? null;
}

const filePath = path.join(process.cwd(), ".data", "offers.json");
let queue = Promise.resolve();

function exclusive<T>(task: () => Promise<T>) {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readFileDb(): Promise<FileDb> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as FileDb;
    if (!parsed || !Array.isArray(parsed.offers)) return { offers: [] };
    return parsed;
  } catch {
    return { offers: [] };
  }
}

async function claimFile(record: OfferRecord): Promise<"saved" | "exists"> {
  return exclusive(async () => {
    const db = await readFileDb();
    const exists = db.offers.some((item) => item.email === record.email || item.phone === record.phone);
    if (exists) return "exists";
    db.offers.push(record);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(db, null, 2));
    return "saved";
  });
}

async function claimRedis(record: OfferRecord): Promise<"saved" | "exists"> {
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

export async function claimOffer(record: OfferRecord) {
  if (redisConfig()) return claimRedis(record);
  if (isProd()) throw new Error("Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN before going live.");
  return claimFile(record);
}

export async function releaseOffer(record: Pick<OfferRecord, "email" | "phone">) {
  if (redisConfig()) {
    await redis(["DEL", `offer:email:${record.email}`, `offer:phone:${record.phone}`]);
    return;
  }
  if (isProd()) return;
  await exclusive(async () => {
    const db = await readFileDb();
    db.offers = db.offers.filter((item) => !(item.email === record.email && item.phone === record.phone));
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(db, null, 2));
  });
}
