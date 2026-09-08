import { createFileRoute, Link, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سلة التسوق — HYDORA" },
      { name: "description", content: "تم إيقاف سلة التسوق. توجّه إلى المتجر للشراء المباشر." },
      { property: "og:title", content: "سلة التسوق — HYDORA" },
      {
        property: "og:description",
        content: "تم إيقاف سلة التسوق. توجّه إلى المتجر للشراء المباشر.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://hydora.dz/cart" },
      { property: "og:image", content: "https://hydora.dz/og-img.png" },
      { property: "og:site_name", content: "HYDORA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@hydora" },
      { name: "twitter:creator", content: "@hydora" },
      { name: "twitter:title", content: "سلة التسوق — HYDORA" },
      {
        name: "twitter:description",
        content: "تم إيقاف سلة التسوق. توجّه إلى المتجر للشراء المباشر.",
      },
      { name: "twitter:image", content: "https://hydora.dz/og-img.png" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  return <Navigate to="/products" />;
}
