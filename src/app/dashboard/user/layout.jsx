import { requireRole } from "../../../lib/core/session";

export default async function UserRoleLayout({ children }) {
  await requireRole("user");

  return <>{children}</>;
}
