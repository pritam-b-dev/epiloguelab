"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Eye, TrashBin } from "@gravity-ui/icons";

import toast from "react-hot-toast";
import { deleteLesson, toggleFeature } from "../../lib/actions/lessons";

export default function AdminLessonsTable({ initialLessons = [] }) {
  const [lessons, setLessons] = useState(initialLessons);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [visibilityFilter, setVisibilityFilter] = useState("All");

  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    return new Date(dateInput).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleFeatureToggle = async (lessonId) => {
    const previousLessons = [...lessons];
    let isNowFeatured = false;

    setLessons((prev) =>
      prev.map((l) => {
        if (l._id === lessonId) {
          isNowFeatured = !l.isFeatured;
          return { ...l, isFeatured: isNowFeatured };
        }
        return l;
      }),
    );

    const promise = toggleFeature(lessonId).then((res) => {
      if (res?.success || res) return res;
      throw new Error();
    });

    toast.promise(promise, {
      loading: "Updating featured status...",
      success: () =>
        `Lesson is now ${isNowFeatured ? "Featured" : "Unfeatured"}!`,
      error: () => {
        setLessons(previousLessons);
        return "Failed to update featured status";
      },
    });
  };

  const handleDelete = async (lessonId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this lesson permanently?",
      )
    )
      return;

    try {
      const res = await deleteLesson(lessonId);
      if (res?.success || res) {
        setLessons((prev) => prev.filter((l) => l._id !== lessonId));
        toast.success("Lesson deleted from platform!");
      } else {
        toast.error("Failed to delete lesson");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const filteredLessons = lessons.filter((lesson) => {
    const matchesCategory =
      categoryFilter === "All" || lesson.category === categoryFilter;

    const matchesVisibility =
      visibilityFilter === "All" ||
      lesson.visibility?.trim().toLowerCase() ===
        visibilityFilter.trim().toLowerCase();

    return matchesCategory && matchesVisibility;
  });

  return (
    <div className="space-y-6">
      {/* Heading & Count Badge */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-white">Manage Lessons</h1>
        <div className="bg-indigo-600/20 text-indigo-400 font-semibold px-2.5 py-0.5 text-sm rounded-full border border-indigo-500/20">
          {filteredLessons.length}
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#121212] border border-zinc-800 p-4 rounded-2xl">
        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-xs font-medium">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-zinc-700 rounded-xl p-2.5 text-white text-sm outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Mindset">Mindset</option>
            <option value="Mistakes Learned">Mistakes Learned</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-xs font-medium">
            Visibility
          </label>
          <select
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-zinc-700 rounded-xl p-2.5 text-white text-sm outline-none cursor-pointer"
          >
            <option value="All">All Visibility</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
      </div>

      {filteredLessons.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl text-zinc-500 text-sm">
          No lessons found matching the filters.
        </div>
      ) : (
        <div className="w-full bg-[#121212] border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900 border-b border-zinc-800">
                  <th className="text-zinc-400 font-medium p-4 text-sm">
                    LESSON
                  </th>
                  <th className="text-zinc-400 font-medium p-4 text-sm">
                    CREATOR
                  </th>
                  <th className="text-zinc-400 font-medium p-4 text-sm">
                    CATEGORY
                  </th>
                  <th className="text-zinc-400 font-medium p-4 text-sm">
                    VISIBILITY
                  </th>
                  <th className="text-zinc-400 font-medium p-4 text-sm">
                    ACCESS
                  </th>
                  <th className="text-zinc-400 font-medium p-4 text-sm">
                    FEATURED
                  </th>
                  <th className="text-zinc-400 font-medium p-4 text-sm text-right">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLessons.map((lesson) => (
                  <tr
                    key={lesson._id}
                    className="border-b border-zinc-800/60 hover:bg-zinc-900/30 transition-all"
                  >
                    {/* Title */}
                    <td className="p-4 max-w-xs">
                      <div className="flex flex-col min-w-0">
                        <span
                          className="text-sm font-medium text-white truncate"
                          title={lesson.title}
                        >
                          {lesson.title}
                        </span>
                        <span className="text-[11px] text-zinc-500 mt-0.5">
                          {formatDate(lesson.createdAt)}
                        </span>
                      </div>
                    </td>

                    {/* Creator */}
                    <td className="p-4 text-zinc-400 text-sm truncate max-w-[120px]">
                      {lesson.creatorName || "Unknown"}
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/10">
                        {lesson.category}
                      </span>
                    </td>

                    {/* Visibility */}
                    <td className="p-4">
                      {lesson.visibility?.toLowerCase() === "public" ? (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-green-500/10 text-green-400 rounded-md border border-green-500/20">
                          Public
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-zinc-800 text-zinc-400 rounded-md border border-zinc-700/50">
                          Private
                        </span>
                      )}
                    </td>

                    {/* Access Level */}
                    <td className="p-4">
                      {lesson.accessLevel === "Premium" ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
                          ⭐ Premium
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                          Free
                        </span>
                      )}
                    </td>

                    {/* Featured */}
                    <td className="p-4 text-sm font-medium">
                      {lesson.isFeatured ? (
                        <span className="text-amber-400">⭐ Yes</span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleFeatureToggle(lesson._id)}
                          className={`p-2 rounded-xl transition-all border cursor-pointer ${
                            lesson.isFeatured
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
                              : "text-zinc-400 border-transparent hover:bg-zinc-800 hover:text-white"
                          }`}
                          title={
                            lesson.isFeatured
                              ? "Unfeature Lesson"
                              : "Feature Lesson"
                          }
                        >
                          <Star className="w-4 h-4" />
                        </button>

                        <Link
                          href={`/lessons/${lesson._id}`}
                          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all border border-transparent"
                          title="View Lesson"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDelete(lesson._id)}
                          className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent cursor-pointer"
                          title="Delete Permanently"
                        >
                          <TrashBin className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
