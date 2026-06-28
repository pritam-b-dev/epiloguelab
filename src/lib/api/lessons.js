import { serverFetch } from "../core/server";

export const getFeaturedLessons = async () => {
  return await serverFetch("/api/featured-lessons");
};

export const getMostSavedLessons = async () => {
  return await serverFetch("/api/most-saved");
};

export const getLessons = async (queryString) => {
  return await serverFetch(`/api/lessons?${queryString}`);
};
