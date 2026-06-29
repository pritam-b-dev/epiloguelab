import MyLessonsTable from "../../../components/dashboard/MyLessonsTable";
import { getMyLessons } from "../../../lib/api/lessons";
import { getUserSession } from "../../../lib/core/session";

export default async function MyLessonsPage() {
  const [lessonsData, user] = await Promise.all([
    getMyLessons(),
    getUserSession(),
  ]);

  const lessons = Array.isArray(lessonsData)
    ? lessonsData
    : lessonsData?.lessons || lessonsData?.data || [];

  return (
    <div className="max-w-5xl mx-auto px-2 py-4">
      <MyLessonsTable initialLessons={lessons} currentUser={user} />
    </div>
  );
}
