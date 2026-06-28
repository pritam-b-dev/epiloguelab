import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getLessonById } from "../../../../lib/api/lessons";
import { getUserSession } from "../../../../lib/core/session";

export default async function LessonPage({ params }) {
  const { id } = await params;

  const user = await getUserSession();

  if (!user) redirect(`/signin?redirect=/lessons/${id}`);

  const lesson = await getLessonById(id);

  if (!lesson) notFound();

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

  // Normal Layout
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
              <span>{lesson.creatorName}</span>
              <span>•</span>
              <span>{new Date(lesson.createdAt).toLocaleDateString()}</span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium">
                {lesson.category}
              </span>
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium">
                {lesson.emotionalTone}
              </span>
            </div>

            {lesson.image && (
              <img
                src={lesson.image}
                alt={lesson.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
            )}

            <div className="whitespace-pre-line text-zinc-700 dark:text-zinc-300">
              {lesson.description}
            </div>
          </div>

          {/* Placeholders for Client Components */}
          <div id="ACTIONS_PLACEHOLDER">
            {/* <LessonActions lesson={lesson} user={user} /> */}
          </div>
          <div id="COMMENTS_PLACEHOLDER">
            {/* <CommentSection lessonId={lesson._id} /> */}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">
          {/* Overview Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
            <h3 className="font-bold mb-4">Overview</h3>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <p>📅 {new Date(lesson.createdAt).toLocaleDateString()}</p>
              <p>🎭 Tone: {lesson.emotionalTone}</p>
              <p>📂 Category: {lesson.category}</p>
              <p>⏱️ {readingTime}</p>
              <p>❤️ {lesson.likesCount} Likes</p>
              <p>👁️ Visibility: {lesson.visibility}</p>
            </div>
          </div>

          {/* Author Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl text-center">
            <img
              src={lesson.creatorPhoto || "/default-avatar.png"}
              alt={lesson.creatorName}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h4 className="font-bold">{lesson.creatorName}</h4>
            <Link
              href={`/profile/${lesson.creatorId}`}
              className="text-primary text-sm mt-2 block hover:underline"
            >
              View all by this author
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
