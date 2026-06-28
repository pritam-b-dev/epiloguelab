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

  const [filters, setFilters] = useState({
    search: searchQuery.search || "",
    category: searchQuery.category || "all",
    emotionalTone: searchQuery.emotionalTone || "all",
    sort: searchQuery.sort || "newest",
  });
  const [page, setPage] = useState(parseInt(searchQuery.page) || 1);

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));
  const startItem = total > 0 ? (page - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(page * itemsPerPage, total);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

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
      <LessonFilterBar
        initialValues={filters}
        onFilterChange={(f) => {
          setFilters(f);
          setPage(1);
        }}
      />

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

      {total > 0 && (
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          <p className="text-xs text-zinc-500 whitespace-nowrap">
            Showing {startItem}-{endItem} of {total} results
          </p>

          <Pagination className="w-auto">
            <Pagination.Content className="flex items-center gap-2">
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => Math.max(1, p - 1))}
                  className="flex items-center gap-1 cursor-pointer px-3 py-1 rounded-md"
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>

              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === page}
                      onPress={() => setPage(p)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
                        p === page
                          ? "bg-primary text-white font-bold"
                          : "hover:bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ),
              )}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="flex items-center gap-1 cursor-pointer px-3 py-1 rounded-md"
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}
    </div>
  );
}
