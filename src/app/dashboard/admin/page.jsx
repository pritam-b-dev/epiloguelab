import Link from "next/link";
import { getAdminStats } from "../../../lib/api/users";

export default async function AdminDashboardPage() {
  const statsData = await getAdminStats();

  const stats = statsData?.data ||
    statsData || {
      totalUsers: 0,
      totalLessons: 0,
      totalReports: 0,
      premiumUsers: 0,
      todayLessons: 0,
      featuredLessons: 0,
    };

  const hasReports = stats.totalReports > 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Platform overview and statistics
        </p>
      </div>

      {/* Stats Grid (3x2 on desktop, responsive on smaller screens) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Total Users */}
        <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
          <span className="text-zinc-400 text-sm font-medium">
            👤 Total Users
          </span>
          <span className="text-3xl font-bold text-indigo-400 mt-2">
            {stats.totalUsers}
          </span>
        </div>

        {/* Card 2: Public Lessons */}
        <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
          <span className="text-zinc-400 text-sm font-medium">
            📚 Public Lessons
          </span>
          <span className="text-3xl font-bold text-emerald-400 mt-2">
            {stats.totalLessons}
          </span>
        </div>

        {/* Card 3: Reported Content */}
        <div
          className={`bg-[#121212] rounded-2xl p-6 flex flex-col justify-between min-h-[120px] transition-all border ${
            hasReports
              ? "border-red-500/50 bg-red-500/[0.02]"
              : "border-zinc-800"
          }`}
        >
          <span className="text-zinc-400 text-sm font-medium">
            🚩 Reported Content
          </span>
          <span
            className={`text-3xl font-bold mt-2 ${hasReports ? "text-red-500 animate-pulse" : "text-zinc-400"}`}
          >
            {stats.totalReports}
          </span>
        </div>

        {/* Card 4: Premium Users */}
        <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
          <span className="text-zinc-400 text-sm font-medium">
            ⭐ Premium Users
          </span>
          <span className="text-3xl font-bold text-amber-400 mt-2">
            {stats.premiumUsers}
          </span>
        </div>

        {/* Card 5: Today's Lessons */}
        <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
          <span className="text-zinc-400 text-sm font-medium">
            ✨ Today&apos;s Lessons
          </span>
          <span className="text-3xl font-bold text-purple-400 mt-2">
            {stats.todayLessons}
          </span>
        </div>

        {/* Card 6: Featured Lessons */}
        <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
          <span className="text-zinc-400 text-sm font-medium">
            🌟 Featured Lessons
          </span>
          <span className="text-3xl font-bold text-indigo-400 mt-2">
            {stats.featuredLessons}
          </span>
        </div>
      </div>

      {/* Quick Nav Cards */}
      <div className="pt-4">
        <h2 className="text-lg font-semibold text-white mb-4">
          Quick Navigation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Link 1: Manage Users */}
          <Link
            href="/dashboard/admin/users"
            className="bg-[#121212] border border-zinc-800/80 hover:border-zinc-700 p-6 rounded-2xl text-center text-zinc-200 hover:text-white font-medium text-sm transition-all"
          >
            Manage Users
          </Link>

          {/* Link 2: Manage Lessons */}
          <Link
            href="/dashboard/admin/lessons"
            className="bg-[#121212] border border-zinc-800/80 hover:border-zinc-700 p-6 rounded-2xl text-center text-zinc-200 hover:text-white font-medium text-sm transition-all"
          >
            Manage Lessons
          </Link>

          {/* Link 3: Review Reports */}
          <Link
            href="/dashboard/admin/reports"
            className="bg-[#121212] border border-zinc-800/80 hover:border-zinc-700 p-6 rounded-2xl text-center text-zinc-200 hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Review Reports</span>
            {hasReports && (
              <span className="w-2 h-2 rounded-full bg-red-500 ring-4 ring-red-500/20 animate-ping" />
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
