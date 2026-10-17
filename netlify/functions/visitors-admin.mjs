import { authenticatedUser, isAdminUser, json } from './_shared/billing-store.mjs';
import { romeDayKey, visitorStore } from './_shared/visitor-store.mjs';

const MAX_BLOBS = 50000;
const PAGE_SIZE = 50;
async function listAll(store, prefix) {
  const keys = [];
  let cursor;
  do {
    const args = cursor ? { prefix, cursor } : { prefix };
    const page = await store.list(args);
    const blobs = Array.isArray(page?.blobs) ? page.blobs : [];
    keys.push(...blobs.map(b => b.key));
    if (keys.length > MAX_BLOBS) throw new Error('analytics_limit_reached');
    cursor = page?.cursor || null;
  } while (cursor);
  return keys;
}
async function parallelMap(items, fn, concurrency = 20) {
  const result = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (i < items.length) {
      const at = i++;
      result[at] = await fn(items[at]);
    }
  }));
  return result;
}
function romeDate(timestamp) { return romeDayKey(new Date(timestamp)); }
function periodStart(period, today) {
  const parts = today.split('-').map(Number);
  const dt = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  if (period === 'week') dt.setUTCDate(dt.getUTCDate() - 6);
  else if (period === 'month') dt.setUTCDate(1);
  else if (period === 'year') dt.setUTCMonth(0, 1);
  else return '0000-01-01';
  return dt.toISOString().slice(0, 10);
}
function bucket(day, period) {
  if (period === 'year' || period === 'all') return day.slice(0, 7);
  return day;
}
export default async (request) => {
  try {
    if (request.method !== 'GET') return json({ error: 'method_not_allowed' }, 405);
    const user = await authenticatedUser(request);
    if (!user?.id) return json({ error: 'unauthorized' }, 401);
    if (!isAdminUser(user)) return json({ error: 'forbidden' }, 403);
    const url = new URL(request.url);
    const period = ['week', 'month', 'year', 'all'].includes(url.searchParams.get('period')) ? url.searchParams.get('period') : 'month';
    const page = Math.max(1, Math.min(10000, Number.parseInt(url.searchParams.get('page') || '1', 10) || 1));
    const store = visitorStore();
    const today = romeDayKey();
    const from = periodStart(period, today);
    const [visitorKeys, dayKeys] = await Promise.all([listAll(store, 'visitor-'), listAll(store, 'day-')]);
    const records = (await parallelMap(visitorKeys, async key => {
      const rec = await store.get(key, { type: 'json' }).catch(() => null);
      if (!rec || !Number.isFinite(Number(rec.firstSeenAt))) return null;
      const first = Number(rec.firstSeenAt);
      const last = Number(rec.lastSeenAt) || first;
      return { id: key.slice('visitor-'.length, 'visitor-'.length + 12), hash: key.slice('visitor-'.length), firstSeenAt: first, lastSeenAt: last, firstDay: romeDate(first) };
    })).filter(Boolean);
    // One key represents one visitor on one calendar day, in Europe/Rome.
    const byDay = new Map(), periodHashes = new Set();
    let todayCount = 0;
    for (const key of dayKeys) {
      const match = /^day-(\d{4}-\d{2}-\d{2})-([a-f0-9]{64})$/.exec(key);
      if (!match) continue;
      const day = match[1];
      if (day === today) todayCount++;
      if (day < from || day > today) continue;
      periodHashes.add(match[2]);
      const k = bucket(day, period);
      if (!byDay.has(k)) byDay.set(k, new Set());
      byDay.get(k).add(match[2]);
    }
    const newCount = records.filter(r => r.firstDay >= from && r.firstDay <= today).length;
    const visitors = records.filter(r => periodHashes.has(r.hash));
    visitors.sort((a, b) => b.lastSeenAt - a.lastSeenAt);
    const list = visitors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(({ id, firstSeenAt, lastSeenAt }) => ({ id, firstSeenAt, lastSeenAt }));
    const chart = [...byDay].sort((a,b)=>a[0].localeCompare(b[0])).map(([label, set]) => ({ label, count: set.size }));
    return json({ period, from, today, total: visitorKeys.length, todayCount, today: todayCount, periodUnique: periodHashes.size, newCount, returningCount: Math.max(0, periodHashes.size - newCount), chart, visitors: list, page, pageSize: PAGE_SIZE, listTotal: visitors.length, generatedAt: Date.now() });
  } catch (error) {
    console.error('Genova mApp visitors admin details:', error);
    return json({ error: error?.message || 'server_error' }, 500);
  }
};
