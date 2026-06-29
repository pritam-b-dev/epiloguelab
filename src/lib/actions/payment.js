"use server";

import { serverMutation } from "../core/server";

export async function confirmPayment(data) {
  return await serverMutation("/api/payment-success", data);
}

export async function createCheckoutSession(data) {
  return await serverMutation("/api/create-checkout-session", data);
}
