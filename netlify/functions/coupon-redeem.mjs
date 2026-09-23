import {
  authenticatedUser,
  initialUserRecord,
  isAdminUser,
  json,
  readUserRecord,
  writeUserRecord,
} from "./_shared/billing-store.mjs";
import {
  couponStatus,
  ensureInitialCouponPool,
  normalizeCouponCode,
  readCouponRegistry,
  writeCouponRegistry,
} from "./_shared/coupon-store.mjs";

export default async (request) => {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let registry;
  let coupon;
  let user;
  try {
    user = await authenticatedUser(request);
    if (!user?.id) return json({ error: "unauthorized" }, 401);
    if (isAdminUser(user)) return json({ error: "already_premium" }, 409);

    const body = await request.json().catch(() => ({}));
    const code = normalizeCouponCode(body.code);
    if (!code) return json({ error: "coupon_invalid" }, 400);

    registry = await readCouponRegistry();
    const seeded = await ensureInitialCouponPool(registry);
    registry = seeded.registry;
    coupon = registry.coupons.find((item) => item.code === code);
    if (!coupon) return json({ error: "coupon_invalid" }, 404);

    const status = couponStatus(coupon);
    if (status === "redeemed") return json({ error: "coupon_used" }, 409);
    if (status === "expired") return json({ error: "coupon_expired" }, 410);

    const now = Date.now();
    const record = (await readUserRecord(user.id)) || initialUserRecord(user);
    const current = record.subscription || null;
    const active = current?.status === "active" &&
      ((current?.adminOverride === true) ||
       (current?.simulated === false && (!current.currentPeriodEnd || Number(current.currentPeriodEnd) > now)));
    if (active) return json({ error: "already_premium" }, 409);

    coupon.status = "redeemed";
    coupon.redeemedAt = now;
    coupon.redeemedBy = user.id;
    await writeCouponRegistry(registry);

    const durationDays = Math.max(1, Number(coupon.durationDays) || 30);
    const currentPeriodEnd = now + durationDays * 24 * 60 * 60 * 1000;
    record.email = user.email || record.email || "";
    record.subscription = {
      status: "active",
      simulated: false,
      source: "coupon",
      plan: "coupon",
      couponCode: coupon.code,
      couponNumber: coupon.number,
      couponLabel: coupon.label || "",
      durationDays,
      startedAt: now,
      currentPeriodEnd,
      cancelAtPeriodEnd: true,
      checkedAt: now,
    };
    record.updatedAt = now;

    try {
      await writeUserRecord(user.id, record);
    } catch (error) {
      coupon.status = "available";
      coupon.redeemedAt = null;
      coupon.redeemedBy = null;
      await writeCouponRegistry(registry).catch(() => {});
      throw error;
    }

    return json({
      ok: true,
      code: coupon.code,
      durationDays,
      currentPeriodEnd,
      subscription: record.subscription,
    });
  } catch (error) {
    console.error("Genova mApp coupon redeem:", error);
    return json({ error: error?.message || "server_error" }, 500);
  }
};
