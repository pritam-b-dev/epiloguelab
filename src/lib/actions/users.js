"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export async function updateUserRole(id, role) {
  const result = await serverMutation(
    `/api/users/${id}/role`,
    { role },
    "PATCH",
  );
  revalidatePath("/dashboard/admin/users");
  return result;
}
