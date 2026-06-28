import { getUserSession } from "../../../lib/core/session";
import { getLessons } from "../../../lib/api/lessons";
import LessonContainer from "../../../components/lessons/LessonContainer";

export default async function LessonsPage({ searchParams }) {
  // get data from searchParams
  const {
    search = "",
    category = "",
    emotionalTone = "",
    sort = "newest",
    page = "1",
  } = await searchParams;

  //  queryString
  const queryString = new URLSearchParams({
    ...(search && { search }),
    ...(category && category !== "all" && { category }), // 'all' হলে পাঠাবো না
    ...(emotionalTone && emotionalTone !== "all" && { emotionalTone }), // 'all' হলে পাঠাবো না
    sort,
    page,
    perPage: "6",
  }).toString();

  // fetch data
  const data = await getLessons(queryString);
  const lessons = data?.lessons || (Array.isArray(data) ? data : []);
  const total = data?.total || 0;
  const currentUser = await getUserSession();

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Public Life Lessons</h1>
        <p className="text-zinc-400 mt-2">
          Browse wisdom shared by our community
        </p>
      </div>

      <LessonContainer
        lessons={lessons}
        total={total}
        searchQuery={{ search, category, emotionalTone, sort, page }}
        currentUser={currentUser}
      />
    </main>
  );
}
