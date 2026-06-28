"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { postComment } from "../../lib/actions/comments";

export default function CommentSection({ comments = [], lessonId, user }) {
  const [commentsList, setCommentsList] = useState(comments);
  const [newText, setNewText] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newText.trim() || isPosting) return;

    const tempId = Date.now().toString();
    const optimisticComment = {
      _id: tempId,
      text: newText,
      userName: user?.name || "Anonymous",
      userPhoto: user?.photoURL || null,
      createdAt: new Date().toISOString(),
    };

    setCommentsList((prev) => [optimisticComment, ...prev]);
    setNewText("");
    setIsPosting(true);

    try {
      await postComment({ lessonId, text: newText });
      toast.success("Comment posted successfully");
    } catch (error) {
      toast.error("Failed to post comment");

      setCommentsList((prev) => prev.filter((c) => c._id !== tempId));
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg text-white">
        Comments ({commentsList.length})
      </h3>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-xl p-3 text-white min-h-[80px] focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            type="submit"
            disabled={isPosting || !newText.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors"
          >
            {isPosting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 text-center">
          <p className="text-zinc-500 text-sm">Please sign in to comment</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {commentsList.length > 0 ? (
          commentsList.map((comment) => (
            <div key={comment._id} className="flex gap-3">
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-indigo-900 flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden">
                {comment.userPhoto ? (
                  <img
                    src={comment.userPhoto}
                    alt={comment.userName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  comment.userName?.charAt(0).toUpperCase()
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-white">
                    {comment.userName}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-zinc-300 text-sm mt-1">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-500 text-center py-6">
            No comments yet. Be the first!
          </p>
        )}
      </div>
    </div>
  );
}
