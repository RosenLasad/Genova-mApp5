import { getStore } from "@netlify/blobs";

export const USER_STORE_NAME = "genova-mapp-users-v1";

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

export async function readUserRecord(userId) {
  return userStore().get(`user-${userId}`, { type: "json" });
}

export async function writeUserRecord(userId, record) {
  await userStore().setJSON(`user-${userId}`, record);
  return record;
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
