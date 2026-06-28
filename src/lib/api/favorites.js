import { protectedFetch } from "../core/server";

export const getMyFavorites = async (userId) => {
  return await protectedFetch(`/api/favorites?userId=${userId}`);
};
