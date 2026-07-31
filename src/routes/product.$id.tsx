import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart, Check, Shield, Truck, RotateCcw } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { ProductCard, type Product } from "@/components/products/ProductCard";
import { toast } from "sonner";
import { getStrapiMedia } from "@/lib/utils";
import { useProduct, useProducts } from "@/hooks/use-api";
import { useSeoMeta } from "@/hooks/use-seo";

// ✅ 1. إنشاء واجهة آمنة لتوصيف كائنات Strapi (الألوان، المقاسات، الصور)
interface StrapiEntity {
  name?: string;
  color_name?: string;
  size_name?: string;
  url?: string;
  attributes?: {
    url?: string;
    name?: string;
  };
  [key: string]: unknown;
}

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "تفاصيل المنتج — HYDORA" },
      {
        name: "description",
        content: "اطّلع على تفاصيل هذا المنتج من HYDORA — قارورة حرارية عالية الجودة.",
      },
      { property: "og:title", content: "تفاصيل المنتج — HYDORA" },
      {
        property: "og:description",
        content: "اطّلع على تفاصيل هذا المنتج من HYDORA — قارورة حرارية عالية الجودة.",
      },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "https://hydora.dz/product" },
      { property: "og:image", content: "https://hydora.dz/og-img.png" },
      { property: "og:site_name", content: "HYDORA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@hydora" },
      { name: "twitter:creator", content: "@hydora" },
      { name: "twitter:title", content: "تفاصيل المنتج — HYDORA" },
      {
        name: "twitter:description",
        content: "اطّلع على تفاصيل هذا المنتج من HYDORA.",
      },
      { name: "twitter:image", content: "https://hydora.dz/og-img.png" },
    ],
  }),
  component: ProductPageWrapper,
});

function ProductPageWrapper() {
  const { id } = Route.useParams();
  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) {
    return (
      <div className="container-hydora py-20 text-center">
        <p className="text-navy font-bold text-xl mb-2">جاري تحميل تفاصيل المنتج...</p>
        <p className="text-sm text-muted-foreground">الرجاء الانتظار قليلاً</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-hydora py-20 text-center">
        <h1 className="text-2xl font-bold text-navy">المنتج غير موجود</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          قد يكون قد تم حذفه أو أن الرابط غير صحيح.
        </p>
        <Link to="/products" className="btn-cyan mt-6 inline-flex">
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return <ProductDetailPage product={product as Product} />;
}

function ProductDetailPage({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);

  const isAvailable = product.is_available ?? true;

  // ✅ 2. استخدام StrapiEntity بدلاً من any للألوان
  const safeColors = ((product.colors as unknown as StrapiEntity[]) || []).map(
    (c: StrapiEntity | string) =>
      typeof c === "string" ? c : c?.color_name || c?.name || "غير محدد",
  );
  const defaultColors = safeColors.length > 0 ? safeColors : ["الافتراضي"];

  // ✅ 3. استخدام StrapiEntity بدلاً من any للمقاسات
  const safeSizes = ((product.sizes as unknown as StrapiEntity[]) || []).map(
    (s: StrapiEntity | string) =>
      typeof s === "string" ? s : s?.size_name || s?.name || "غير محدد",
  );
  const defaultSizes = safeSizes.length > 0 ? safeSizes : ["الافتراضي"];

  const [color, setColor] = useState(defaultColors[0]);
  const [size, setSize] = useState(defaultSizes[0]);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const categoryName =
    typeof product.category === "object" && product.category !== null
      ? product.category.name || "عام"
      : typeof product.category === "string"
        ? product.category
        : "عام";

  const descriptionText =
    typeof product.description === "string" ? product.description : "لا يوجد وصف متاح لهذا المنتج.";

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

  const fullImageUrl = rawImageUrl
    ? getStrapiMedia(rawImageUrl)
    : "https://placehold.co/600x600/e2e8f0/1e293b?text=No+Image";

  useSeoMeta({
    title: `${product.name} — HYDORA`,
    description:
      typeof product.description === "string"
        ? product.description.slice(0, 160)
        : "قارورة حرارية عالية الجودة من HYDORA — تصميم أنيق وأداء استثنائي.",
    ogTitle: product.name,
    ogDescription:
      typeof product.description === "string"
        ? product.description.slice(0, 200)
        : "قارورة حرارية عالية الجودة من HYDORA.",
    ogImage: fullImageUrl,
    ogUrl: `https://hydora.dz/product/${product.id}`,
    ogType: "product",
    twitterCard: "summary_large_image",
    twitterTitle: product.name,
    twitterDescription:
      typeof product.description === "string"
        ? product.description.slice(0, 200)
        : "قارورة حرارية عالية الجودة من HYDORA.",
    twitterImage: fullImageUrl,
  });

  let galleryUrls: string[] = [];

  if (imagesObj?.data && Array.isArray(imagesObj.data)) {
    // ✅ 4. استخدام StrapiEntity لصور Strapi v4
    galleryUrls = imagesObj.data
      .map((img: StrapiEntity) => getStrapiMedia(img.attributes?.url))
      .filter(Boolean) as string[];
  } else if (Array.isArray(product.images)) {
    // ✅ 5. استخدام StrapiEntity لصور Strapi v5
    galleryUrls = (product.images as unknown as StrapiEntity[])
      .map((img: StrapiEntity | string) => getStrapiMedia(typeof img === "string" ? img : img?.url))
      .filter(Boolean) as string[];
  }

  if (galleryUrls.length === 0) {
    galleryUrls = [fullImageUrl];
  }

  galleryUrls = Array.from(new Set(galleryUrls));
  const displayImage = activeImage || galleryUrls[0];

  const { data: allProducts } = useProducts();
  const related = useMemo(() => {
    if (!allProducts) return [];
    return allProducts.filter((p: Product) => String(p.id) !== String(product.id)).slice(0, 4);
  }, [allProducts, product.id]);

  const handleAdd = () => {
    if (!isAvailable) return;
    addItem({
      productId: Number(product.id),
      name: product.name,
      price: product.price,
      image: fullImageUrl,
      quantity: qty,
      color,
      size,
    });
    toast.success("تمت الإضافة للسلة");
    openDrawer();
  };

  return (
    <div className="container-hydora py-8">
      <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-cyan-brand">
          الرئيسية
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-cyan-brand">
          المنتجات
        </Link>
        <span>/</span>
        <span className="text-navy font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <div className="bg-surface-alt rounded-2xl overflow-hidden aspect-square">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>

          {galleryUrls.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {galleryUrls.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(url)}
                  className={`aspect-square bg-surface-alt rounded-xl overflow-hidden ring-2 transition-all ${
                    displayImage === url
                      ? "ring-cyan-brand opacity-100"
                      : "ring-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`عرض الصورة ${i + 1}`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-cyan-light text-navy">
            {categoryName}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy mt-3">{product.name}</h1>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-3xl font-extrabold text-navy">{formatPrice(product.price)}</span>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${
                isAvailable ? "bg-cyan-light text-navy" : "bg-red-100 text-red-600"
              }`}
            >
              {isAvailable ? "متوفر" : "نفد المخزون"}
            </span>
          </div>

          <p className="text-muted-foreground text-sm mt-5 leading-relaxed">{descriptionText}</p>

          {safeColors.length > 0 && (
            <div className="mt-6">
              <label className="text-navy font-semibold text-sm mb-2 block">
                اللون: <span className="text-muted-foreground font-normal">{color}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {defaultColors.map((c: string) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-3 py-1.5 rounded-lg text-sm border-2 transition-colors ${
                      color === c
                        ? "bg-navy text-white border-navy"
                        : "bg-white text-navy border-border-subtle hover:border-cyan-brand"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {safeSizes.length > 0 && (
            <div className="mt-5">
              <label className="text-navy font-semibold text-sm mb-2 block">
                السعة: <span className="text-muted-foreground font-normal">{size}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {defaultSizes.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-3 py-1.5 rounded-lg text-sm border-2 transition-colors ${
                      size === s
                        ? "bg-cyan-brand text-white border-cyan-brand"
                        : "bg-white text-navy border-border-subtle hover:border-cyan-brand"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-stretch gap-3">
            <div className="inline-flex items-center bg-white rounded-xl border-2 border-border-subtle">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="p-3 text-navy hover:text-cyan-brand"
                aria-label="نقص"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 font-bold text-navy min-w-[2ch] text-center">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="p-3 text-navy hover:text-cyan-brand"
                aria-label="زيادة"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={!isAvailable}
              className="btn-cyan flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-5 w-5" />
              أضف للسلة
            </button>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
            {[
              { icon: Truck, label: "توصيل لكل الولايات" },
              { icon: Shield, label: "دفع عند الاستلام" },
              { icon: RotateCcw, label: "إرجاع خلال 7 أيام" },
              { icon: Check, label: "جودة مضمونة" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 bg-surface-alt rounded-lg px-3 py-2"
              >
                <Icon className="h-4 w-4 text-cyan-brand" />
                <span className="text-navy">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy">منتجات مشابهة</h2>
            <Link to="/products" className="text-sm text-cyan-brand hover:underline">
              عرض الكل
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
