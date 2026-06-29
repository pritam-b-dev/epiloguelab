import { redirect } from "next/navigation";
import { getUserSession } from "../../lib/core/session";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";

export default async function DashboardLayout({ children }) {
  const user = await getUserSession();

  if (!user) {
    redirect("/signin?redirect=/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Left Sidebar (Fixed width) */}
      <aside className="w-64 fixed inset-y-0 left-0 z-50">
        <DashboardSidebar user={user} />
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 ml-64 p-8 text-white">{children}</main>
    </div>
  );
}
