import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesRow } from "@/components/home/CategoriesRow";
import { BestSellerProducts } from "@/components/home/BestSellerProducts";
import { TrustBadges } from "@/components/home/TrustBadges";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesRow />
      <BestSellerProducts />
      <TrustBadges />
    </>
  );
}
