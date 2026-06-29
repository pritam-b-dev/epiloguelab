"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LessonCard from "../lessons/LessonCard";
import { serverMutation } from "../../lib/core/server";
import toast from "react-hot-toast";

export default function ProfilePage({
  user,
  totalLessons,
  totalFavorites,
  publicLessons = [],
}) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhoto, setEditPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editName.trim()) return toast.error("Name cannot be empty");

    setLoading(true);
    try {
      const res = await serverMutation(
        "/api/users/profile",
        {
          name: editName,
          photoURL: editPhoto,
        },
        "PATCH",
      );

      if (res?.success || res) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Card: Profile Info */}
      <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-6 items-center w-full md:w-auto">
          {/* Avatar */}
          <img
            src={
              user?.photoURL ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
            }
            alt={user?.name}
            className="w-24 h-24 rounded-full border-2 border-indigo-500 object-cover shrink-0"
          />

          {/* User Details */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
            <h1 className="text-2xl font-bold text-white truncate max-w-sm">
              {user?.name || "User Name"}
            </h1>
            <p className="text-zinc-400 text-sm mt-1">{user?.email}</p>

            {/* Badges */}
            <div className="flex gap-2 mt-3">
              {user?.role === "admin" && (
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-red-500/10 text-red-400 rounded-md border border-red-500/20">
                  Admin
                </span>
              )}
              {user?.isPremium ? (
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/20">
                  Premium ⭐
                </span>
              ) : (
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-zinc-800 text-zinc-400 rounded-md">
                  Free Member
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Edit Profile Action Button */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full md:w-auto border border-zinc-700 hover:border-zinc-600 text-zinc-200 text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
        >
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      {/* Edit Profile Form */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-white font-semibold text-base">
            Update Profile Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-400 text-xs font-medium">Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="bg-[#1a1a1a] border border-zinc-700 rounded-xl p-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-all"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-zinc-400 text-xs font-medium">
                Photo URL
              </label>
              <input
                type="url"
                value={editPhoto}
                onChange={(e) => setEditPhoto(e.target.value)}
                className="bg-[#1a1a1a] border border-zinc-700 rounded-xl p-2.5 text-white text-sm outline-none focus:border-indigo-500 transition-all"
                placeholder="https://..."
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 bg-[#121212] border border-zinc-800 p-6 rounded-2xl text-center">
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold text-indigo-400">
            {totalLessons}
          </span>
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
            Lessons Created
          </span>
        </div>
        <div className="flex flex-col gap-1 border-x border-zinc-800/80">
          <span className="text-2xl font-bold text-indigo-400">
            {totalFavorites}
          </span>
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
            Saved Lessons
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold text-indigo-400">
            {publicLessons.length}
          </span>
          <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
            Public Lessons
          </span>
        </div>
      </div>

      {/* Public Lessons Grid */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-bold text-white">My Public Lessons</h2>

        {publicLessons.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl text-zinc-500 text-sm">
            No public lessons yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {publicLessons.map((lesson) => (
              <LessonCard
                key={lesson._id || lesson.id}
                lesson={lesson}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
