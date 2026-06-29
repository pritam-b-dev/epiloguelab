import FavoritesTable from "../../../components/dashboard/FavoritesTable";
import { getMyFavorites } from "../../../lib/api/favorites";
import { getUserSession } from "../../../lib/core/session";

export default async function FavoritesPage() {
  const user = await getUserSession();
  const userId = user?.id?.toString() || user?._id?.toString();

  const favData = await getMyFavorites(userId);

  const favorites = Array.isArray(favData)
    ? favData
    : favData?.favorites || favData?.data || [];

  return (
    <div className="max-w-5xl mx-auto px-2 py-4">
      <FavoritesTable favorites={favorites} currentUser={user} />
    </div>
  );
}
