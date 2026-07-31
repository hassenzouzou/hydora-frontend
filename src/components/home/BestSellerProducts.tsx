// src/components/home/BestSellerProducts.tsx
import { useProducts } from "@/hooks/use-api";
import { ProductCard, Product } from "../products/ProductCard";

export function BestSellerProducts() {
  // جلب المنتجات من Strapi
  const { data: products, isLoading, error } = useProducts();

  // حالات التحميل والخطأ
  if (isLoading)
    return <div className="py-12 text-center text-brand-navy">جاري تحميل المنتجات...</div>;
  if (error)
    return <div className="py-12 text-center text-red-500">حدث خطأ أثناء جلب المنتجات.</div>;
  if (!products || products.length === 0) return null;

  // أخذ أول 8 منتجات لعرضها في قسم الأكثر مبيعاً
  const bestSellers = products.slice(0, 8);

  return (
    <section className="container-hydora py-12">
      <h2 className="section-title-underline text-2xl font-bold mb-8 text-center">الأكثر مبيعاً</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {bestSellers.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
