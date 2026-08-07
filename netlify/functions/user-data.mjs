import { getStore } from "@netlify/blobs";

const STORE_NAME = "genova-mapp-users-v1";
const MAX_BODY_BYTES = 750000;
const DATA_KEYS = new Set([
  "genova_favstars_v1", "genova_taccuino_routes_v1", "genova_taccuino_draft_v1",
  "genova_taccuino_notes_v1", "genova_taccuino_last_note_v1",
  "genova_taccuino_favorites_sort_v1", "walls_visible", "acq_visibility",
  "legend_blue", "legend_orange",
]);

function json(value, status = 200) {
  return Response.json(value, {
    status,
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
    },
  });
}

async function authenticatedUser(request) {
  const authorization = request.headers.get("authorization") || "";
  if (!/^Bearer\s+\S+/i.test(authorization)) return null;

  const identityURL = new URL("/.netlify/identity/user", request.url);
  const response = await fetch(identityURL, {
    headers: { authorization, accept: "application/json" },
  });
  if (!response.ok) return null;
  return response.json();
}

function cleanDataSnapshot(value) {
  if (!value || typeof value !== "object") return { version: 1, updatedAt: Date.now(), values: {} };
  const source = value.values && typeof value.values === "object" ? value.values : {};
  const values = {};
  for (const [key, item] of Object.entries(source)) {
    if (typeof key !== "string" || typeof item !== "string") continue;
    if (!DATA_KEYS.has(key) && !/^doc_(?:item|lang)_/.test(key)) continue;
    if (item.length > 700000) continue;
    values[key] = item;
  }
  return {
    version: 1,
    updatedAt: Number(value.updatedAt) || Date.now(),
    values,
  };
}

function activeSubscription(plan) {
  const now = Date.now();
  const year = plan === "yearly";
  return {
    status: "active",
    plan: year ? "yearly" : "monthly",
    simulated: true,
    startedAt: now,
    trialEndsAt: now + 24 * 60 * 60 * 1000,
    renewsAt: now + (year ? 365 : 30) * 24 * 60 * 60 * 1000,
    checkedAt: now,
  };
}

export default async (request) => {
  try {
    const user = await authenticatedUser(request);
    if (!user || !user.id) return json({ error: "unauthorized" }, 401);

    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    const key = `user-${user.id}`;
    const existing = (await store.get(key, { type: "json" })) || null;

    if (request.method === "GET") {
      if (existing?.subscription?.status === "active") {
        existing.subscription.checkedAt = Date.now();
        existing.updatedAt = Date.now();
        await store.setJSON(key, existing);
      }
      return json({ record: existing });
    }

    if (request.method !== "POST") {
      return json({ error: "method_not_allowed" }, 405);
    }

    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
      return json({ error: "payload_too_large" }, 413);
    }
    const body = raw ? JSON.parse(raw) : {};
    const now = Date.now();
    const record = existing || {
      version: 1,
      userId: user.id,
      email: user.email || "",
      data: null,
      subscription: { status: "inactive", simulated: true, checkedAt: now },
      createdAt: now,
    };

    record.email = user.email || record.email || "";
    record.updatedAt = now;

    if (body.action === "saveData") {
      record.data = cleanDataSnapshot(body.data);
    } else if (body.action === "activateSubscription") {
      record.subscription = activeSubscription(body.plan);
    } else if (body.action === "cancelSubscription") {
      record.subscription = {
        ...(record.subscription || {}),
        status: "cancelled",
        simulated: true,
        cancelledAt: now,
        checkedAt: now,
      };
    } else {
      return json({ error: "invalid_action" }, 400);
    }

    await store.setJSON(key, record);
    return json({ record });
  } catch (error) {
    console.error("Genova mApp user-data:", error);
    return json({ error: "server_error" }, 500);
  }
};
