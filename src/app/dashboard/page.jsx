import Link from "next/link";
import { getUserSession } from "../../lib/core/session";
import { getMyLessons } from "../../lib/api/lessons";
import { getMyFavorites } from "../../lib/api/favorites";

export default async function DashboardPage() {
  const user = await getUserSession();

  const [myLessonsRaw, myFavoritesRaw] = await Promise.all([
    getMyLessons().catch(() => []),
    getMyFavorites(user?._id?.toString() || user?.id).catch(() => []),
  ]);

  const myLessons = Array.isArray(myLessonsRaw) ? myLessonsRaw : [];
  const myFavorites = Array.isArray(myFavoritesRaw) ? myFavoritesRaw : [];

  const recentLessons = myLessons.slice(0, 5);

  const formatDate = (dateInput) => {
    if (!dateInput) return "No activity";
    const date = new Date(dateInput);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.name || "User"}! 👋
        </h1>
        <p className="text-zinc-400 mt-1 text-sm">
          Here is your activity overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1: Total Lessons */}
        <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
          <span className="text-zinc-400 text-sm font-medium">
            📝 Total Lessons
          </span>
          <span className="text-3xl font-bold text-indigo-400 mt-2">
            {myLessons.length}
          </span>
        </div>

        {/* Card 2: Saved Lessons */}
        <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
          <span className="text-zinc-400 text-sm font-medium">
            🔖 Saved Lessons
          </span>
          <span className="text-3xl font-bold text-amber-400 mt-2">
            {myFavorites.length}
          </span>
        </div>

        {/* Card 3: Membership Status */}
        <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 flex items-center justify-between min-h-[120px]">
          {user?.isPremium ? (
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-lg">
              <span>⭐ Premium Member</span>
            </div>
          ) : (
            <>
              <div className="flex flex-col">
                <span className="text-zinc-500 text-xs uppercase font-semibold tracking-wider">
                  Plan
                </span>
                <span className="text-zinc-300 font-medium mt-1">
                  Free Plan
                </span>
              </div>
              <Link
                href="/pricing"
                className="text-sm font-medium text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 px-4 py-2 rounded-xl transition-all"
              >
                Upgrade →
              </Link>
            </>
          )}
        </div>

        {/* Card 4: Last Active */}
        <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
          <span className="text-zinc-400 text-sm font-medium">
            🕐 Last Active
          </span>
          <span className="text-zinc-300 font-medium text-base mt-2">
            {formatDate(recentLessons[0]?.createdAt)}
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 pt-2">
        <Link
          href="/dashboard/add-lesson"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-5 py-3 rounded-xl transition-all"
        >
          + Add New Lesson
        </Link>
        <Link
          href="/lessons"
          className="border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-medium text-sm px-5 py-3 rounded-xl transition-all bg-transparent"
        >
          Browse Public Lessons
        </Link>
      </div>

      {/* Recent Lessons Mini Table */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recently Added</h2>
          <Link
            href="/dashboard/my-lessons"
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-all"
          >
            View All Lessons →
          </Link>
        </div>

        {recentLessons.length > 0 ? (
          <div className="bg-[#121212] border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800/60">
            {recentLessons.map((lesson) => (
              <div
                key={lesson._id || lesson.id}
                className="flex items-center justify-between p-4 hover:bg-zinc-900/30 transition-all gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-white text-sm font-medium truncate">
                    {lesson.title}
                  </span>
                  <span className="shrink-0 px-2.5 py-0.5 text-[11px] font-medium bg-zinc-800 text-zinc-400 rounded-full border border-zinc-700/30">
                    {lesson.category || "General"}
                  </span>
                </div>
                <span className="text-xs text-zinc-500 shrink-0">
                  {formatDate(lesson.createdAt)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-zinc-800 rounded-2xl text-zinc-500 text-sm">
            No lessons found. Click `&quot;`+ Add New Lesson`&quot;` to get
            started!
          </div>
        )}
      </div>
    </div>
  );
}
