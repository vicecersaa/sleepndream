import Hero from "./components/Hero/Hero";
import RecommendedMattresses from "./components/RecommendedMattresses/RecommendedMattresses";
import PromoBanner from "./components/PromoBanner/PromoBanner";
import OfferShowcase from "./components/OfferShowcase/OfferShowcase";
import BrandProofStrip from "./components/BrandProofStrip/BrandProofStrip";
import SeriesSelector from "./components/SeriesSelector/SeriesSelector";
import AccessoriesRecommendations from "./components/AccessoriesRecommendations/AccessoriesRecommendations";
import QualityPromise from "./components/QualityPromise/QualityPromise";
import ReviewsSection from "./components/ReviewsSection/ReviewsSection";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <RecommendedMattresses />
        <OfferShowcase />
        <BrandProofStrip />
        <SeriesSelector />
        <AccessoriesRecommendations />
        <PromoBanner />
        <QualityPromise />
        <ReviewsSection />
      </main>
    </>
  );
}
