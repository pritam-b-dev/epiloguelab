import { notFound, redirect } from "next/navigation";
import { getLessonById } from "../../../../../lib/api/lessons";
import { getUserSession } from "../../../../../lib/core/session";
import UpdateLessonForm from "../../../../../components/dashboard/UpdateLessonForm";

export default async function EditLessonPage({ params }) {
  const { id } = await params;

  const [lesson, user] = await Promise.all([
    getLessonById(id),
    getUserSession(),
  ]);

  if (!lesson) {
    notFound();
  }

  const creatorId = lesson.creatorId?.toString() || lesson.creatorId;
  const userId = user?.id?.toString() || user?._id?.toString();

  if (creatorId !== userId) {
    redirect("/dashboard/my-lessons");
  }

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <UpdateLessonForm lesson={lesson} user={user} />
    </div>
  );
}
