import { Card } from "@heroui/react";
import Link from "next/link";

export default function LessonCard({ lesson, currentUser }) {
  const isLocked =
    lesson.accessLevel === "Premium" &&
    (!currentUser || !currentUser.isPremium);

  return (
    <Card className="relative h-full flex flex-col justify-between bg-[#121212] border border-zinc-800/50 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300">
      <div
        className={`flex flex-col flex-grow ${isLocked ? "blur-sm pointer-events-none" : ""}`}
      >
        <div className="flex gap-2">
          <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md">
            {lesson.category}
          </span>
          <span
            className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md ${lesson.accessLevel === "Premium" ? "text-amber-500 bg-amber-500/10" : "text-emerald-500 bg-emerald-500/10"}`}
          >
            {lesson.accessLevel === "Premium" ? "⭐ Premium" : "Free"}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mt-3 line-clamp-2">
          {lesson.title}
        </h3>
        <p className="text-zinc-400 text-sm mt-2 line-clamp-3">
          {lesson.description}
        </p>
        <p className="text-xs text-zinc-500 mt-1">
          Tone: {lesson.emotionalTone}
        </p>
      </div>

      <div
        className={`mt-6 pt-4 border-t border-zinc-800 flex justify-between items-center ${isLocked ? "opacity-50" : ""}`}
      >
        <div className="flex items-center gap-2">
          <img
            src={lesson.creatorPhoto}
            className="w-6 h-6 rounded-full object-cover"
            alt={lesson.creatorName}
          />
          <div className="flex flex-col">
            <span className="text-xs text-zinc-300 font-medium">
              {lesson.creatorName}
            </span>
            <span className="text-[10px] text-zinc-500">
              {new Date(lesson.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {!isLocked && (
          <Link
            href={`/lessons/${lesson._id}`}
            className="text-indigo-400 text-sm hover:text-indigo-300 font-medium transition-colors"
          >
            See Details →
          </Link>
        )}
      </div>

      {isLocked && (
        <div className="absolute inset-0 bg-black/70 rounded-2xl flex flex-col items-center justify-center z-10 p-6 text-center backdrop-blur-[1px]">
          <span className="text-3xl mb-2">🔒</span>
          <h4 className="text-white font-bold text-sm">Premium Lesson</h4>
          <p className="text-zinc-300 text-xs mt-1">Upgrade to unlock</p>
          <Link
            href="/pricing"
            className="bg-amber-500 text-black text-xs font-bold px-4 py-2 rounded-lg mt-3 hover:bg-amber-400 transition-colors shadow-lg"
          >
            Upgrade Now →
          </Link>
        </div>
      )}
    </Card>
  );
}
