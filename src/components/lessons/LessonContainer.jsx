"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";
import LessonFilterBar from "./LessonFilterBar";
import LessonCard from "./LessonCard";

export default function LessonContainer({
  lessons,
  total,
  searchQuery,
  currentUser,
}) {
  const router = useRouter();

  // State
  const [filters, setFilters] = useState({
    search: searchQuery.search || "",
    category: searchQuery.category || "all",
    emotionalTone: searchQuery.emotionalTone || "all",
    sort: searchQuery.sort || "newest",
  });
  const [page, setPage] = useState(parseInt(searchQuery.page) || 1);

  // Pagination Math
  const itemsPerPage = 6;
  const totalPages = Math.ceil(total / itemsPerPage);
  const startItem = total > 0 ? (page - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(page * itemsPerPage, total);

  // URL Sync
  useEffect(() => {
    const sp = new URLSearchParams();
    if (filters.search) sp.set("search", filters.search);
    if (filters.category !== "all") sp.set("category", filters.category);
    if (filters.emotionalTone !== "all")
      sp.set("emotionalTone", filters.emotionalTone);
    if (filters.sort !== "newest") sp.set("sort", filters.sort);
    sp.set("page", page.toString());

    router.push(`?${sp.toString()}`);
  }, [filters, page, router]);

  return (
    <div className="w-full">
      {/* Filter Bar */}
      <LessonFilterBar
        initialValues={filters}
        onFilterChange={(f) => {
          setFilters(f);
          setPage(1);
        }}
      />

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.length > 0 ? (
          lessons.map((lesson) => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              currentUser={currentUser}
            />
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-zinc-500 text-center py-12">
            No lessons found
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {total > 0 && (
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            Showing {startItem}-{endItem} of {total} results
          </p>

          <Pagination
            total={totalPages}
            page={page}
            onChange={setPage}
            variant="flat"
            color="primary"
          >
            <Pagination.Previous isDisabled={page === 1} />
            <Pagination.Content>
              <Pagination.Item />
              <Pagination.Ellipsis />
            </Pagination.Content>
            <Pagination.Next isDisabled={page === totalPages} />
          </Pagination>
        </div>
      )}
    </div>
  );
}
