import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getMyFavorites } from "../../../../lib/api/favorites";
import LessonClientWrapper from "../../../../components/lessons/LessonClientWrapper";
import { getComments } from "../../../../lib/api/comments";
import { getUserSession } from "../../../../lib/core/session";
import { getLessonById } from "../../../../lib/api/lessons";

export default async function LessonPage({ params }) {
  const { id } = await params;

  const [user, lesson] = await Promise.all([
    getUserSession(),
    getLessonById(id),
  ]);

  if (!lesson) notFound();
  if (!user) redirect(`/signin?redirect=/lessons/${id}`);

  const [comments, favoritesRaw] = await Promise.all([
    getComments(id).catch(() => []),
    user ? getMyFavorites(user.id).catch(() => []) : [],
  ]);

  const favoritesList = Array.isArray(favoritesRaw) ? favoritesRaw : [];
  const isFavorited = favoritesList.some((f) => f.lessonId === id);
  const isLiked = lesson.likes?.includes(user?.id || "");

  const readingTime =
    Math.ceil((lesson.description?.split(" ").length || 0) / 200) + " min read";

  // Premium Gate Check
  if (lesson.accessLevel === "Premium" && !user.isPremium) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center p-4">
        <div className="bg-[#121212] border border-amber-500/20 rounded-2xl p-8 max-w-lg text-center space-y-6">
          <div className="text-5xl">🔒</div>
          <h2 className="text-2xl font-bold text-white">Premium Content</h2>

          <div className="blur-sm filter select-none text-zinc-400">
            <h1 className="text-xl font-bold">{lesson.title}</h1>
            <p className="mt-2 text-sm">
              {lesson.description?.substring(0, 100)}...
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/pricing"
              className="bg-amber-500 text-black font-bold px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors"
            >
              Upgrade to Premium
            </Link>
            <Link
              href="/lessons"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              ← Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Normal Layout (পাস করে দিচ্ছি Client Wrapper-এ)
  return (
    <LessonClientWrapper
      lesson={lesson}
      user={user}
      comments={comments}
      isFavorited={isFavorited}
      isLiked={isLiked}
      readingTime={readingTime}
    />
  );
}
