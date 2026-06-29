"use server";

import { revalidatePath } from "next/cache";

import { serverMutation } from "../core/server";

export const toggleLike = async (id) => {
  return await serverMutation(`/api/lessons/${id}/like`, {}, "PATCH");
};

export async function createLesson(data) {
  const res = await serverMutation("/api/lessons", data);
  if (res) {
    revalidatePath("/");
    revalidatePath("/lessons");
    revalidatePath("/dashboard/my-lessons");
  }

  return res;
}

export async function updateLesson(id, data) {
  const result = await serverMutation(`/api/lessons/${id}`, data, "PATCH");
  revalidatePath("/dashboard/my-lessons");
  return result;
}

export async function deleteLesson(id) {
  const result = await serverMutation(`/api/lessons/${id}`, {}, "DELETE");
  revalidatePath("/dashboard/my-lessons");
  return result;
}

export async function updateVisibility(id, visibility) {
  return await serverMutation(
    `/api/lessons/${id}/visibility`,
    { visibility },
    "PATCH",
  );
}

export async function toggleFeature(id) {
  const result = await serverMutation(
    `/api/lessons/${id}/feature`,
    {},
    "PATCH",
  );
  revalidatePath("/dashboard/admin/lessons");
  return result;
}
