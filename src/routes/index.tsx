import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/home/HeroSection";
import { BestSellerProducts } from "@/components/home/BestSellerProducts";
import { TrustBadges } from "@/components/home/TrustBadges";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HYDORA — قوارير حرارية عالية الجودة | Stay Refreshed" },
      {
        name: "description",
        content:
          "HYDORA — قوارير حرارية عالية الجودة، تصميم أنيق وأداء استثنائي. توصيل لجميع الولايات، الدفع عند الاستلام.",
      },
      { property: "og:title", content: "HYDORA — قوارير حرارية عالية الجودة" },
      {
        property: "og:description",
        content:
          "ترطيب يدوم معك أينما ذهبت. قوارير حرارية أنيقة، توصيل لجميع الولايات في الجزائر، دفع عند الاستلام.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://hydora.dz" },
      { property: "og:image", content: "https://hydora.dz/og-img.png" },
      { property: "og:site_name", content: "HYDORA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@hydora" },
      { name: "twitter:creator", content: "@hydora" },
      { name: "twitter:title", content: "HYDORA — قوارير حرارية عالية الجودة" },
      {
        name: "twitter:description",
        content: "ترطيب يدوم معك أينما ذهبت. قوارير حرارية أنيقة، توصيل لجميع الولايات في الجزائر.",
      },
      { name: "twitter:image", content: "https://hydora.dz/og-img.png" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <BestSellerProducts />
      <TrustBadges />
    </>
  );
}
