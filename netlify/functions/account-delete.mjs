import Stripe from "stripe";
import { admin } from "@netlify/identity";
import { getStore } from "@netlify/blobs";
import {
  authenticatedUser,
  clearDeletedUserMark,
  json,
  markDeletedUser,
  readUserRecord,
  userStore,
} from "./_shared/billing-store.mjs";
import { readCouponRegistry, writeCouponRegistry } from "./_shared/coupon-store.mjs";

const EVENT_USAGE_STORE = "genova-mapp-events-usage-v1";

function stripeClient() {
  const secret = Netlify.env.get("STRIPE_SECRET_KEY");
  if (!secret) return null;
  return new Stripe(secret);
}

function stripeCustomerId(record) {
  return String(record?.stripeCustomerId || record?.subscription?.stripeCustomerId || "").trim();
}

function stripeSubscriptionId(record) {
  return String(record?.subscription?.stripeSubscriptionId || "").trim();
}

async function cancelStripeSubscriptions(record) {
  const directId = stripeSubscriptionId(record);
  const customerId = stripeCustomerId(record);
  if (!directId && !customerId) return 0;

  const stripe = stripeClient();
  if (!stripe) throw new Error("stripe_not_configured");

  const ids = new Set();
  if (directId) ids.add(directId);
  if (customerId) {
    const list = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 100 });
    for (const subscription of list.data || []) {
      if (!subscription?.id) continue;
      if (subscription.status === "canceled" || subscription.status === "incomplete_expired") continue;
      ids.add(subscription.id);
    }
  }

  let cancelled = 0;
  for (const id of ids) {
    try {
      const subscription = await stripe.subscriptions.retrieve(id);
      if (subscription.status === "canceled" || subscription.status === "incomplete_expired") continue;
      await stripe.subscriptions.cancel(id);
      cancelled += 1;
    } catch (error) {
      if (error?.code === "resource_missing") continue;
      throw error;
    }
  }
  return cancelled;
}

async function anonymizeRedeemedCoupons(userId) {
  const registry = await readCouponRegistry();
  let changed = false;
  const now = Date.now();
  for (const coupon of registry.coupons || []) {
    if (String(coupon.redeemedBy || "") !== String(userId)) continue;
    coupon.redeemedBy = null;
    coupon.redeemedAccountDeletedAt = now;
    changed = true;
  }
  if (changed) await writeCouponRegistry(registry);
}

function safeUsageUserId(value) {
  return String(value || "").replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

async function deleteEventUsage(userId) {
  const store = getStore({ name: EVENT_USAGE_STORE, consistency: "strong" });
  const prefix = `user/${safeUsageUserId(userId)}/`;
  const page = await store.list({ prefix });
  await Promise.all((page?.blobs || []).map((item) => store.delete(item.key)));
}

export default async (request) => {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let user = null;
  let markedDeleted = false;
  let identityDeleted = false;
  try {
    user = await authenticatedUser(request);
    if (!user?.id) return json({ error: "unauthorized" }, 401);

    const body = await request.json().catch(() => ({}));
    if (body.confirm !== true) return json({ error: "confirmation_required" }, 400);

    const record = await readUserRecord(user.id).catch(() => null);

    // Il marcatore impedisce a webhook Stripe tardivi di ricreare il record utente.
    await markDeletedUser(user.id);
    markedDeleted = true;

    const cancelledSubscriptions = await cancelStripeSubscriptions(record);
    await anonymizeRedeemedCoupons(user.id);
    await deleteEventUsage(user.id);
    await userStore().delete(`user-${user.id}`);

    try {
      await admin.deleteUser(user.id);
      identityDeleted = true;
    } catch (error) {
      throw error;
    }

    return json({ ok: true, cancelledSubscriptions });
  } catch (error) {
    if (markedDeleted && !identityDeleted && user?.id) {
      await clearDeletedUserMark(user.id).catch(() => {});
      markedDeleted = false;
    }
    console.error("Genova mApp account-delete:", error);
    return json({ error: error?.message || "server_error" }, 500);
  }
};
