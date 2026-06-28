"use server";

import { serverMutation } from "../core/server";

export const reportLesson = async (data) => {
  return await serverMutation("/api/reports", data);
};
