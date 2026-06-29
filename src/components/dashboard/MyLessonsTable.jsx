"use client";

import { useState } from "react";
import Link from "next/link";
import { Table, Badge, Button } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { deleteLesson, updateVisibility } from "@/lib/actions/lessons";
import toast from "react-hot-toast";

export default function MyLessonsTable({ initialLessons = [], currentUser }) {
  const [lessons, setLessons] = useState(initialLessons);

  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    return new Date(dateInput).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleVisibilityToggle = async (lessonId, currentVisibility) => {
    const newVisibility = currentVisibility === "Public" ? "Private" : "Public";

    const previousLessons = [...lessons];
    setLessons((prev) =>
      prev.map((l) =>
        l._id === lessonId ? { ...l, visibility: newVisibility } : l,
      ),
    );

    try {
      const res = await updateVisibility(lessonId, newVisibility);
      if (res?.success || res) {
        toast.success(`Visibility updated to ${newVisibility}`);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to update visibility");
      setLessons(previousLessons);
    }
  };

  const handleDelete = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      const res = await deleteLesson(lessonId);
      if (res?.success || res) {
        setLessons((prev) => prev.filter((l) => l._id !== lessonId));
        toast.success("Lesson deleted successfully!");
      } else {
        toast.error("Failed to delete lesson");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading & Count Badge */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-white">My Lessons</h1>
        <div className="bg-indigo-600/20 text-indigo-400 font-semibold px-2.5 py-0.5 text-sm rounded-full border border-indigo-500/20">
          {lessons.length}
        </div>
      </div>

      {lessons.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 bg-[#121212] border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-4">
          <p className="text-zinc-500 text-sm">No lessons yet.</p>
          <Link
            href="/dashboard/add-lesson"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium px-4 py-2 text-sm"
          >
            Add Lesson
          </Link>
        </div>
      ) : (
        /* HeroUI v3 Table with Dot-Notation */
        <div className="w-full bg-[#121212] border border-zinc-800 rounded-2xl overflow-hidden">
          <Table.ScrollContainer>
            <Table aria-label="My lessons management table" className="w-full">
              <Table.Content>
                <Table.Header>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    TITLE
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    CATEGORY
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    VISIBILITY
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    ACCESS
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    LIKES
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    CREATED
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-right">
                    ACTIONS
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {lessons.map((lesson) => (
                    <Table.Row
                      key={lesson._id}
                      className="border-b border-zinc-800/60 hover:bg-zinc-900/30 transition-all"
                    >
                      {/* Title */}
                      <Table.Cell className="p-4 text-white font-medium max-w-xs truncate">
                        {lesson.title}
                      </Table.Cell>

                      {/* Category */}
                      <Table.Cell className="p-4">
                        <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/10">
                          {lesson.category}
                        </span>
                      </Table.Cell>

                      {/* Visibility Toggle Button */}
                      <Table.Cell className="p-4">
                        <button
                          onClick={() =>
                            handleVisibilityToggle(
                              lesson._id,
                              lesson.visibility,
                            )
                          }
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            lesson.visibility === "Public"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
                              : "bg-zinc-800 text-zinc-400 border border-zinc-700/50 hover:bg-zinc-700"
                          }`}
                        >
                          {lesson.visibility || "Public"}
                        </button>
                      </Table.Cell>

                      {/* Access Level */}
                      <Table.Cell className="p-4">
                        {lesson.accessLevel === "Premium" ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
                            ⭐ Premium
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                            Free
                          </span>
                        )}
                      </Table.Cell>

                      {/* Likes */}
                      <Table.Cell className="p-4 text-zinc-300 font-medium text-sm">
                        ❤️ {lesson.likesCount || 0}
                      </Table.Cell>

                      {/* Created Date */}
                      <Table.Cell className="p-4 text-zinc-400 text-sm">
                        {formatDate(lesson.createdAt)}
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* View Link */}
                          <Link
                            href={`/lessons/${lesson._id}`}
                            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                            title="View Lesson"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          {/* Edit Link */}
                          <Link
                            href={`/dashboard/my-lessons/${lesson._id}/edit`}
                            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-all"
                            title="Edit Lesson"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(lesson._id)}
                            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                            title="Delete Lesson"
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
