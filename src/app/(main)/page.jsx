import Image from "next/image";
import HeroBanner from "../../components/home/HeroBanner";
import FeaturedLessons from "../../components/home/FeaturedLessons";
import { getFeaturedLessons, getMostSavedLessons } from "../../lib/api/lessons";
import WhyLearningMatters from "../../components/home/WhyLearningMatters";
import MostSavedLessons from "../../components/home/MostSavedLessons";
import TopContributors from "../../components/home/TopContributors";
import { getTopContributors } from "../../lib/api/users";

async function fetchHomeData() {
  let lessons = [];
  let mostSaved = [];
  let contributors = [];

  try {
    const res = await getFeaturedLessons();
    lessons = Array.isArray(res) ? res : [];
  } catch (err) {
    console.warn(
      "⚠️ Failed to fetch Featured Lessons during build:",
      err.message,
    );
  }

  try {
    const res = await getMostSavedLessons();
    mostSaved = Array.isArray(res) ? res : [];
  } catch (err) {
    console.warn(
      "⚠️ Failed to fetch Most Saved Lessons during build:",
      err.message,
    );
  }

  try {
    const res = await getTopContributors();
    contributors = Array.isArray(res) ? res : [];
  } catch (err) {
    console.warn(
      "⚠️ Failed to fetch Top Contributors during build:",
      err.message,
    );
  }

  return { lessons, mostSaved, contributors };
}

export default async function Home() {
  const { lessons, mostSaved, contributors } = await fetchHomeData();

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
