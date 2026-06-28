import { Card } from "@heroui/react";
import Link from "next/link";

export default function FeaturedLessons({ lessons = [] }) {
  if (lessons.length === 0) {
    return (
      <div className="py-16 px-4 text-center text-zinc-500">
        No featured lessons yet
      </div>
    );
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground inline-block">
          Featured Life Lessons
          <div className="h-1 w-full bg-indigo-500 mt-1 rounded-full" />
        </h2>
        <p className="text-zinc-400 mt-3">
          Handpicked wisdom by our editorial team
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <Card
            key={lesson._id}
            className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300"
          >
            <Card.Header className="flex flex-col items-start gap-2 p-0 mb-3">
              <div className="flex gap-2">
                <span className="bg-indigo-500/10 text-indigo-400 text-xs rounded-full px-2.5 py-1">
                  {lesson.category || "General"}
                </span>
                <span className="bg-amber-500/10 text-amber-400 text-xs rounded-full px-2.5 py-1">
                  ⭐ Featured
                </span>
              </div>
            </Card.Header>

            <Card.Title className="p-0 text-lg font-bold text-white mt-1 line-clamp-2">
              {lesson.title}
            </Card.Title>

            <Card.Content className="p-0 mt-2">
              <p className="text-zinc-400 text-sm line-clamp-2">
                {lesson.description}
              </p>
            </Card.Content>

            <Card.Footer className="p-0 mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={lesson.creatorPhoto || "/placeholder-avatar.png"}
                  alt={lesson.creatorName}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-zinc-400">
                  {lesson.creatorName}
                </span>
              </div>
              <Link
                href={`/lessons/${lesson._id}`}
                className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors"
              >
                Read Lesson →
              </Link>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </section>
  );
}
