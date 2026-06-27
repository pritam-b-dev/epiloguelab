"use server";

import { auth } from "../../auth";
import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function authHeader() {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });

  if (!session || !session.session?.token) {
    return {};
  }

  return { authorization: `Bearer ${session.session.token}` };
}

export async function serverFetch(path) {
  const res = await fetch(`${baseUrl}${path}`);
  return await res.json();
}

export async function protectedFetch(path) {
  const auth = await authHeader();
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { ...auth },
  });
  return await res.json();
}

export async function serverMutation(path, data, method = "POST") {
  const auth = await authHeader();
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...auth,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}
