"use server";

import { serverMutation } from "./index";

export async function confirmPayment(data) {
  return await serverMutation("/api/payment-success", data);
}
