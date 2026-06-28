import { Card } from "@heroui/react";
import Link from "next/link";

export default function MostSavedLessons({ lessons = [] }) {
  if (lessons.length === 0) return null;

  return (
    <section className="bg-zinc-950 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Most Saved Lessons</h2>
          <p className="text-zinc-400 mt-2">Community favorites</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Card
              key={lesson._id}
              className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all"
            >
              <Card.Header className="p-0 mb-3">
                <Card.Title className="text-lg font-bold text-white line-clamp-2">
                  {lesson.title}
                </Card.Title>
              </Card.Header>

              <Card.Content className="p-0">
                <p className="text-zinc-400 text-sm line-clamp-2 mb-2">
                  {lesson.description}
                </p>
                <p className="text-xs text-zinc-500 mt-2 font-medium">
                  🔖 {lesson.likesCount || 0} Saves
                </p>
              </Card.Content>

              <Card.Footer className="p-0 mt-6 pt-4 border-t border-zinc-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={lesson.creatorPhoto}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-xs text-zinc-400">
                    {lesson.creatorName}
                  </span>
                </div>
                <Link
                  href={`/lessons/${lesson._id}`}
                  className="text-indigo-400 text-sm hover:text-indigo-300"
                >
                  Read →
                </Link>
              </Card.Footer>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/lessons"
            className="px-8 py-3 bg-zinc-900 border border-zinc-800 text-white rounded-xl hover:bg-zinc-800 transition-all"
          >
            View All →
          </Link>
        </div>
      </div>
    </section>
  );
}
