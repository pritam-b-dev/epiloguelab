import ProfilePage from "../../../components/dashboard/ProfilePage";
import { getMyFavorites } from "../../../lib/api/favorites";
import { getMyLessons } from "../../../lib/api/lessons";
import { getUserSession } from "../../../lib/core/session";

export default async function ProfileRoute() {
  const user = await getUserSession();
  const userId = user?.id?.toString() || user?._id?.toString();

  const [lessonsData, favoritesData] = await Promise.all([
    getMyLessons(),
    getMyFavorites(userId),
  ]);

  const myLessons = Array.isArray(lessonsData)
    ? lessonsData
    : lessonsData?.lessons || lessonsData?.data || [];

  const favorites = Array.isArray(favoritesData)
    ? favoritesData
    : favoritesData?.favorites || favoritesData?.data || [];

  const publicLessons = myLessons.filter(
    (l) => l.visibility?.toLowerCase() === "public",
  );

  return (
    <div className="max-w-5xl mx-auto px-2 py-4">
      <ProfilePage
        user={user}
        totalLessons={myLessons.length}
        totalFavorites={favorites.length}
        publicLessons={publicLessons}
      />
    </div>
  );
}
