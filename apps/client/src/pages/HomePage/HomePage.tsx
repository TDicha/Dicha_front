import {
  HomeBestProductsSection,
  HomeHeroSection,
  HomeRoasterPickSection,
  HomeStoryCard,
  useHomeData,
} from "@/features/home";

export function HomePage() {
  const { bestProducts, heroSlide, heroSlides } = useHomeData();
  const monthlyBestProduct = bestProducts[0];

  return (
    <div className="page-content cafe-tile-bg space-y-7 pb-24 pt-0">
      <HomeHeroSection heroSlide={heroSlide} heroSlides={heroSlides} />
      <HomeBestProductsSection products={bestProducts} />
      <HomeRoasterPickSection product={monthlyBestProduct} />
      <HomeStoryCard />
    </div>
  );
}
