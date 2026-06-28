import Image from "next/image";
import HeroBanner from "../../components/home/HeroBanner";
import FeaturedLessons from "../../components/home/FeaturedLessons";
import { getFeaturedLessons, getMostSavedLessons } from "../../lib/api/lessons";
import WhyLearningMatters from "../../components/home/WhyLearningMatters";
import MostSavedLessons from "../../components/home/MostSavedLessons";

export default async function Home() {
  const lessons = await getFeaturedLessons();
  const mostSaved = await getMostSavedLessons();
  return (
    <div>
      <HeroBanner />
      <FeaturedLessons lessons={lessons} />
      <WhyLearningMatters />
      <MostSavedLessons lessons={mostSaved} />
    </div>
  );
}
