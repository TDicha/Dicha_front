import {
  HomeBestProductsSection,
  HomeHeroSection,
  HomeQuickLinks,
  HomeReviewSection,
  HomeRoasterPickSection,
  HomeStoryCard,
  useHomeData,
} from "@/features/home";

export function HomePage() {
  const {
    bestProducts,
    heroSlide,
    heroSlides,
    quickLinks,
    reviews,
    roasterPick,
    roasterPickMeta,
  } = useHomeData();

  return (
    <div className="page-content space-y-7 bg-white pb-24 pt-0">
      <HomeHeroSection heroSlide={heroSlide} heroSlides={heroSlides} />
      <HomeQuickLinks quickLinks={quickLinks} />
      <HomeBestProductsSection products={bestProducts} />
      <HomeRoasterPickSection product={roasterPick} roasterPickMeta={roasterPickMeta} />
      <HomeReviewSection reviews={reviews} />
      <HomeStoryCard />
    </div>
  );
}
