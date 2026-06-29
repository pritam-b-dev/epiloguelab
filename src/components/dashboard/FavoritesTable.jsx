"use client";

import { useState } from "react";
import Link from "next/link";
import { Table, Button } from "@heroui/react";
import { Eye, TrashBin } from "@gravity-ui/icons";
import { removeFavorite } from "../../lib/actions/favorites";
import toast from "react-hot-toast";

export default function FavoritesTable({ favorites = [], currentUser }) {
  const [favList, setFavList] = useState(favorites);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [toneFilter, setToneFilter] = useState("All");

  const userId = currentUser?.id?.toString() || currentUser?._id?.toString();

  const handleRemove = async (lessonId) => {
    if (!window.confirm("Remove this lesson from your favorites?")) return;

    try {
      const res = await removeFavorite(lessonId, userId);
      if (res?.success || res) {
        setFavList((prev) => prev.filter((item) => item.lessonId !== lessonId));
        toast.success("Removed from favorites!");
      } else {
        toast.error("Failed to remove favorite");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const filteredFavs = favList.filter((fav) => {
    const matchesCategory =
      categoryFilter === "All" || fav.lesson?.category === categoryFilter;
    const matchesTone =
      toneFilter === "All" || fav.lesson?.emotionalTone === toneFilter;
    return matchesCategory && matchesTone;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-white">My Favorites</h1>
        <div className="bg-amber-500/20 text-amber-400 font-semibold px-2.5 py-0.5 text-sm rounded-full border border-amber-500/20">
          {filteredFavs.length}
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#121212] border border-zinc-800 p-4 rounded-2xl">
        {/* Category Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-xs font-medium">
            Filter by Category
          </label>
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

        {/* Emotional Tone Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-xs font-medium">
            Filter by Tone
          </label>
          <select
            value={toneFilter}
            onChange={(e) => setToneFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-zinc-700 rounded-xl p-2.5 text-white text-sm outline-none cursor-pointer"
          >
            <option value="All">All Tones</option>
            <option value="Motivational">Motivational</option>
            <option value="Sad">Sad</option>
            <option value="Realization">Realization</option>
            <option value="Gratitude">Gratitude</option>
          </select>
        </div>
      </div>

      {/* Table & Empty State */}
      {filteredFavs.length === 0 ? (
        <div className="text-center py-16 bg-[#121212] border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-4">
          <p className="text-zinc-500 text-sm">No saved lessons yet.</p>
          <Button
            as={Link}
            href="/lessons"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium px-4 py-2 text-sm"
          >
            Browse Lessons
          </Button>
        </div>
      ) : (
        <div className="w-full bg-[#121212] border border-zinc-800 rounded-2xl overflow-hidden">
          <Table.ScrollContainer>
            <Table aria-label="Favorites list table" className="w-full">
              <Table.Content>
                <Table.Header>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    LESSON TITLE
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    CATEGORY
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    TONE
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    SAVED ON
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-right">
                    ACTIONS
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {filteredFavs.map((fav) => (
                    <Table.Row
                      key={fav._id || fav.lessonId}
                      className="border-b border-zinc-800/60 hover:bg-zinc-900/30 transition-all"
                    >
                      {/* Lesson Title */}
                      <Table.Cell className="p-4 text-white font-medium max-w-xs truncate">
                        {fav.lesson?.title || "Deleted Lesson"}
                      </Table.Cell>

                      {/* Category Badge */}
                      <Table.Cell className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/10">
                          {fav.lesson?.category || "N/A"}
                        </span>
                      </Table.Cell>

                      {/* Tone Badge */}
                      <Table.Cell className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-medium border border-teal-500/10">
                          {fav.lesson?.emotionalTone || "N/A"}
                        </span>
                      </Table.Cell>

                      {/* Saved Date */}
                      <Table.Cell
                        className="p-4 text-zinc-400 text-sm"
                        suppressHydrationWarning={true}
                      >
                        {fav.savedAt
                          ? new Date(fav.savedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "N/A"}
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/lessons/${fav.lessonId}`}
                            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                            title="View Lesson"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleRemove(fav.lessonId)}
                            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                            title="Remove Favorite"
                          >
                            <TrashBin className="w-4 h-4" />
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table>
          </Table.ScrollContainer>
        </div>
      )}
    </div>
  );
}
