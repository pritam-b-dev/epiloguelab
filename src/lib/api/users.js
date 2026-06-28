import { serverFetch } from "../core/server";

export const getTopContributors = async () => {
  return await serverFetch("/api/top-contributors");
};
