import Stripe from "stripe";
import {
  initialUserRecord,
  json,
  readUserRecord,
  writeUserRecord,
} from "./_shared/billing-store.mjs";

const ACTIVE_STATUSES = new Set(["active", "trialing"]);

function stripeClient() {
  const secret = Netlify.env.get("STRIPE_SECRET_KEY");
  if (!secret) throw new Error("stripe_not_configured");
  return new Stripe(secret);
}

function planFromSubscription(subscription) {
  const price = subscription.items?.data?.[0]?.price;
  const key = price?.lookup_key || "";
  if (key === "genova_mapp_premium_monthly" || price?.recurring?.interval === "month") return "monthly";
  return "yearly";
}

function periodEnd(subscription) {
  const seconds = subscription.items?.data?.[0]?.current_period_end || subscription.current_period_end;
  return seconds ? Number(seconds) * 1000 : null;
}

async function userIdForSubscription(stripe, subscription) {
  if (subscription.metadata?.netlify_user_id) return subscription.metadata.netlify_user_id;
  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id;
  if (!customerId) return "";
  const customer = await stripe.customers.retrieve(customerId);
  return customer && !customer.deleted ? customer.metadata?.netlify_user_id || "" : "";
}

async function storeSubscription(stripe, subscription, event) {
  const userId = await userIdForSubscription(stripe, subscription);
  if (!userId) throw new Error("missing_netlify_user_id");

  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer?.id || "";
  const placeholderUser = { id: userId, email: "" };
  const record = (await readUserRecord(userId)) || initialUserRecord(placeholderUser);
  if (Number(record.lastStripeEventCreated || 0) > Number(event.created || 0)) return;

  const stripeStatus = subscription.status || "inactive";
  record.stripeCustomerId = customerId || record.stripeCustomerId || "";
  record.subscription = {
    status: ACTIVE_STATUSES.has(stripeStatus) ? "active" : (stripeStatus === "canceled" ? "cancelled" : stripeStatus),
    stripeStatus,
    plan: planFromSubscription(subscription),
    simulated: false,
    stripeSubscriptionId: subscription.id,
    stripeCustomerId: customerId,
    currentPeriodEnd: periodEnd(subscription),
    cancelAtPeriodEnd: subscription.cancel_at_period_end === true,
    checkedAt: Date.now(),
  };
  record.lastStripeEventId = event.id;
  record.lastStripeEventCreated = Number(event.created || 0);
  record.updatedAt = Date.now();
  await writeUserRecord(userId, record);
}

export default async (request) => {
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const signature = request.headers.get("stripe-signature") || "";
  const webhookSecret = Netlify.env.get("STRIPE_WEBHOOK_SECRET");
  if (!signature || !webhookSecret) return json({ error: "webhook_not_configured" }, 400);

  try {
    const stripe = stripeClient();
    const payload = await request.text();
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      if (session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(String(session.subscription));
        await storeSubscription(stripe, subscription, event);
      }
    } else if (event.type === "customer.subscription.created" ||
               event.type === "customer.subscription.updated" ||
               event.type === "customer.subscription.deleted") {
      await storeSubscription(stripe, event.data.object, event);
    }

    return json({ received: true });
  } catch (error) {
    console.error("Genova mApp Stripe webhook:", error);
    return json({ error: "invalid_webhook" }, 400);
  }
};
