"use server";

import { serverMutation } from "../core/server";

export async function confirmPayment(data) {
  return await serverMutation("/api/payment-success", data);
}
