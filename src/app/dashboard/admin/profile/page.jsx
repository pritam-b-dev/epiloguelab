import ProfilePage from "../../../../components/dashboard/ProfilePage";
import { getUserSession } from "../../../../lib/core/session";

export default async function AdminProfileRoute() {
  const user = await getUserSession();

  return (
    <div className="max-w-5xl mx-auto px-2 py-4">
      <ProfilePage
        user={user}
        totalLessons={0}
        totalFavorites={0}
        publicLessons={[]}
      />
    </div>
  );
}
