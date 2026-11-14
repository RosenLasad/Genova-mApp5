import { authenticatedUser, isAdminUser, json } from './_shared/billing-store.mjs';
import { cleanVisitorId, visitorHash, visitorStore } from './_shared/visitor-store.mjs';

// Only administrators may recognize or exclude a browser. Nothing is deleted.
export default async (request) => {
  try {
    if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
    const user = await authenticatedUser(request);
    if (!user?.id) return json({ error: 'unauthorized' }, 401);
    if (!isAdminUser(user)) return json({ error: 'forbidden' }, 403);
    const raw = await request.text();
    if (raw.length > 2048) return json({ error: 'payload_too_large' }, 413);
    let body;
    try { body = JSON.parse(raw); } catch { return json({ error: 'invalid_json' }, 400); }
    if (!body || !['inspect', 'exclude', 'include'].includes(body.action)) return json({ error: 'invalid_action' }, 400);
    const id = cleanVisitorId(body.visitorId);
    const hash = id ? visitorHash(id) : String(body.hash || '');
    if (!/^[a-f0-9]{64}$/.test(hash)) return json({ error: 'invalid_visitor' }, 400);
    const store = visitorStore();
    const key = `excluded-${hash}`;
    if (body.action === 'exclude') await store.setJSON(key, { version: 1, excludedAt: Date.now() });
    if (body.action === 'include') await store.delete(key);
    const [record, exclusion] = await Promise.all([
      store.get(`visitor-${hash}`, { type: 'json' }), store.get(key, { type: 'json' }),
    ]);
    return json({ hash, id: hash.slice(0, 12), excluded: !!exclusion, found: !!record });
  } catch (error) {
    console.error('Genova mApp visitor device:', error);
    return json({ error: 'server_error' }, 500);
  }
};
