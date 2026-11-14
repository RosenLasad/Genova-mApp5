import { authenticatedUser, isAdminUser, json } from "./_shared/billing-store.mjs";
import { cleanVisitorId, visitorHash, romeDayKey, visitorStore } from "./_shared/visitor-store.mjs";

export default async (request) => {
  try {
    if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);

    // Signed-in visits must be validated on the server. Admin visits are
    // excluded before writing either the visitor record or a daily record.
    const authHeader = request.headers.get("authorization") || "";
    if (authHeader) {
      const user = await authenticatedUser(request).catch(() => null);
      if (!user?.id) return json({ error: "invalid_authentication" }, 401);
      if (isAdminUser(user)) return json({ ok: true, excluded: "admin" });
    }

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
    // The exclusion is server-side and applies even when this browser is logged out.
    if (await store.get(`excluded-${hash}`, { type: 'json' })) {
      return json({ ok: true, day, excluded: 'browser' });
    }
    const visitorKey = `visitor-${hash}`;
    const dayKey = `day-${day}-${hash}`;

    const previous = await store.get(visitorKey, { type: "json" });
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
