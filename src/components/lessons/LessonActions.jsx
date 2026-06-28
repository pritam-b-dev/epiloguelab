"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { toggleLike } from "../../lib/actions/lessons";
import { removeFavorite, saveFavorite } from "../../lib/actions/favorites";

export default function LessonActions({
  lesson,
  user,
  isFavorited,
  isLiked,
  onReport,
}) {
  const [liked, setLiked] = useState(isLiked || false);
  const [likesCount, setLikesCount] = useState(lesson.likesCount || 0);
  const [favorited, setFavorited] = useState(isFavorited || false);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to like");
      return;
    }

    // Optimistic Update
    const previousLiked = liked;
    const previousCount = likesCount;

    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);

    try {
      await toggleLike(lesson._id);
    } catch (error) {
      // Rollback on error
      setLiked(previousLiked);
      setLikesCount(previousCount);
      toast.error("Something went wrong");
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      toast.error("Please log in to save");
      return;
    }

    // Optimistic Update
    const previousFavorited = favorited;
    setFavorited(!favorited);

    try {
      if (favorited) {
        await removeFavorite(lesson._id, user._id);
      } else {
        await saveFavorite({ userId: user._id, lessonId: lesson._id });
      }
    } catch (error) {
      setFavorited(previousFavorited);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-4 flex gap-4 items-center">
      {/* Like Button */}
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 transition-colors ${
          liked ? "text-red-400" : "text-zinc-400 hover:text-red-400"
        }`}
      >
        <span>{liked ? "❤️" : "🤍"}</span>
        <span className="text-sm font-medium">{likesCount} Likes</span>
      </button>

      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        className={`flex items-center gap-2 transition-colors ${
          favorited ? "text-indigo-400" : "text-zinc-400 hover:text-indigo-400"
        }`}
      >
        <span>🔖</span>
        <span className="text-sm font-medium">
          {favorited ? "Saved" : "Save"}
        </span>
      </button>

      {/* Report Button */}
      <button
        onClick={onReport}
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors ml-auto"
      >
        <span>🚩</span>
        <span className="text-sm">Report</span>
      </button>
    </div>
  );
}
