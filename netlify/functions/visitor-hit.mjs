import crypto from "node:crypto";
import { json } from "./_shared/billing-store.mjs";
import { romeDayKey, visitorStore } from "./_shared/visitor-store.mjs";

function cleanVisitorId(value) {
  const id = String(value || "").trim();
  if (id.length < 16 || id.length > 100) return "";
  if (!/^[A-Za-z0-9._:-]+$/.test(id)) return "";
  return id;
}

function visitorHash(visitorId) {
  return crypto.createHash("sha256").update(visitorId, "utf8").digest("hex");
}

export default async (request) => {
  try {
    if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);

    let payload = {};
    try {
      payload = await request.json();
    } catch (_error) {
      return json({ error: "invalid_json" }, 400);
    }

    const visitorId = cleanVisitorId(payload?.visitorId);
    if (!visitorId) return json({ error: "invalid_visitor" }, 400);

    const now = Date.now();
    const day = romeDayKey(new Date(now));
    const hash = visitorHash(visitorId);
    const store = visitorStore();
    const visitorKey = `visitor-${hash}`;
    const dayKey = `day-${day}-${hash}`;

    const previous = await store.get(visitorKey, { type: "json" }).catch(() => null);
    await Promise.all([
      store.setJSON(visitorKey, {
        version: 1,
        firstSeenAt: Number(previous?.firstSeenAt) || now,
        lastSeenAt: now,
      }),
      store.setJSON(dayKey, { version: 1, seenAt: now }),
    ]);

    return json({ ok: true, day });
  } catch (error) {
    console.error("Genova mApp visitor hit:", error);
    return json({ error: "server_error" }, 500);
  }
};
