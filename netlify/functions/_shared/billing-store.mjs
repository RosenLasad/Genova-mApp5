import { getStore } from "@netlify/blobs";

export const USER_STORE_NAME = "genova-mapp-users-v1";
export const DELETED_USER_STORE_NAME = "genova-mapp-deleted-users-v1";

export function json(value, status = 200) {
  return Response.json(value, {
    status,
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
    },
  });
}

export async function authenticatedUser(request) {
  const authorization = request.headers.get("authorization") || "";
  if (!/^Bearer\s+\S+/i.test(authorization)) return null;

  const identityURL = new URL("/.netlify/identity/user", request.url);
  const response = await fetch(identityURL, {
    headers: { authorization, accept: "application/json" },
  });
  if (!response.ok) return null;
  return response.json();
}

export function userStore() {
  return getStore({ name: USER_STORE_NAME, consistency: "strong" });
}

export function deletedUserStore() {
  return getStore({ name: DELETED_USER_STORE_NAME, consistency: "strong" });
}

export async function isDeletedUser(userId) {
  if (!userId) return false;
  const value = await deletedUserStore().get(`deleted-${userId}`, { type: "json" }).catch(() => null);
  return !!value;
}

export async function markDeletedUser(userId) {
  if (!userId) return;
  await deletedUserStore().setJSON(`deleted-${userId}`, { userId, deletedAt: Date.now() });
}

export async function clearDeletedUserMark(userId) {
  if (!userId) return;
  await deletedUserStore().delete(`deleted-${userId}`);
}

export async function readUserRecord(userId) {
  return userStore().get(`user-${userId}`, { type: "json" });
}

export async function writeUserRecord(userId, record) {
  await userStore().setJSON(`user-${userId}`, record);
  return record;
}

function configuredList(name) {
  return String(Netlify.env.get(name) || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminUser(user) {
  const userId = String(user?.id || "").trim().toLowerCase();
  const email = String(user?.email || "").trim().toLowerCase();
  return (userId && configuredList("GENOVA_ADMIN_USER_IDS").includes(userId)) ||
    (email && configuredList("GENOVA_ADMIN_EMAILS").includes(email));
}

export function initialUserRecord(user) {
  const now = Date.now();
  return {
    version: 1,
    userId: user.id,
    email: user.email || "",
    data: null,
    subscription: { status: "inactive", simulated: false, checkedAt: now },
    createdAt: now,
    updatedAt: now,
  };
}
