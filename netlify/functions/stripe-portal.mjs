import Stripe from "stripe";
import { authenticatedUser, json, readUserRecord } from "./_shared/billing-store.mjs";

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
    const record = await readUserRecord(user.id);
    const customerId = record?.stripeCustomerId || record?.subscription?.stripeCustomerId;
    if (!customerId) return json({ error: "stripe_customer_not_found" }, 404);

    const stripe = stripeClient();
    const origin = new URL(request.url).origin;
    const configuration = Netlify.env.get("STRIPE_PORTAL_CONFIGURATION_ID") || undefined;
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      configuration,
      return_url: `${origin}/?subscription=portal-return`,
      locale: "auto",
    });
    return json({ url: session.url });
  } catch (error) {
    console.error("Genova mApp Stripe portal:", error);
    return json({ error: error?.message || "server_error" }, 500);
  }
};
