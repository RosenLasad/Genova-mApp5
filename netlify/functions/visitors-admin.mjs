import { authenticatedUser, isAdminUser, json } from './_shared/billing-store.mjs';
import { romeDayKey, visitorStore, listVisitorKeys } from './_shared/visitor-store.mjs';

const PAGE_SIZE = 50;
async function parallelMap(items, fn, concurrency = 20) {
  const result = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (i < items.length) { const at = i++; result[at] = await fn(items[at]); }
  }));
  return result;
}
function periodStart(period, today) {
  const [y, m, d] = today.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (period === 'week') dt.setUTCDate(dt.getUTCDate() - 6);
  else if (period === 'month') dt.setUTCDate(1);
  else if (period === 'year') dt.setUTCMonth(0, 1);
  else return '0000-01-01';
  return dt.toISOString().slice(0, 10);
}
function bucket(day, period) { return period === 'year' || period === 'all' ? day.slice(0, 7) : day; }
function completeChart(byDay, from, today, period) {
  const monthly = period === 'year' || period === 'all';
  const start = period === 'all' ? [...byDay.keys()].sort()[0] : bucket(from, period);
  if (!start) return [];
  const end = bucket(today, period);
  const dt = new Date(start + (monthly ? '-01T00:00:00Z' : 'T00:00:00Z'));
  const chart = [];
  while (Number.isFinite(dt.getTime())) {
    const label = dt.toISOString().slice(0, monthly ? 7 : 10);
    if (label > end) break;
    chart.push({ label, count: byDay.get(label)?.size || 0 });
    if (monthly) dt.setUTCMonth(dt.getUTCMonth() + 1);
    else dt.setUTCDate(dt.getUTCDate() + 1);
  }
  return chart;
}
export default async (request) => {
  try {
    if (request.method !== 'GET') return json({ error: 'method_not_allowed' }, 405);
    const user = await authenticatedUser(request);
    if (!user?.id) return json({ error: 'unauthorized' }, 401);
    if (!isAdminUser(user)) return json({ error: 'forbidden' }, 403);
    const url = new URL(request.url);
    const period = ['week', 'month', 'year', 'all'].includes(url.searchParams.get('period')) ? url.searchParams.get('period') : 'month';
    const requestedPage = Math.max(1, Math.min(10000, Number.parseInt(url.searchParams.get('page') || '1', 10) || 1));
    const showExcluded = url.searchParams.get('showExcluded') === '1';
    const store = visitorStore(), day = romeDayKey(), from = periodStart(period, day);
    const [visitorKeys, dayKeys, excludedKeys] = await Promise.all([
      listVisitorKeys(store, 'visitor-'), listVisitorKeys(store, 'day-'), listVisitorKeys(store, 'excluded-'),
    ]);
    const excluded = new Set(excludedKeys.map(k => k.slice('excluded-'.length)));
    const records = (await parallelMap(visitorKeys, async key => {
      const rec = await store.get(key, { type: 'json' });
      if (!rec || !Number.isFinite(Number(rec.firstSeenAt)) || Number(rec.firstSeenAt) <= 0) return null;
      const first = Number(rec.firstSeenAt), last = Number(rec.lastSeenAt) || first;
      const hash = key.slice('visitor-'.length);
      return { id: hash.slice(0, 12), hash, firstSeenAt: first, lastSeenAt: last,
        firstDay: romeDayKey(new Date(first)), excluded: excluded.has(hash), periodDays: 0, totalDays: 0 };
    })).filter(Boolean);
    const byHash = new Map(records.map(r => [r.hash, r]));
    const byDay = new Map(), periodHashes = new Set();
    let todayCount = 0;
    for (const key of dayKeys) {
      const match = /^day-(\d{4}-\d{2}-\d{2})-([a-f0-9]{64})$/.exec(key);
      if (!match || match[1] > day) continue;
      const [, seenDay, hash] = match, record = byHash.get(hash);
      if (record) {
        record.totalDays++;
        if (seenDay >= from) record.periodDays++;
      }
      if (excluded.has(hash)) continue;
      if (seenDay === day) todayCount++;
      if (seenDay < from) continue;
      periodHashes.add(hash);
      const k = bucket(seenDay, period);
      if (!byDay.has(k)) byDay.set(k, new Set());
      byDay.get(k).add(hash);
    }
    const newCount = records.filter(r => !r.excluded && periodHashes.has(r.hash) && r.firstDay >= from).length;
    const visitors = records.filter(r => r.periodDays > 0 && (showExcluded || !r.excluded));
    visitors.sort((a, b) => b.lastSeenAt - a.lastSeenAt || a.hash.localeCompare(b.hash));
    const page = Math.min(requestedPage, Math.max(1, Math.ceil(visitors.length / PAGE_SIZE)));
    const list = visitors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(({ firstDay, ...r }) => ({ ...r, newInPeriod: firstDay >= from }));
    return json({ period, from, day, todayDate: day, today: todayCount, todayCount,
      total: records.filter(r => !r.excluded).length, excludedCount: excluded.size,
      periodUnique: periodHashes.size, newCount, returningCount: Math.max(0, periodHashes.size - newCount),
      chart: completeChart(byDay, from, day, period), visitors: list, page, pageSize: PAGE_SIZE,
      showExcluded, listTotal: visitors.length, generatedAt: Date.now() });
  } catch (error) {
    console.error('Genova mApp visitors admin details:', error);
    return json({ error: error?.message || 'server_error' }, 500);
  }
};
