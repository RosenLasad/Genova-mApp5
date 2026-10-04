import {
  authenticatedUser,
  isAdminUser,
  json,
} from "./_shared/billing-store.mjs";
import {
  countByPrefix,
  romeDayKey,
  visitorStore,
} from "./_shared/visitor-store.mjs";

export default async (request) => {
  try {
    if (request.method !== "GET") return json({ error: "method_not_allowed" }, 405);

    const user = await authenticatedUser(request);
    if (!user?.id) return json({ error: "unauthorized" }, 401);
    if (!isAdminUser(user)) return json({ error: "forbidden" }, 403);

    const store = visitorStore();
    const day = romeDayKey();
    const [total, today] = await Promise.all([
      countByPrefix(store, "visitor-"),
      countByPrefix(store, `day-${day}-`),
    ]);

    return json({
      total,
      today,
      day,
      generatedAt: Date.now(),
    });
  } catch (error) {
    console.error("Genova mApp visitors admin:", error);
    return json({ error: error?.message || "server_error" }, 500);
  }
};
