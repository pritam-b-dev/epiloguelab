"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const reportLesson = async (data) => {
  return await serverMutation("/api/reports", data);
};

export async function ignoreReports(lessonId) {
  const result = await serverMutation(
    `/api/reports/lesson/${lessonId}`,
    {},
    "DELETE",
  );
  revalidatePath("/dashboard/admin/reports");
  return result;
}
