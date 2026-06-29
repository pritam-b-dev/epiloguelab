import AdminUsersTable from "../../../../components/dashboard/AdminUsersTable";
import { getUsers } from "../../../../lib/api/users";

export default async function AdminUsersPage() {
  const usersData = await getUsers();

  const users = Array.isArray(usersData)
    ? usersData
    : usersData?.users || usersData?.data || [];

  return (
    <div className="max-w-5xl mx-auto px-2 py-4">
      <AdminUsersTable initialUsers={users} />
    </div>
  );
}
