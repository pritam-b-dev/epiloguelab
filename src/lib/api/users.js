import { protectedFetch, serverFetch } from "../core/server";

export const getTopContributors = async () => {
  return await serverFetch("/api/top-contributors");
};
export const getUsers = () => protectedFetch("/api/users");
export const getAdminStats = () => protectedFetch("/api/admin/stats");
