import { mockProducts } from "@/lib/mock-data";
import { ProductCard } from "@/components/products/ProductCard";

export function BestSellerProducts() {
  const products = mockProducts.slice(0, 8);
  return (
    <section id="best-sellers" className="bg-surface-alt py-16">
      <div className="container-hydora">
        <div className="text-center mb-10">
          <h2 className="section-title-underline text-2xl md:text-3xl">الأكثر مبيعاً</h2>
          <p className="text-muted-foreground mt-3 text-sm">اختيارات عملائنا المفضلة</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
