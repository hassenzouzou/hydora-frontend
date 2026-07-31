import { Link } from "@tanstack/react-router";
import { Snowflake, Flame, ShieldCheck, Droplets, ArrowLeft } from "lucide-react";
import { useProducts } from "@/hooks/use-api";
import { type Product } from "@/components/products/ProductCard";
import { getStrapiMedia } from "@/lib/utils"; // ✅ 1. استيراد دالة معالجة الروابط

// ✅ 2. دالة مساعدة لاستخراج الصورة بأمان التام وإرضاء TypeScript
const getHeroImageUrl = (product: Product) => {
  let rawImageUrl: string | null = null;

  const imagesObj = product.images as { data?: { attributes?: { url: string } }[] } | null;
  const imageObj = product.image as {
    url?: string;
    data?: { attributes?: { url: string } };
  } | null;

  if (imagesObj?.data?.[0]?.attributes?.url) {
    rawImageUrl = imagesObj.data[0].attributes.url;
  } else if (Array.isArray(product.images) && product.images[0]) {
    const firstImg = product.images[0];
    rawImageUrl =
      typeof firstImg === "string" ? firstImg : (firstImg as { url?: string }).url || null;
  } else if (product.image) {
    if (typeof product.image === "string") {
      rawImageUrl = product.image;
    } else {
      rawImageUrl = imageObj?.url || imageObj?.data?.attributes?.url || null;
    }
  }

  return rawImageUrl
    ? getStrapiMedia(rawImageUrl)
    : "https://placehold.co/400x500/e2e8f0/1e293b?text=Bottle";
};

export function HeroSection() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-linear-to-b from-surface-hero to-white min-h-[75vh] flex items-center justify-center">
        <div className="text-navy font-semibold text-xl">جاري تحميل واجهة المتجر...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative overflow-hidden bg-linear-to-b from-surface-hero to-white min-h-[75vh] flex items-center justify-center">
        <div className="text-red-500 font-semibold text-xl">حدث خطأ أثناء الاتصال بالخادم.</div>
      </section>
    );
  }

  const bottles = products ? products.slice(0, 4) : [];
  const hasBottles = bottles.length > 0;

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-surface-hero to-white">
      <div className="container-hydora grid grid-cols-1 lg:grid-cols-5 gap-10 items-center py-16 lg:py-24 min-h-[75vh]">
        {/* النص */}
        <div className="lg:col-span-3 space-y-6 text-center lg:text-start">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] text-navy">
            ترطيب يدوم
            <span className="block mt-4 text-navy">معك أينما ذهبت</span>
          </h1>
          <p className="text-navy/70 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
            قوارير حرارية عالية الجودة تصميم أنيق وأداء استثنائي، للحياة اليومية والرحلات والرياضة.
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <Link to="/products" className="btn-cyan">
              تسوق الآن
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-2xl mx-auto lg:mx-0">
            {[
              { icon: Snowflake, label: "24H بارد" },
              { icon: Flame, label: "12H ساخن" },
              { icon: ShieldCheck, label: "BPA Free" },
              { icon: Droplets, label: "مانع للتسرب" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2 bg-white rounded-xl shadow-sm px-3 py-3 border border-border-subtle"
              >
                <f.icon className="h-5 w-5 text-cyan-brand shrink-0" />
                <span className="text-navy text-[13px] font-semibold">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* مجموعة القوارير (شاشات كبيرة) */}
        <div className="lg:col-span-2 relative h-380px lg:h-520px hidden md:block">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-72 h-72 bg-cyan-light rounded-full blur-3xl opacity-60" />
          </div>
          {bottles.map((b: Product, i: number) => {
            const positions = [
              "top-4 start-8 w-40 h-52 rotate-[-6deg] z-20",
              "top-16 end-4 w-36 h-48 rotate-[8deg] z-10",
              "bottom-8 start-0 w-32 h-44 rotate-[10deg] z-30",
              "bottom-0 end-14 w-44 h-56 rotate-[-4deg] z-10",
            ];

            // ✅ 3. استخدام الدالة المساعدة لاستخراج الرابط بأمان تام
            const imageUrl = getHeroImageUrl(b);

            return (
              <div
                key={b.id}
                className={`absolute ${positions[i]} rounded-3xl overflow-hidden bg-white shadow-[0_20px_50px_-15px_rgba(21,37,88,0.35)]`}
              >
                <img src={imageUrl} alt={b.name} className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>

        {/* عرض الموبايل */}
        {hasBottles && (
          <div className="md:hidden mx-auto w-56 h-72 rounded-3xl overflow-hidden bg-white shadow-brand-md mt-10">
            {/* ✅ 4. استخدام نفس الدالة للموبايل */}
            <img
              src={getHeroImageUrl(bottles[0])}
              alt={bottles[0].name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
