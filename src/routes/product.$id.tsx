import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus, Zap, Check, Shield, Truck, RotateCcw } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { usePendingPurchaseStore } from "@/store/pending-purchase-store";
import { useOrderStore } from "@/store/order-store";
import { type Product } from "@/components/products/ProductCard";
import { getStrapiMedia } from "@/lib/utils";
import { useProduct } from "@/hooks/use-api";
import { fetchProductById } from "@/services/strapi";
import { getDeliveryRates, createOrder } from "@/services/api";
import { toast } from "sonner";

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

interface DeliveryRateAttributes {
  wilaya_name: string;
  home_delivery_cost: number;
  desk_delivery_cost: number;
  is_free_delivery: boolean;
  [key: string]: unknown;
}

interface DeliveryRateItem {
  id: number | string;
  attributes?: DeliveryRateAttributes;
  wilaya_name?: string;
  home_delivery_cost?: number;
  desk_delivery_cost?: number;
  is_free_delivery?: boolean;
  [key: string]: unknown;
}

function getProductMetaDetails(product: Product | null) {
  if (!product) return null;

  const title = `${product.name} — HYDORA`;
  const description =
    typeof product.description === "string"
      ? product.description.slice(0, 160)
      : "قارورة حرارية عالية الجودة من HYDORA — تصميم أنيق وأداء استثنائي.";

  let rawImageUrl: string | null = null;

  const imagesObj = product.images as unknown as {
    data?: { attributes?: { url: string } }[];
  } | null;
  const imageObj = product.image as unknown as {
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

  const fullImageUrl = rawImageUrl ? getStrapiMedia(rawImageUrl) : "https://hydora.dz/og-image.png";

  return { title, description, fullImageUrl };
}

export const Route = createFileRoute("/product/$id")({
  // Loader يعمل في الخلفية للـ SEO فقط
  loader: async ({ params }) => {
    try {
      const product = await fetchProductById({ data: params.id });
      return product as Product | null;
    } catch (error) {
      return null;
    }
  },

  head: ({ loaderData }) => {
    const metaDetails = getProductMetaDetails(loaderData as Product | null);

    if (!metaDetails || !loaderData) {
      return {
        meta: [{ title: "المنتج غير موجود — HYDORA" }],
      };
    }

    const { title, description, fullImageUrl } = metaDetails;
    const url = `https://hydora.dz/product/${(loaderData as Product).id}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: fullImageUrl },
        { property: "og:site_name", content: "HYDORA" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@hydora" },
        { name: "twitter:creator", content: "@hydora" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: fullImageUrl },
      ],
    };
  },

  component: ProductPageWrapper,
});

// ✅ أعدنا هذه الدالة لتعتمد على useProduct كما كانت في مشروعك الأصلي تماماً
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
  const navigate = useNavigate();
  const setPendingItem = usePendingPurchaseStore((s) => s.setPendingItem);
  const setOrder = useOrderStore((s) => s.setLastOrder);

  const isAvailable = product.is_available ?? true;

  const safeColors = ((product.colors as unknown as StrapiEntity[]) || []).map(
    (c: StrapiEntity | string) =>
      typeof c === "string" ? c : c?.color_name || c?.name || "غير محدد",
  );
  const defaultColors = safeColors.length > 0 ? safeColors : ["الافتراضي"];

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

  const metaDetails = getProductMetaDetails(product);
  const fullImageUrl =
    metaDetails?.fullImageUrl || "https://placehold.co/600x600/e2e8f0/1e293b?text=No+Image";

  // Ensure page title and basic meta tags update on client when product data is available
  useEffect(() => {
    if (!product) return;
    const title = `${product.name} — HYDORA`;
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", typeof product.description === "string" ? product.description : "");
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute(
        "content",
        typeof product.description === "string" ? product.description : "",
      );
    }
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute("content", fullImageUrl);
    }
  }, [product, metaDetails, fullImageUrl]);

  let galleryUrls: string[] = [];
  const imagesObj = product.images as unknown as {
    data?: { attributes?: { url: string } }[];
  } | null;

  if (imagesObj?.data && Array.isArray(imagesObj.data)) {
    galleryUrls = imagesObj.data
      .map((img: StrapiEntity) => getStrapiMedia(img.attributes?.url))
      .filter(Boolean) as string[];
  } else if (Array.isArray(product.images)) {
    galleryUrls = (product.images as unknown as StrapiEntity[])
      .map((img: StrapiEntity | string) => getStrapiMedia(typeof img === "string" ? img : img?.url))
      .filter(Boolean) as string[];
  }

  if (galleryUrls.length === 0) {
    galleryUrls = [fullImageUrl];
  }

  galleryUrls = Array.from(new Set(galleryUrls));
  const displayImage = activeImage || galleryUrls[0];

  // related products removed for one-page direct checkout flow

  const handleBuyNow = () => {
    if (!isAvailable) return;
    setPendingItem({
      productId: Number(product.id),
      name: product.name,
      price: product.price,
      image: fullImageUrl,
      quantity: qty,
      color,
      size,
    });
    // Scroll to embedded direct-checkout form instead of navigating away
    const el = document.getElementById("direct-checkout");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate({ to: "/checkout" });
    }
  };

  // --- Direct Checkout form state (embedded) ---
  const { data: ratesResponse, isLoading: isLoadingRates } = useQuery({
    queryKey: ["deliveryRates"],
    queryFn: getDeliveryRates,
  });

  const wilayasList = ratesResponse?.data || [];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    wilaya: (wilayasList?.[0]?.attributes?.wilaya_name as string) || "الجزائر",
    baladiya: "",
    deliveryType: "home",
  });

  const checkoutItems = [
    {
      productId: Number(product.id),
      name: product.name,
      price: product.price,
      image: fullImageUrl,
      quantity: qty,
      color,
      size,
    },
  ];

  const subTotal = checkoutItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0,
  );

  const selectedWilayaObj = wilayasList.find((w: DeliveryRateItem) => {
    const name = w.attributes?.wilaya_name || w.wilaya_name;
    return name === formData.wilaya;
  });

  const homeCost =
    selectedWilayaObj?.attributes?.home_delivery_cost ?? selectedWilayaObj?.home_delivery_cost ?? 0;
  const deskCost =
    selectedWilayaObj?.attributes?.desk_delivery_cost ?? selectedWilayaObj?.desk_delivery_cost ?? 0;
  const isFree =
    selectedWilayaObj?.attributes?.is_free_delivery ?? selectedWilayaObj?.is_free_delivery ?? false;

  const shippingCost = (() => {
    if (isFree) return 0;
    if (formData.deliveryType === "home") return Number(homeCost);
    return Number(deskCost);
  })();
  const total = subTotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const orderPayload = {
        client_name: formData.fullName,
        phone: formData.phone,
        wilaya: formData.wilaya,
        baladiya: formData.baladiya,
        delivery_type: formData.deliveryType,
        delivery_cost: shippingCost,
        total_amount: total,
        order_status: "new",
        ordered_items: checkoutItems.map((item) => ({
          product_id: item.productId,
          name: item.name,
          quantity: Number(item.quantity),
          price: Number(item.price),
          color: item.color,
          size: item.size,
        })),
      };

      const response = (await createOrder(orderPayload)) as {
        data?: { id?: number | string };
        id?: number | string;
      };
      const createdOrderId = response?.data?.id || response?.id || "0000";

      if (setOrder) {
        setOrder({
          id: String(createdOrderId),
          createdAt: new Date().toISOString(),
          items: checkoutItems,
          customer: {
            fullName: formData.fullName,
            phone: formData.phone,
            wilayaCode: 0,
            wilayaName: formData.wilaya,
            commune: formData.baladiya,
            deliveryType: ((): "home" | "stopdesk" => {
              return formData.deliveryType === "home" ? "home" : "stopdesk";
            })(),
          },
          subtotal: subTotal,
          shipping: shippingCost,
          total: total,
        });
      }

      setPendingItem({
        productId: Number(product.id),
        name: product.name,
        price: product.price,
        image: fullImageUrl,
        quantity: qty,
        color,
        size,
      });

      toast.success("تم تأكيد طلبك بنجاح!");
      navigate({ to: "/order-success" });
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً.");
    } finally {
      setIsSubmitting(false);
    }
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
              onClick={handleBuyNow}
              disabled={!isAvailable}
              className="btn-cyan flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Zap className="h-5 w-5" />
              شراء الآن
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

      {/* Related products removed: product page now shows only product + direct checkout form */}
      {/* Embedded Direct Checkout Form */}
      <section id="direct-checkout" className="mt-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-border-subtle">
            <h2 className="text-xl font-bold text-navy mb-5">إتمام الطلب مباشرة</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-surface px-4 py-3 rounded-xl border focus:border-cyan-brand text-sm"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  dir="ltr"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-surface px-4 py-3 rounded-xl border focus:border-cyan-brand text-sm text-end"
                  placeholder="0555 00 00 00"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">الولاية</label>
                  <select
                    name="wilaya"
                    value={formData.wilaya}
                    onChange={handleChange}
                    className="w-full bg-surface px-4 py-3 rounded-xl border focus:border-cyan-brand text-sm"
                    disabled={isLoadingRates}
                  >
                    {isLoadingRates ? (
                      <option>جاري تحميل الولايات...</option>
                    ) : (
                      wilayasList.map((w: DeliveryRateItem) => {
                        const name = w.attributes?.wilaya_name || w.wilaya_name || "";
                        return (
                          <option key={w.id} value={name}>
                            {name}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">البلدية</label>
                  <input
                    type="text"
                    name="baladiya"
                    required
                    value={formData.baladiya}
                    onChange={handleChange}
                    className="w-full bg-surface px-4 py-3 rounded-xl border focus:border-cyan-brand text-sm"
                    placeholder="الحي / البلدية"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">نوع التوصيل</label>
                <select
                  name="deliveryType"
                  value={formData.deliveryType}
                  onChange={handleChange}
                  className="w-full bg-surface px-4 py-3 rounded-xl border focus:border-cyan-brand text-sm"
                >
                  <option value="home">
                    توصيل للمنزل ({isFree ? "مجاني" : formatPrice(Number(homeCost))})
                  </option>
                  <option value="desk">
                    توصيل للمكتب / نقطة استلام ({isFree ? "مجاني" : formatPrice(Number(deskCost))})
                  </option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || isLoadingRates}
                className="btn-cyan w-full mt-4 py-4! text-base flex justify-center"
              >
                {isSubmitting ? "جاري تأكيد الطلب..." : "تأكيد الطلب الآن"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 bg-surface-alt p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-navy mb-5">ملخص الطلب</h2>

            <div className="space-y-3 mb-6 max-h-75 overflow-auto pe-1">
              {checkoutItems.map((item) => (
                <div
                  key={`${item.productId}-${item.color}-${item.size}`}
                  className="flex items-center gap-3 bg-white p-3 rounded-xl border border-border-subtle shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover bg-surface shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-navy line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.color} · {item.size} · × {item.quantity}
                    </p>
                  </div>
                  <div className="text-navy font-bold text-sm shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-border-subtle text-sm">
              <div className="flex justify-between text-navy">
                <span>المجموع الفرعي</span>
                <span className="font-semibold">{formatPrice(subTotal)}</span>
              </div>
              <div className="flex justify-between text-navy">
                <span>التوصيل</span>
                <span className="font-semibold">
                  {isFree ? "مجاني" : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-navy text-lg font-extrabold pt-3 border-t border-border-subtle">
                <span>المجموع الإجمالي</span>
                <span className="text-cyan-brand">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
