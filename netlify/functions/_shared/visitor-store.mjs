import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";

export function cleanVisitorId(value) {
  const id = String(value || '').trim();
  return id.length >= 16 && id.length <= 100 && /^[A-Za-z0-9._:-]+$/.test(id) ? id : '';
}

export function visitorHash(id) {
  return crypto.createHash('sha256').update(id, 'utf8').digest('hex');
}

export async function listVisitorKeys(store, prefix) {
  const keys = [];
  for await (const page of store.list({ prefix, paginate: true })) {
    keys.push(...(page.blobs || []).map(b => b.key));
    if (keys.length > 50000) throw new Error('analytics_limit_reached');
  }
  return keys;
}

export const VISITOR_STORE_NAME = "genova-mapp-visitors-v1";

export function visitorStore() {
  return getStore({ name: VISITOR_STORE_NAME, consistency: "strong" });
}

export function romeDayKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = {};
  parts.forEach((part) => {
    if (part.type !== "literal") values[part.type] = part.value;
  });
  return `${values.year}-${values.month}-${values.day}`;
}

export async function countByPrefix(store, prefix) {
  const listed = await store.list({ prefix });
  return Array.isArray(listed?.blobs) ? listed.blobs.length : 0;
}
