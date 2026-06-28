"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function LessonFilterBar({
  onFilterChange,
  initialValues = {},
}) {
  // State initialization
  const [inputValue, setInputValue] = useState(initialValues.search || "");
  const [search, setSearch] = useState(initialValues.search || "");
  const [category, setCategory] = useState(initialValues.category || "all");
  const [emotionalTone, setEmotionalTone] = useState(
    initialValues.emotionalTone || "all",
  );
  const [sort, setSort] = useState(initialValues.sort || "newest");

  // Debounce logic for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(inputValue);
    }, 400);

    return () => clearTimeout(handler);
  }, [inputValue]);

  // Filter change trigger
  useEffect(() => {
    onFilterChange({ search, category, emotionalTone, sort });
  }, [search, category, emotionalTone, sort, onFilterChange]);

  return (
    <div className="bg-[#121212] border border-zinc-800/80 rounded-2xl p-4 md:p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search lessons..."
            className="w-full bg-[#1a1a1a] text-white border border-zinc-700 rounded-xl pl-10 py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        {/* Select Menus */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {/* Category */}
          <select
            className="bg-[#1a1a1a] text-white border border-zinc-700 rounded-xl px-3 py-3 w-full outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Career">Career</option>
            <option value="Relationships">Relationships</option>
            <option value="Mindset">Mindset</option>
            <option value="Mistakes Learned">Mistakes Learned</option>
          </select>

          {/* Emotional Tone */}
          <select
            className="bg-[#1a1a1a] text-white border border-zinc-700 rounded-xl px-3 py-3 w-full outline-none"
            value={emotionalTone}
            onChange={(e) => setEmotionalTone(e.target.value)}
          >
            <option value="all">All Tones</option>
            <option value="Motivational">Motivational</option>
            <option value="Sad">Sad</option>
            <option value="Realization">Realization</option>
            <option value="Gratitude">Gratitude</option>
          </select>

          {/* Sort */}
          <select
            className="bg-[#1a1a1a] text-white border border-zinc-700 rounded-xl px-3 py-3 w-full outline-none"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="mostSaved">Most Saved</option>
          </select>
        </div>
      </div>
    </div>
  );
}
