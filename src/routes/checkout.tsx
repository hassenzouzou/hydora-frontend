import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, ShoppingBag, Truck, MapPin, Phone, User } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useOrderStore } from "@/store/order-store";
import { wilayas } from "@/lib/wilayas";
import { formatPrice } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "الدفع — HYDORA" },
      { name: "description", content: "أكمل طلبك — دفع عند الاستلام مع توصيل لجميع الولايات." },
      { property: "og:title", content: "الدفع — HYDORA" },
      { property: "og:description", content: "أكمل طلبك — دفع عند الاستلام مع توصيل لجميع الولايات." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  wilayaCode: string;
  commune: string;
  address: string;
  deliveryType: "home" | "stopdesk";
  notes: string;
};

const initialForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  wilayaCode: "",
  commune: "",
  address: "",
  deliveryType: "home",
  notes: "",
};

function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getTotalPrice());
  const clearCart = useCartStore((s) => s.clearCart);
  const setLastOrder = useOrderStore((s) => s.setLastOrder);

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const selectedWilaya = useMemo(
    () => wilayas.find((w) => String(w.code) === form.wilayaCode),
    [form.wilayaCode],
  );

  const shipping = useMemo(() => {
    if (!selectedWilaya) return 0;
    return form.deliveryType === "home"
      ? selectedWilaya.homeDelivery
      : selectedWilaya.stopDeskDelivery;
  }, [selectedWilaya, form.deliveryType]);

  const total = subtotal + shipping;

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  if (items.length === 0) {
    return (
      <div className="container-hydora py-20 text-center">
        <div className="h-24 w-24 rounded-full bg-cyan-light mx-auto flex items-center justify-center mb-5">
          <ShoppingBag className="h-11 w-11 text-cyan-brand" />
        </div>
        <h1 className="text-2xl font-bold text-navy">لا توجد منتجات للدفع</h1>
        <p className="text-muted-foreground mt-2 text-sm">أضف منتجات إلى سلتك أولاً.</p>
        <Link to="/products" className="btn-cyan mt-6 inline-flex">تصفح المنتجات</Link>
      </div>
    );
  }

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) e.fullName = "الاسم مطلوب";
    if (!/^0[567]\d{8}$/.test(form.phone.trim()))
      e.phone = "أدخل رقم جزائري صحيح (10 أرقام يبدأ بـ 05/06/07)";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "بريد إلكتروني غير صحيح";
    if (!form.wilayaCode) e.wilayaCode = "اختر الولاية";
    if (!form.commune.trim()) e.commune = "البلدية مطلوبة";
    if (form.deliveryType === "home" && !form.address.trim()) e.address = "العنوان مطلوب للتوصيل للمنزل";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate() || !selectedWilaya) {
      toast.error("تحقق من الحقول المميزة");
      return;
    }
    setSubmitting(true);
    // Simulate order placement — replace with Strapi POST later.
    await new Promise((r) => setTimeout(r, 700));

    const order = {
      id: `HYD-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      items,
      customer: {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        wilayaCode: selectedWilaya.code,
        wilayaName: selectedWilaya.name,
        commune: form.commune.trim(),
        address: form.address.trim(),
        deliveryType: form.deliveryType,
        notes: form.notes.trim() || undefined,
      },
      subtotal,
      shipping,
      total,
    };

    setLastOrder(order);
    clearCart();
    setSubmitting(false);
    toast.success("تم استلام طلبك بنجاح");
    navigate({ to: "/order-success" });
  };

  const inputCls = (hasError?: string) =>
    `w-full bg-white border-2 rounded-lg px-3 py-2.5 text-sm text-navy outline-none transition-colors ${
      hasError ? "border-destructive" : "border-border-subtle focus:border-cyan-brand"
    }`;

  return (
    <div className="container-hydora py-8">
      <h1 className="text-3xl font-extrabold text-navy mb-2">إتمام الطلب</h1>
      <p className="text-muted-foreground text-sm mb-6">دفع عند الاستلام — لا يلزم دفع مسبق.</p>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-6">
          {/* Contact */}
          <section className="bg-white border border-border-subtle rounded-2xl p-6">
            <h2 className="text-navy font-bold text-lg mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-cyan-brand" />
              معلومات التواصل
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-navy font-semibold text-sm mb-1 block">الاسم الكامل *</label>
                <input
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  className={inputCls(errors.fullName)}
                  placeholder="محمد بن أحمد"
                />
                {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="text-navy font-semibold text-sm mb-1 block flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" /> رقم الهاتف *
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputCls(errors.phone)}
                  placeholder="0555 12 34 56"
                  inputMode="tel"
                  dir="ltr"
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-navy font-semibold text-sm mb-1 block">البريد الإلكتروني (اختياري)</label>
                <input
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputCls(errors.email)}
                  placeholder="you@example.com"
                  type="email"
                  dir="ltr"
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="bg-white border border-border-subtle rounded-2xl p-6">
            <h2 className="text-navy font-bold text-lg mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-cyan-brand" />
              عنوان التوصيل
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-navy font-semibold text-sm mb-1 block">الولاية *</label>
                <select
                  value={form.wilayaCode}
                  onChange={(e) => update("wilayaCode", e.target.value)}
                  className={inputCls(errors.wilayaCode)}
                >
                  <option value="">اختر الولاية</option>
                  {wilayas.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.code.toString().padStart(2, "0")} — {w.name}
                    </option>
                  ))}
                </select>
                {errors.wilayaCode && <p className="text-xs text-destructive mt-1">{errors.wilayaCode}</p>}
              </div>
              <div>
                <label className="text-navy font-semibold text-sm mb-1 block">البلدية *</label>
                <input
                  value={form.commune}
                  onChange={(e) => update("commune", e.target.value)}
                  className={inputCls(errors.commune)}
                  placeholder="اسم البلدية"
                />
                {errors.commune && <p className="text-xs text-destructive mt-1">{errors.commune}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-navy font-semibold text-sm mb-1 block">
                  العنوان التفصيلي {form.deliveryType === "home" && "*"}
                </label>
                <input
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className={inputCls(errors.address)}
                  placeholder="الحي، الشارع، رقم المنزل"
                />
                {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-navy font-semibold text-sm mb-1 block">ملاحظات (اختياري)</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className={inputCls()}
                  rows={2}
                  placeholder="أي معلومات إضافية للتوصيل"
                />
              </div>
            </div>
          </section>

          {/* Delivery */}
          <section className="bg-white border border-border-subtle rounded-2xl p-6">
            <h2 className="text-navy font-bold text-lg mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5 text-cyan-brand" />
              طريقة التوصيل
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {(["home", "stopdesk"] as const).map((d) => {
                const active = form.deliveryType === d;
                const price = selectedWilaya
                  ? d === "home"
                    ? selectedWilaya.homeDelivery
                    : selectedWilaya.stopDeskDelivery
                  : null;
                return (
                  <button
                    type="button"
                    key={d}
                    onClick={() => update("deliveryType", d)}
                    className={`text-start p-4 rounded-xl border-2 transition-all ${
                      active
                        ? "border-cyan-brand bg-cyan-light/50"
                        : "border-border-subtle bg-white hover:border-cyan-brand/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-navy font-semibold">
                        {d === "home" ? "توصيل للمنزل" : "توصيل للمكتب (Stop Desk)"}
                      </span>
                      {active && <CheckCircle2 className="h-5 w-5 text-cyan-brand" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {d === "home" ? "يصلك أمام باب منزلك" : "استلام من أقرب مكتب توصيل"}
                    </p>
                    {price !== null && (
                      <p className="text-cyan-brand font-bold text-sm mt-2">{formatPrice(price)}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Payment */}
          <section className="bg-white border border-border-subtle rounded-2xl p-6">
            <h2 className="text-navy font-bold text-lg mb-4">طريقة الدفع</h2>
            <div className="flex items-center gap-3 p-4 border-2 border-cyan-brand bg-cyan-light/50 rounded-xl">
              <CheckCircle2 className="h-5 w-5 text-cyan-brand flex-shrink-0" />
              <div>
                <p className="text-navy font-semibold">الدفع عند الاستلام</p>
                <p className="text-xs text-muted-foreground">ادفع نقداً عند استلام طلبك.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="bg-surface-alt rounded-2xl p-6 h-fit lg:sticky lg:top-32 space-y-4">
          <h3 className="text-navy font-bold text-lg">ملخص الطلب</h3>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((it) => (
              <div
                key={`${it.productId}-${it.color}-${it.size}`}
                className="flex gap-3 items-center"
              >
                <div className="relative">
                  <img src={it.image} alt={it.name} className="h-14 w-14 rounded-lg object-cover" />
                  <span className="absolute -top-1 -end-1 bg-navy text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {it.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-navy text-sm font-medium line-clamp-1">{it.name}</p>
                  <p className="text-xs text-muted-foreground">{it.color} · {it.size}</p>
                </div>
                <div className="text-navy text-sm font-semibold">
                  {formatPrice(it.price * it.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border-subtle pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-navy">
              <span>المجموع الفرعي</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-navy">
              <span>التوصيل</span>
              <span className="font-semibold">
                {selectedWilaya ? formatPrice(shipping) : <span className="text-muted-foreground">اختر الولاية</span>}
              </span>
            </div>
            <div className="border-t border-border-subtle pt-2 flex justify-between text-navy font-bold text-lg">
              <span>الإجمالي</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-cyan w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "جاري إرسال الطلب..." : "تأكيد الطلب"}
          </button>
          <p className="text-xs text-muted-foreground text-center">
            بتأكيدك للطلب فأنت توافق على شروط البيع.
          </p>
        </aside>
      </form>
    </div>
  );
}
