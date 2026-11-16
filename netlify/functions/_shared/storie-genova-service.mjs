import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

export const PAIRING_TTL = 10 * 60 * 1000;
export const VIEWING_TTL = 6 * 60 * 60 * 1000;
const hash = value => createHash('sha256').update(value).digest('hex');
const normalize = value => typeof value === 'string' ? value.toUpperCase().replace(/[\s-]/g, '') : '';
const json = (value, status = 200) => Response.json(value, { status, headers: {
  'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
}});
const playback = { provider: 'youtube', videoId: 'InW7y6Pj9V8', trial: true };

// Temporary pairing cache, not purchase records. Persistent purchases are out of scope.
export function createHandler({ storeFactory, authenticate, isDeleted, now = Date.now }) {
  return async function handler(request) {
    if (request.method !== 'POST') return json({ error: 'Metodo non consentito.' }, 405);
    if (request.headers.get('origin') !== new URL(request.url).origin) {
      return json({ error: 'Origine della richiesta non consentita.' }, 403);
    }
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
      return json({ error: 'Formato della richiesta non valido.' }, 415);
    }
    try {
      const raw = await request.text();
      if (raw.length > 2048) return json({ error: 'Richiesta troppo grande.' }, 413);
      let body;
      try { body = JSON.parse(raw); } catch { return json({ error: 'Richiesta non valida.' }, 400); }
      if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ error: 'Richiesta non valida.' }, 400);
      if (!['create', 'inspect', 'approve', 'status', 'revoke', 'playback'].includes(body.action)) {
        return json({ error: 'Operazione non valida.' }, 400);
      }
      let user = null;
      if (body.action === 'approve' || body.action === 'playback') {
        user = await authenticate(request);
        if (!user?.id || await isDeleted(user.id)) {
          return json({ error: 'Accedi al tuo account Genova mApp per continuare.' }, 401);
        }
        if (body.action === 'playback') return json({ ...playback, until: now() + VIEWING_TTL });
      }
      const store = storeFactory();
      if (body.action === 'create') {
        for (let attempt = 0; attempt < 4; attempt++) {
          const code = randomBytes(5).toString('hex').toUpperCase();
          const secret = randomBytes(32).toString('hex');
          const expires = now() + PAIRING_TTL;
          const result = await store.setJSON(`sessions/${code}`, { secretHash: hash(secret), expires }, { onlyIfNew: true });
          if (result.modified) return json({ code, secret, expires });
        }
        return json({ error: 'Non è stato possibile creare il codice. Riprova.' }, 503);
      }
      const code = normalize(body.code);
      if (!/^[A-F0-9]{10}$/.test(code)) return json({ error: 'Controlla il codice visualizzato sulla TV.' }, 400);
      const session = await store.get(`sessions/${code}`, { type: 'json' });
      if (!session) return json({ error: 'Codice non trovato. Genera un nuovo QR sulla TV.' }, 404);
      if (['status', 'revoke'].includes(body.action)) {
        if (typeof body.secret !== 'string' || !/^[a-f0-9]{64}$/.test(body.secret) ||
            !timingSafeEqual(Buffer.from(hash(body.secret), 'hex'), Buffer.from(session.secretHash, 'hex'))) {
          return json({ error: 'Sessione TV non valida.' }, 403);
        }
      }
      if (await store.get(`revoked/${code}`, { type: 'json' })) {
        return json({ error: 'TV scollegata. Genera un nuovo QR per continuare.' }, 410);
      }
      if (body.action === 'revoke') {
        await store.setJSON(`revoked/${code}`, { at: now() }, { onlyIfNew: true });
        return json({ ok: true });
      }
      if (body.action === 'inspect' || body.action === 'approve') {
        if (session.expires <= now()) return json({ error: 'Codice scaduto. Genera un nuovo QR sulla TV.' }, 410);
        if (body.action === 'approve') {
          // First approval wins; repeated approvals cannot extend the viewing session.
          await store.setJSON(`approved/${code}`, { userId: user.id, until: now() + VIEWING_TTL }, { onlyIfNew: true });
          const grant = await store.get(`approved/${code}`, { type: 'json' });
          if (grant?.userId !== user.id) return json({ error: 'Questa TV è già stata autorizzata da un altro account. Genera un nuovo QR.' }, 409);
        }
        return json({ ok: true, code, expires: session.expires });
      }
      const grant = await store.get(`approved/${code}`, { type: 'json' });
      if (grant && grant.until > now()) {
        if (await isDeleted(grant.userId)) return json({ error: 'Account non più disponibile. Collega nuovamente la TV.' }, 401);
        return json({ approved: true, until: grant.until, ...playback });
      }
      if (session.expires <= now()) return json({ error: 'Codice scaduto. Genera un nuovo QR sulla TV.' }, 410);
      return json({ approved: false, expires: session.expires });
    } catch (error) {
      console.error('[Storie di Genova] Servizio temporaneamente non disponibile:', error?.name || 'Error');
      return json({ error: 'Servizio temporaneamente non disponibile. Riprova tra poco.' }, 503);
    }
  };
}
