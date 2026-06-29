import { requireRole } from "../../../lib/core/session";

export default async function AdminRoleLayout({ children }) {
  await requireRole("admin");

  return <>{children}</>;
}
