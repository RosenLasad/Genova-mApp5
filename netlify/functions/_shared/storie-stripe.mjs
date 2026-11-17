import { createHash } from 'node:crypto';

export const PRODUCT_KEY = 'storie-di-genova-v1';
export const MOVIE_PRICE = 599;
export const MOVIE_CURRENCY = 'eur';
export function problem(code, message, status = 503) { return Object.assign(new Error(message), { code, status }); }
const validId = id => typeof id === 'string' && /^[a-zA-Z0-9_-]{1,128}$/.test(id);
const isMissing = error => error?.code === 'resource_missing';

// Stripe is the persistent payment source of truth. No purchase ledger in Blobs.
// Search is used for historical recovery only. Fresh checkout confirmations use
// sessions.retrieve directly; search results are ALWAYS re-fetched before granting access.
export function stripeMovies({ stripe, liveMode, previewUser = () => false, now = Date.now }) {
  function metadataFor(id) { return { app: 'genova-mapp', product_key: PRODUCT_KEY, netlify_user_id: id }; }
  function matches(object, id) {
    return object?.metadata?.app === 'genova-mapp' && object.metadata.product_key === PRODUCT_KEY &&
      object.metadata.netlify_user_id === id && object.livemode === liveMode;
  }
  async function verifyIntent(id, userId) {
    if (!/^pi_[a-zA-Z0-9]+$/.test(id || '') || !validId(userId)) return null;
    let pi;
    try { pi = await stripe.paymentIntents.retrieve(id, { expand: ['latest_charge'] }); }
    catch (error) { if (isMissing(error)) return null; throw error; }
    if (!matches(pi, userId) || pi.status !== 'succeeded' || pi.currency !== MOVIE_CURRENCY ||
        pi.amount !== MOVIE_PRICE || pi.amount_received !== MOVIE_PRICE) return null;
    const charge = typeof pi.latest_charge === 'object' ? pi.latest_charge : null;
    if (!charge || !charge.paid || charge.refunded || charge.amount_refunded > 0 || charge.disputed) return null;
    return { owned: true, paymentIntentId: pi.id, preview: false };
  }
  async function purchase(user, receipt = '', {allowPreview = true} = {}) {
    if (!validId(user?.id)) throw problem('unauthorized', 'Accedi a Genova mApp per continuare.', 401);
    if (allowPreview && previewUser(user)) return {owned: true, preview: true, paymentIntentId: null};
    if (/^cs_(?:test_|live_)?[a-zA-Z0-9]+$/.test(receipt || '')) {
      let session;
      try { session = await stripe.checkout.sessions.retrieve(receipt); }
      catch (error) { if (!isMissing(error)) throw error; }
      if (session && matches(session,user.id) && session.client_reference_id === user.id && session.mode === 'payment' &&
          session.status === 'complete' && session.payment_status === 'paid' && session.amount_total === MOVIE_PRICE &&
          session.currency === MOVIE_CURRENCY) {
        const id = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
        const verified = await verifyIntent(id, user.id);
        if (verified) return {...verified,receiptSession:receipt};
      }
    }
    let page;
    do {
      const results = await stripe.paymentIntents.search({
        query: `metadata['netlify_user_id']:'${user.id}' AND metadata['product_key']:'${PRODUCT_KEY}' AND status:'succeeded'`,
        limit: 100, ...(page ? {page} : {}),
      });
      for (const candidate of results.data) {
        const verified = await verifyIntent(candidate.id, user.id);
        if (verified) return verified;
      }
      page = results.has_more ? results.next_page : null;
    } while (page);
    return {owned: false, preview: false};
  }
  async function price() {
    const lookupKey = 'genova_mapp_storie_genova_once_eur599';
    const found = await stripe.prices.list({active:true,lookup_keys:[lookupKey],limit:1});
    let item = found.data[0];
    if (!item) {
      const id = 'genova_mapp_storie_genova_v1';
      let product;
      try { product = await stripe.products.retrieve(id); }
      catch(error) { if (!isMissing(error)) throw error; }
      if (!product) product = await stripe.products.create({id,name:'Storie di Genova',description:'Documentario di Alessandro Bellagamba — visione in streaming',metadata:{app:'genova-mapp',product_key:PRODUCT_KEY}}, {idempotencyKey:'gm-movie-product-v1'});
      item = await stripe.prices.create({product:product.id,currency:MOVIE_CURRENCY,unit_amount:MOVIE_PRICE,tax_behavior:'inclusive',lookup_key:lookupKey}, {idempotencyKey:'gm-movie-price-eur599-v1'});
    }
    if (!item.active || item.type !== 'one_time' || item.currency !== MOVIE_CURRENCY || item.unit_amount !== MOVIE_PRICE) {
      throw problem('price_configuration','Il prezzo del documentario non è disponibile. Contatta l’assistenza.');
    }
    return item.id;
  }
  async function checkout(user, {receipt = '', code = '', requestId, origin}) {
    const existing = await purchase(user, receipt);
    if (existing.owned) return {alreadyOwned: true};
    if (!/^[a-f0-9-]{20,64}$/i.test(requestId || '')) throw problem('invalid_request', 'Ricarica la pagina e riprova.', 400);
    const metadata = metadataFor(user.id);
    const priceId = await price();
    const query = /^[A-F0-9]{10}$/.test(code) ? `tv=${code}` : 'guarda=1';
    const session = await stripe.checkout.sessions.create({
      mode: 'payment', payment_method_types: ['card'],
      client_reference_id: user.id, customer_email: user.email || undefined,
      line_items: [{quantity:1,price:priceId}],
      metadata, payment_intent_data: {metadata,receipt_email:user.email || undefined},
      success_url: `${origin}/storiedigenova?${query}&acquisto=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/storiedigenova?${query}&acquisto=annullato`,
      locale: 'it', submit_type: 'pay',
      custom_text: {submit: {message: 'Pagamento unico di 5,99 €. Nessun abbonamento o rinnovo automatico.'}},
    }, {idempotencyKey: 'gm-movie-'+createHash('sha256').update(user.id+':'+requestId).digest('hex')});
    if (!session.url?.startsWith('https://checkout.stripe.com/')) throw problem('checkout_unavailable','Pagamento non disponibile. Riprova.');
    return {url: session.url};
  }
  return {purchase, verifyIntent, checkout, previewUser, testMode: !liveMode};
}
