import { protectedFetch, serverFetch } from "../core/server";

export const getFeaturedLessons = async () => {
  return await serverFetch("/api/featured-lessons");
};

export const getMostSavedLessons = async () => {
  return await serverFetch("/api/most-saved");
};

export const getLessons = async (queryString) => {
  return await serverFetch(`/api/lessons?${queryString}`);
};

export const getLessonById = async (id) => {
  return await serverFetch(`/api/lessons/${id}`);
};

export const getMyLessons = async () => {
  return protectedFetch("/api/my/lessons");
};

export const getAdminAllLessons = (query = "") =>
  protectedFetch(`/api/lessons/admin?${query}`);
