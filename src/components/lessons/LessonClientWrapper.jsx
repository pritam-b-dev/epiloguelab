"use client";

import { useState } from "react";
import Link from "next/link";
import { ReportModal } from "./ReportModal";
import CommentSection from "./CommentSection";
import LessonInteractions from "./LessonInteractions";

export default function LessonClientWrapper({
  lesson,
  user,
  comments,
  isFavorited,
  isLiked,
  readingTime,
}) {
  const [isReportOpen, setIsReportOpen] = useState(false);

  console.log("Passing to CommentSection:", {
    lessonId: lesson._id || lesson.id,
    lessonImage: lesson.image,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
              <span>{lesson.creatorName}</span>
              <span>•</span>
              <span className="text-[10px] text-zinc-500">
                {new Date(lesson.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
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

          <LessonInteractions
            lesson={lesson}
            user={user}
            isFavorited={isFavorited}
            isLiked={isLiked}
            onOpenReport={() => setIsReportOpen(true)}
          />

          {/* Comment Section */}
          <CommentSection
            comments={comments}
            lessonId={lesson._id || lesson.id}
            user={user}
          />
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">
          {/* Overview Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
            <h3 className="font-bold mb-4">Overview</h3>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <p>
                📅{" "}
                <span className="text-[10px] text-zinc-500">
                  {new Date(lesson.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </p>
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

      <ReportModal
        lessonId={lesson._id || lesson.id}
        user={user}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}
