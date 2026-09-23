import {
  authenticatedUser,
  isAdminUser,
  json,
  userStore,
} from "./_shared/billing-store.mjs";

function finiteTimestamp(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function hasPreviousPremium(subscription) {
  if (!subscription || typeof subscription !== "object") return false;
  if (subscription.source === "coupon" || subscription.plan === "coupon") return true;
  if (subscription.stripeSubscriptionId || subscription.stripeCustomerId) return true;
  return subscription.plan === "monthly" || subscription.plan === "yearly";
}

function classifyRecord(record, now = Date.now()) {
  const subscription = record?.subscription && typeof record.subscription === "object"
    ? record.subscription
    : {};
  const user = { id: record?.userId || "", email: record?.email || "" };
  const admin = isAdminUser(user) || record?.isAdmin === true || subscription.adminOverride === true;
  const currentPeriodEnd = finiteTimestamp(subscription.currentPeriodEnd || subscription.renewsAt);
  const realActive = !admin &&
    subscription.simulated === false &&
    subscription.status === "active" &&
    (!currentPeriodEnd || currentPeriodEnd > now);
  const knownSource = (subscription.source === "coupon" || subscription.plan === "coupon")
    ? "coupon"
    : ((subscription.stripeSubscriptionId || subscription.stripeCustomerId || subscription.plan === "monthly" || subscription.plan === "yearly") ? "stripe" : "none");
  const source = admin ? "admin" : knownSource;
  const expired = !admin && !realActive && hasPreviousPremium(subscription);
  const status = admin ? "admin" : (realActive ? "premium" : (expired ? "expired" : "free"));

  return {
    email: String(record?.email || "").trim(),
    status,
    source,
    plan: String(subscription.plan || ""),
    subscriptionStatus: String(subscription.status || "inactive"),
    stripeStatus: String(subscription.stripeStatus || ""),
    currentPeriodEnd,
    cancelAtPeriodEnd: subscription.cancelAtPeriodEnd === true,
    couponCode: String(subscription.couponCode || ""),
    couponNumber: Number(subscription.couponNumber) || null,
    couponLabel: String(subscription.couponLabel || ""),
    durationDays: Number(subscription.durationDays) || null,
    premiumStartedAt: finiteTimestamp(subscription.startedAt),
    createdAt: finiteTimestamp(record?.createdAt),
    updatedAt: finiteTimestamp(record?.updatedAt),
  };
}

async function getRecordsInChunks(store, entries, size = 40) {
  const records = [];
  for (let i = 0; i < entries.length; i += size) {
    const slice = entries.slice(i, i + size);
    const chunk = await Promise.all(slice.map(async (entry) => {
      try {
        return await store.get(entry.key, { type: "json" });
      } catch (error) {
        console.error("Genova mApp subscribers admin read:", entry.key, error);
        return null;
      }
    }));
    records.push(...chunk.filter(Boolean));
  }
  return records;
}

function statsFor(users) {
  const stats = {
    total: users.length,
    free: 0,
    premium: 0,
    stripe: 0,
    coupon: 0,
    expired: 0,
    admin: 0,
  };
  users.forEach((user) => {
    if (user.status === "free") stats.free += 1;
    if (user.status === "premium") stats.premium += 1;
    if (user.status === "expired") stats.expired += 1;
    if (user.status === "admin") stats.admin += 1;
    if (user.status === "premium" && user.source === "stripe") stats.stripe += 1;
    if (user.status === "premium" && user.source === "coupon") stats.coupon += 1;
  });
  return stats;
}

export default async (request) => {
  try {
    if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405);

    const user = await authenticatedUser(request);
    if (!user?.id) return json({ error: "unauthorized" }, 401);
    if (!isAdminUser(user)) return json({ error: "forbidden" }, 403);

    const store = userStore();
    const listed = await store.list({ prefix: "user-" });
    const records = await getRecordsInChunks(store, listed?.blobs || []);
    const users = records
      .map((record) => classifyRecord(record))
      .filter((item) => item.email)
      .sort((a, b) => (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0) || a.email.localeCompare(b.email, "it"));

    return json({
      users,
      stats: statsFor(users),
      generatedAt: Date.now(),
    });
  } catch (error) {
    console.error("Genova mApp subscribers admin:", error);
    return json({ error: error?.message || "server_error" }, 500);
  }
};
