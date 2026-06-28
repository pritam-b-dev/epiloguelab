"use server";

import { serverMutation } from "../core/server";

export const saveFavorite = async (data) => {
  return await serverMutation("/api/favorites", data);
};

export const removeFavorite = async (lessonId, userId) => {
  return await serverMutation(
    `/api/favorites/${lessonId}?userId=${userId}`,
    {},
    "DELETE",
  );
};
