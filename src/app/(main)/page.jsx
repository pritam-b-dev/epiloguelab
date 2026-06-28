import Image from "next/image";
import HeroBanner from "../../components/home/HeroBanner";
import FeaturedLessons from "../../components/home/FeaturedLessons";
import { getFeaturedLessons } from "../../lib/api/lessons";

export default async function Home() {
  const lessons = await getFeaturedLessons();
  return (
    <div>
      <HeroBanner />
      <FeaturedLessons lessons={lessons} />
    </div>
  );
}
