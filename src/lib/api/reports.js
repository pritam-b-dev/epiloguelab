import { protectedFetch } from "../core/server";

export const getReports = () => protectedFetch("/api/reports");
