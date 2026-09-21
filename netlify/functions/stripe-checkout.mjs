import Stripe from "stripe";
import {
  authenticatedUser,
  initialUserRecord,
  json,
  readUserRecord,
  writeUserRecord,
} from "./_shared/billing-store.mjs";

const LOOKUP_KEYS = {
  monthly: "genova_mapp_premium_monthly",
  yearly: "genova_mapp_premium_yearly",
};

function stripeClient() {
  const secret = Netlify.env.get("STRIPE_SECRET_KEY");
  if (!secret) throw new Error("stripe_not_configured");
  return new Stripe(secret);
}

export default async (request) => {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  try {
    const user = await authenticatedUser(request);
    if (!user?.id) return json({ error: "unauthorized" }, 401);

    const body = await request.json().catch(() => ({}));
    const plan = body.plan === "monthly" ? "monthly" : "yearly";
    const invoiceRequested = body.invoiceRequested === true;
    const stripe = stripeClient();
    const prices = await stripe.prices.list({
      active: true,
      lookup_keys: [LOOKUP_KEYS[plan]],
      limit: 1,
    });
    const price = prices.data[0];
    if (!price) return json({ error: "price_not_configured" }, 503);

    const now = Date.now();
    const record = (await readUserRecord(user.id)) || initialUserRecord(user);
    if (record.subscription?.status === "active" &&
        (!record.subscription.currentPeriodEnd || Number(record.subscription.currentPeriodEnd) > now)) {
      return json({ error: "subscription_already_active" }, 409);
    }

    let customerId = record.stripeCustomerId || record.subscription?.stripeCustomerId || "";
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        name: user.user_metadata?.full_name || user.user_metadata?.name || undefined,
        metadata: { netlify_user_id: user.id, app: "genova-mapp" },
      });
      customerId = customer.id;
      record.stripeCustomerId = customerId;
      record.email = user.email || record.email || "";
      record.updatedAt = now;
      await writeUserRecord(user.id, record);
    }

    const origin = new URL(request.url).origin;
    const metadata = {
      netlify_user_id: user.id,
      plan,
      invoice_requested: invoiceRequested ? "true" : "false",
      app: "genova-mapp",
    };
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      client_reference_id: user.id,
      line_items: [{ price: price.id, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: invoiceRequested ? "required" : "auto",
      tax_id_collection: { enabled: invoiceRequested },
      customer_update: invoiceRequested ? { address: "auto", name: "auto" } : undefined,
      metadata,
      subscription_data: { metadata },
      success_url: `${origin}/?subscription=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?subscription=cancelled`,
      locale: "auto",
    });

    return json({ url: session.url });
  } catch (error) {
    console.error("Genova mApp Stripe checkout:", error);
    return json({ error: error?.message || "server_error" }, 500);
  }
};
