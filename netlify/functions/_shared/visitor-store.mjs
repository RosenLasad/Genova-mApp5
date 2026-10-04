import { getStore } from "@netlify/blobs";

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
