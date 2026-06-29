import AdminLessonsTable from "../../../../components/dashboard/AdminLessonsTable";
import { getAdminAllLessons } from "../../../../lib/api/lessons";

export default async function AdminLessonsPage() {
  const lessonsData = await getAdminAllLessons();

  const lessons = Array.isArray(lessonsData)
    ? lessonsData
    : lessonsData?.lessons || lessonsData?.data || [];

  return (
    <div className="max-w-5xl mx-auto px-2 py-4">
      <AdminLessonsTable initialLessons={lessons} />
    </div>
  );
}
