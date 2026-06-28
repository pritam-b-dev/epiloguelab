import Image from "next/image";
import HeroBanner from "../../components/home/HeroBanner";
import FeaturedLessons from "../../components/home/FeaturedLessons";
import { getFeaturedLessons, getMostSavedLessons } from "../../lib/api/lessons";
import WhyLearningMatters from "../../components/home/WhyLearningMatters";
import MostSavedLessons from "../../components/home/MostSavedLessons";
import TopContributors from "../../components/home/TopContributors";
import { getTopContributors } from "../../lib/api/users";

export default async function Home() {
  const lessons = await getFeaturedLessons();
  const mostSaved = await getMostSavedLessons();
  const contributors = await getTopContributors();
  return (
    <div>
      <HeroBanner />
      <FeaturedLessons lessons={lessons} />
      <WhyLearningMatters />
      <MostSavedLessons lessons={mostSaved} />
      <TopContributors contributors={contributors} />
    </div>
  );
}
