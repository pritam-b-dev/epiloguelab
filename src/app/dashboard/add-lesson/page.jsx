"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createLesson } from "../../../lib/actions/lessons";
import { authClient } from "../../../lib/auth-client";
import toast from "react-hot-toast";

export default function AddLessonPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Personal Growth",
    emotionalTone: "Motivational",
    imageUrl: "",
    visibility: "Public",
    accessLevel: "Free",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalData = {
      ...formData,
      accessLevel: user?.isPremium ? formData.accessLevel : "Free",
      creatorId: user?.id,
      creatorName: user?.name,
    };

    try {
      const res = await createLesson(finalData);
      if (res?.success || res) {
        toast.success("Lesson published!");
        router.push("/dashboard/my-lessons");
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to publish lesson");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="text-center text-zinc-400 py-10">Loading session...</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-12">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-white">Share a Life Lesson</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#121212] border border-zinc-800 rounded-2xl p-8 mt-6 space-y-6"
      >
        {/* Lesson Title */}
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300 text-sm font-medium">
            Lesson Title *
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. What I learned from failure"
            className="w-full bg-[#1a1a1a] border border-zinc-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
          />
        </div>

        {/* Full Description */}
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300 text-sm font-medium">
            Full Description *
          </label>
          <textarea
            name="description"
            required
            rows={6}
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your story or experience here..."
            className="w-full min-h-[200px] bg-[#1a1a1a] border border-zinc-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-3 text-white text-sm outline-none transition-all resize-y"
          />
        </div>

        {/* Grid for Category and Emotional Tone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-zinc-300 text-sm font-medium">
              Category *
            </label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-zinc-700 focus:border-indigo-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
            >
              <option value="Personal Growth">Personal Growth</option>
              <option value="Career">Career</option>
              <option value="Relationships">Relationships</option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">Mistakes Learned</option>
            </select>
          </div>

          {/* Emotional Tone */}
          <div className="flex flex-col gap-2">
            <label className="text-zinc-300 text-sm font-medium">
              Emotional Tone *
            </label>
            <select
              name="emotionalTone"
              required
              value={formData.emotionalTone}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-zinc-700 focus:border-indigo-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
            >
              <option value="Motivational">Motivational</option>
              <option value="Sad">Sad</option>
              <option value="Realization">Realization</option>
              <option value="Gratitude">Gratitude</option>
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300 text-sm font-medium">
            Image URL (Optional)
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full bg-[#1a1a1a] border border-zinc-700 focus:border-indigo-500 rounded-xl p-3 text-white text-sm outline-none transition-all"
          />
        </div>

        {/* Visibility (Radio Buttons) */}
        <div className="flex flex-col gap-2">
          <label className="text-zinc-300 text-sm font-medium">
            Visibility
          </label>
          <div className="flex items-center gap-6 mt-1">
            <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer select-none">
              <input
                type="radio"
                name="visibility"
                value="Public"
                checked={formData.visibility === "Public"}
                onChange={handleChange}
                className="w-4 h-4 accent-indigo-500 bg-[#1a1a1a] border-zinc-700"
              />
              Public
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer select-none">
              <input
                type="radio"
                name="visibility"
                value="Private"
                checked={formData.visibility === "Private"}
                onChange={handleChange}
                className="w-4 h-4 accent-indigo-500 bg-[#1a1a1a] border-zinc-700"
              />
              Private
            </label>
          </div>
        </div>

        {/* Access Level */}
        <div className="flex flex-col gap-2 pt-2 border-t border-zinc-800/60">
          <label className="text-zinc-300 text-sm font-medium">
            Access Level
          </label>

          {user?.isPremium ? (
            <div className="flex items-center gap-6 mt-1">
              <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer select-none">
                <input
                  type="radio"
                  name="accessLevel"
                  value="Free"
                  checked={formData.accessLevel === "Free"}
                  onChange={handleChange}
                  className="w-4 h-4 accent-indigo-500"
                />
                Free
              </label>
              <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer select-none">
                <input
                  type="radio"
                  name="accessLevel"
                  value="Premium"
                  checked={formData.accessLevel === "Premium"}
                  onChange={handleChange}
                  className="w-4 h-4 accent-amber-500"
                />
                Premium ⭐
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              <select
                disabled
                className="w-full bg-[#1a1a1a] border border-zinc-800 opacity-60 rounded-xl p-3 text-zinc-500 text-sm cursor-not-allowed"
                defaultValue="Free"
              >
                <option value="Free">Free</option>
              </select>
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-500 text-xs">
                  Upgrade to create premium lessons.
                </span>
                <Link
                  href="/pricing"
                  className="text-amber-400 hover:underline text-xs font-medium"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white font-medium text-sm py-3 rounded-xl transition-all"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm py-3 rounded-xl transition-all"
          >
            {loading ? "Publishing..." : "Publish Lesson"}
          </button>
        </div>
      </form>
    </div>
  );
}
