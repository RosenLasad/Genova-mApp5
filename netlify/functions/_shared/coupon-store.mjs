import { getStore } from "@netlify/blobs";
import { randomBytes } from "node:crypto";

export const COUPON_STORE_NAME = "genova-mapp-coupons-v1";
export const COUPON_REGISTRY_KEY = "registry";
export const DEFAULT_COUPON_DAYS = 30;
export const INITIAL_COUPON_COUNT = 100;

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function couponStore() {
  return getStore({ name: COUPON_STORE_NAME, consistency: "strong" });
}

export async function readCouponRegistry() {
  const registry = await couponStore().get(COUPON_REGISTRY_KEY, { type: "json" });
  if (registry && Array.isArray(registry.coupons)) return registry;
  return { version: 1, nextNumber: 1, coupons: [], createdAt: Date.now(), updatedAt: Date.now() };
}

export async function writeCouponRegistry(registry) {
  registry.version = 1;
  registry.updatedAt = Date.now();
  await couponStore().setJSON(COUPON_REGISTRY_KEY, registry);
  return registry;
}

export function normalizeCouponCode(value) {
  const compact = String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!compact.startsWith("GENOVAMAPP")) return "";
  const suffix = compact.slice("GENOVAMAPP".length);
  if (!/^[A-Z0-9]{6}$/.test(suffix)) return "";
  return `GENOVAMAPP-${suffix}`;
}

function randomSuffix(length = 6) {
  const bytes = randomBytes(length);
  let value = "";
  for (let i = 0; i < length; i += 1) value += ALPHABET[bytes[i] % ALPHABET.length];
  return value;
}

function nextUniqueCode(existingCodes) {
  for (let attempt = 0; attempt < 1000; attempt += 1) {
    const code = `GENOVAMAPP-${randomSuffix(6)}`;
    if (!existingCodes.has(code)) return code;
  }
  throw new Error("coupon_generation_failed");
}

export function createCoupons(registry, options = {}) {
  const quantity = Math.max(1, Math.min(500, Number(options.quantity) || 1));
  const durationDays = Math.max(1, Math.min(365, Number(options.durationDays) || DEFAULT_COUPON_DAYS));
  const label = String(options.label || "").trim().slice(0, 120);
  const expiresAt = Number(options.expiresAt) || null;
  const expiresOn = String(options.expiresOn || "").slice(0, 10) || null;
  const batchId = String(options.batchId || `batch-${Date.now()}`);
  const now = Date.now();
  const existing = new Set(registry.coupons.map((item) => item.code));
  const created = [];

  for (let i = 0; i < quantity; i += 1) {
    const code = nextUniqueCode(existing);
    existing.add(code);
    const coupon = {
      number: Number(registry.nextNumber) || 1,
      code,
      status: "available",
      durationDays,
      label,
      batchId,
      createdAt: now,
      expiresAt,
      expiresOn,
      redeemedAt: null,
      redeemedBy: null,
    };
    registry.nextNumber = coupon.number + 1;
    registry.coupons.push(coupon);
    created.push(coupon);
  }
  return created;
}

export async function ensureInitialCouponPool(registry) {
  if (registry.coupons.length > 0) return { registry, created: [] };
  const created = createCoupons(registry, {
    quantity: INITIAL_COUPON_COUNT,
    durationDays: DEFAULT_COUPON_DAYS,
    label: "Lotto iniziale Hotel/B&B",
    batchId: "initial-100",
  });
  await writeCouponRegistry(registry);
  return { registry, created };
}

export function couponStatus(coupon, now = Date.now()) {
  if (coupon.status === "redeemed") return "redeemed";
  if (coupon.expiresAt && Number(coupon.expiresAt) <= now) return "expired";
  return "available";
}

export function couponStats(coupons) {
  const now = Date.now();
  return coupons.reduce((stats, coupon) => {
    stats.total += 1;
    stats[couponStatus(coupon, now)] += 1;
    return stats;
  }, { total: 0, available: 0, redeemed: 0, expired: 0 });
}

export function publicAdminCoupon(coupon) {
  return {
    number: coupon.number,
    code: coupon.code,
    status: couponStatus(coupon),
    durationDays: coupon.durationDays,
    label: coupon.label || "",
    batchId: coupon.batchId || "",
    createdAt: coupon.createdAt || null,
    expiresAt: coupon.expiresAt || null,
    expiresOn: coupon.expiresOn || null,
    redeemedAt: coupon.redeemedAt || null,
  };
}
