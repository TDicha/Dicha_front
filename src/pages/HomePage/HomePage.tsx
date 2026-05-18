import {
  HomeBestProductsSection,
  HomeHeroSection,
  HomeRoasterPickSection,
  HomeStoryCard,
  useHomeData,
} from "@/features/home";

export function HomePage() {
  const {
    heroSlide,
    heroSlides,
    roasterPick,
    roasterPickMeta,
  } = useHomeData();

  return (
    <div className="page-content space-y-7 bg-[var(--surface-base)] pb-24 pt-0">
      <HomeHeroSection heroSlide={heroSlide} heroSlides={heroSlides} />
      <HomeBestProductsSection />
      <HomeRoasterPickSection product={roasterPick} roasterPickMeta={roasterPickMeta} />
      {/* <HomeReviewSection reviews={reviews} /> */}
      <HomeStoryCard />
    </div>
  );
}
