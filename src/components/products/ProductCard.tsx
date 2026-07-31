import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { getStrapiMedia } from "@/lib/utils";

// ✅ 1. تعريف واجهة مخصصة لكائنات Strapi للتخلص من any
interface StrapiEntity {
  name?: string;
  color_name?: string;
  size_name?: string;
  attributes?: {
    name?: string;
  };
  [key: string]: unknown;
}

// ✅ 2. تحديث واجهة المنتج واستخدام StrapiEntity و unknown بدلاً من any
export interface Product {
  id: string | number;
  name: string;
  price: number;
  description?: unknown;
  images?: Record<string, unknown> | unknown[] | null;
  image?: Record<string, unknown> | null;
  is_available?: boolean;
  category?: { name?: string; slug?: string; [key: string]: unknown } | string;
  categorySlug?: string;
  colors?: (string | StrapiEntity)[];
  sizes?: (string | StrapiEntity)[];
  [key: string]: unknown;
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);

  const isAvailable = product.is_available ?? true;

  const categoryName =
    typeof product.category === "object" && product.category !== null
      ? product.category.name || "عام"
      : typeof product.category === "string"
        ? product.category
        : "عام";

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

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAvailable) return;

    // ✅ 3. استخراج اللون والمقاس بطريقة آمنة ترضي TypeScript
    const firstColor = product.colors?.[0];
    const safeColor = firstColor
      ? typeof firstColor === "string"
        ? firstColor
        : firstColor.color_name || firstColor.name || "الافتراضي"
      : "الافتراضي";

    const firstSize = product.sizes?.[0];
    const safeSize = firstSize
      ? typeof firstSize === "string"
        ? firstSize
        : firstSize.size_name || firstSize.name || "الافتراضي"
      : "الافتراضي";

    addItem({
      productId: Number(product.id),
      name: product.name,
      price: product.price,
      image: fullImageUrl,
      quantity: 1,
      color: safeColor,
      size: safeSize,
    });

    toast.success("تمت الإضافة للسلة");
    openDrawer();
  };

  return (
    <Link
      to="/product/$id"
      params={{ id: String(product.id) }}
      className="card-hydora relative flex flex-col overflow-hidden group"
    >
      <div className="absolute top-3 inset-x-3 z-10 flex items-start justify-between gap-2 pointer-events-none">
        <span
          className={`text-[11px] font-bold px-2 py-1 rounded-full shadow-sm ${
            isAvailable ? "bg-cyan-light text-navy" : "bg-red-100 text-red-600"
          }`}
        >
          {isAvailable ? "متوفر" : "نفد المخزون"}
        </span>
        <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-white/90 backdrop-blur text-navy border border-border-subtle shadow-sm">
          {categoryName}
        </span>
      </div>

      <div
        className={`aspect-square bg-surface-alt overflow-hidden flex items-center justify-center ${
          !isAvailable ? "grayscale opacity-80" : ""
        }`}
      >
        <img
          src={fullImageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 pb-14 flex flex-col gap-2 flex-1">
        <h3 className="text-navy font-semibold text-[15px] line-clamp-2 leading-snug min-h-10.5">
          {product.name}
        </h3>
        <div className="text-navy font-bold text-lg mt-auto">{formatPrice(product.price)}</div>
      </div>

      <button
        onClick={handleQuickAdd}
        disabled={!isAvailable}
        aria-label="أضف للسلة"
        className="absolute bottom-3 inset-e-3 bg-cyan-brand hover:bg-cyan-dark disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full p-2.5 shadow-lg transition-all hover:scale-110"
      >
        <ShoppingCart className="h-4 w-4" />
      </button>
    </Link>
  );
}
