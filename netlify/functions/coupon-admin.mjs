import {
  authenticatedUser,
  isAdminUser,
  json,
} from "./_shared/billing-store.mjs";
import {
  couponStats,
  createCoupons,
  ensureInitialCouponPool,
  publicAdminCoupon,
  readCouponRegistry,
  writeCouponRegistry,
} from "./_shared/coupon-store.mjs";

function adminPayload(registry, extra = {}) {
  const coupons = registry.coupons
    .slice()
    .sort((a, b) => Number(a.number) - Number(b.number))
    .map(publicAdminCoupon);
  return { coupons, stats: couponStats(registry.coupons), ...extra };
}

function expiryTimestamp(value) {
  if (!value) return null;
  const date = new Date(`${String(value).slice(0, 10)}T23:59:59.999Z`);
  const timestamp = date.getTime();
  if (!Number.isFinite(timestamp)) return null;
  return timestamp;
}

export default async (request) => {
  try {
    const user = await authenticatedUser(request);
    if (!user?.id) return json({ error: "unauthorized" }, 401);
    if (!isAdminUser(user)) return json({ error: "forbidden" }, 403);

    let registry = await readCouponRegistry();
    const seeded = await ensureInitialCouponPool(registry);
    registry = seeded.registry;

    if (request.method === "GET") {
      return json(adminPayload(registry, { initialCreated: seeded.created.length }));
    }

    if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);
    const body = await request.json().catch(() => ({}));
    if (body.action !== "generate") return json({ error: "invalid_action" }, 400);

    const quantity = Number(body.quantity);
    const durationDays = Number(body.durationDays);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 500) return json({ error: "invalid_quantity" }, 400);
    if (!Number.isInteger(durationDays) || durationDays < 1 || durationDays > 365) return json({ error: "invalid_duration" }, 400);

    const expiresAt = expiryTimestamp(body.expiresOn);
    if (body.expiresOn && (!expiresAt || expiresAt <= Date.now())) return json({ error: "invalid_expiry" }, 400);

    const created = createCoupons(registry, {
      quantity,
      durationDays,
      label: body.label,
      expiresAt,
      expiresOn: body.expiresOn,
    });
    await writeCouponRegistry(registry);
    return json(adminPayload(registry, { created: created.map(publicAdminCoupon) }));
  } catch (error) {
    console.error("Genova mApp coupon admin:", error);
    return json({ error: error?.message || "server_error" }, 500);
  }
};
