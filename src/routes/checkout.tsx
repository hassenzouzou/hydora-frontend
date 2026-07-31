import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "@/store/cart-store";
import { useOrderStore } from "@/store/order-store";
import { formatPrice } from "@/lib/format";
import { toast } from "sonner";
import { createOrder, getDeliveryRates } from "@/services/api";

// ✅ 1. تعريف واجهات TypeScript بدقة تامة لتجنب any
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

interface DeliveryRatesResponse {
  data?: DeliveryRateItem[];
  [key: string]: unknown;
}

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب — HYDORA" },
      {
        name: "description",
        content: "أتمتة طلبك مع HYDORA — توصيل لجميع الولايات، الدفع عند الاستلام.",
      },
      { property: "og:title", content: "إتمام الطلب — HYDORA" },
      {
        property: "og:description",
        content: "أتمتة طلبك مع HYDORA — توصيل لجميع الولايات، الدفع عند الاستلام.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://hydora.dz/checkout" },
      { property: "og:image", content: "https://hydora.dz/og-img.png" },
      { property: "og:site_name", content: "HYDORA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@hydora" },
      { name: "twitter:creator", content: "@hydora" },
      { name: "twitter:title", content: "إتمام الطلب — HYDORA" },
      {
        name: "twitter:description",
        content: "أتمتة طلبك مع HYDORA — توصيل لجميع الولايات، الدفع عند الاستلام.",
      },
      { name: "twitter:image", content: "https://hydora.dz/og-img.png" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const cartItems = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  // ✅ التعامل مع الستور بطريقة آمنة بدون any
  const setOrder = useOrderStore((s) => {
    const store = s as unknown as {
      setOrder?: (order: unknown) => void;
      setLastOrder?: (order: unknown) => void;
    };
    return store.setOrder || store.setLastOrder;
  });

  // ✅ جلب الولايات والتسعيرات من Strapi مع التحديد النوعي
  const { data: ratesResponse, isLoading: isLoadingRates } = useQuery<DeliveryRatesResponse>({
    queryKey: ["deliveryRates"],
    queryFn: getDeliveryRates,
  });

  const wilayasList = ratesResponse?.data || [];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    wilaya: "الجزائر",
    baladiya: "",
    deliveryType: "home",
  });

  // ✅ البحث عن تسعيرة الولاية المختارة بدون any
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

  const subTotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0,
  );

  const shippingCost = isFree
    ? 0
    : formData.deliveryType === "home"
      ? Number(homeCost)
      : Number(deskCost);

  const total = subTotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="container-hydora py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-navy mb-4">سلة المشتريات فارغة</h2>
        <button onClick={() => navigate({ to: "/products" })} className="btn-cyan">
          تسوق الآن
        </button>
      </div>
    );
  }

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
        ordered_items: cartItems.map((item) => ({
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
          id: createdOrderId,
          createdAt: new Date().toISOString(),
          items: cartItems,
          customer: {
            fullName: formData.fullName,
            phone: formData.phone,
            wilayaName: formData.wilaya,
            commune: formData.baladiya,
            deliveryType: formData.deliveryType,
          },
          subtotal: subTotal,
          shipping: shippingCost,
          total: total,
        });
      }

      clearCart();
      toast.success("تم تأكيد طلبك بنجاح!");
      navigate({ to: "/order-success" });
    } catch {
      toast.error("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-hydora py-12">
      <h1 className="text-3xl font-extrabold text-navy mb-8">إتمام الطلب</h1>
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* نموذج معلومات التوصيل */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-border-subtle">
          <h2 className="text-xl font-bold text-navy mb-5">معلومات التوصيل</h2>
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

        {/* ملخص الطلب وعرض الصور */}
        <div className="lg:col-span-5 bg-surface-alt p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-navy mb-5">ملخص الطلب</h2>

          {/* ✅ إعادة إدراج قائمة المنتجات مع صورها وأفاصيلها */}
          <div className="space-y-3 mb-6 max-h-75 overflow-auto pe-1">
            {cartItems.map((item) => (
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
              <span className="font-semibold">{isFree ? "مجاني" : formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between text-navy text-lg font-extrabold pt-3 border-t border-border-subtle">
              <span>المجموع الإجمالي</span>
              <span className="text-cyan-brand">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
