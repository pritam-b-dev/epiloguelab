import { redirect } from "next/navigation";
import { getUserSession } from "../../lib/core/session";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import NavBar from "../../components/NavBar";

export default async function DashboardLayout({ children }) {
  const user = await getUserSession();

  if (!user) {
    redirect("/signin?redirect=/dashboard");
  }

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen bg-[#0a0a0a]">
        {/* Left Sidebar (Fixed width) */}
        <aside className="  left-0 ">
          <DashboardSidebar user={user} />
        </aside>

        {/* Right Content Area */}
        <main className="flex-1  p-8 text-white">{children}</main>
      </div>
    </>
  );
}
