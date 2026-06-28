"use server";

import { serverMutation } from "../core/server";

export const toggleLike = async (id) => {
  return await serverMutation(`/api/lessons/${id}/like`, {}, "PATCH");
};
