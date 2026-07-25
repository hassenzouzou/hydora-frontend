import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { CheckCircle2, Package, Phone, MapPin, Truck } from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "تم استلام طلبك — HYDORA" },
      { name: "description", content: "شكراً لطلبك من HYDORA. سنتواصل معك قريباً للتأكيد." },
      { property: "og:title", content: "تم استلام طلبك — HYDORA" },
      { property: "og:description", content: "شكراً لطلبك من HYDORA. سنتواصل معك قريباً للتأكيد." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const order = useOrderStore((s) => s.lastOrder);
  if (!order) return <Navigate to="/" />;

  const dateStr = new Date(order.createdAt).toLocaleString("ar-DZ", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="container-hydora py-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="h-20 w-20 rounded-full bg-cyan-light mx-auto flex items-center justify-center mb-4">
            <CheckCircle2 className="h-11 w-11 text-cyan-brand" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy">شكراً لطلبك!</h1>
          <p className="text-muted-foreground mt-2">تم استلام طلبك بنجاح. سنتصل بك قريباً لتأكيد التفاصيل.</p>
        </div>

        <div className="bg-white border border-border-subtle rounded-2xl overflow-hidden">
          <div className="bg-navy text-white px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-cyan-light/90">رقم الطلب</p>
              <p className="font-bold text-lg" dir="ltr">{order.id}</p>
            </div>
            <div className="text-end">
              <p className="text-xs text-cyan-light/90">التاريخ</p>
              <p className="text-sm font-semibold">{dateStr}</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Items */}
            <div>
              <h3 className="text-navy font-bold mb-3 flex items-center gap-2">
                <Package className="h-4 w-4 text-cyan-brand" />
                المنتجات
              </h3>
              <div className="space-y-3">
                {order.items.map((it) => (
                  <div
                    key={`${it.productId}-${it.color}-${it.size}`}
                    className="flex gap-3 items-center bg-surface-alt rounded-xl p-3"
                  >
                    <img src={it.image} alt={it.name} className="h-14 w-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-navy text-sm font-semibold line-clamp-1">{it.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {it.color} · {it.size} · × {it.quantity}
                      </p>
                    </div>
                    <div className="text-navy font-bold text-sm">
                      {formatPrice(it.price * it.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-surface-alt rounded-xl p-4">
                <h4 className="text-navy font-bold text-sm mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-cyan-brand" />
                  العنوان
                </h4>
                <p className="text-sm text-navy font-medium">{order.customer.fullName}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {order.customer.wilayaName} — {order.customer.commune}
                </p>
                {order.customer.address && (
                  <p className="text-xs text-muted-foreground">{order.customer.address}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1" dir="ltr">
                  <Phone className="h-3 w-3" /> {order.customer.phone}
                </p>
              </div>
              <div className="bg-surface-alt rounded-xl p-4">
                <h4 className="text-navy font-bold text-sm mb-2 flex items-center gap-2">
                  <Truck className="h-4 w-4 text-cyan-brand" />
                  التوصيل
                </h4>
                <p className="text-sm text-navy font-medium">
                  {order.customer.deliveryType === "home" ? "توصيل للمنزل" : "توصيل للمكتب"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">الدفع عند الاستلام</p>
                {order.customer.notes && (
                  <p className="text-xs text-muted-foreground mt-2">ملاحظة: {order.customer.notes}</p>
                )}
              </div>
            </div>

            {/* Totals */}
            <div className="border-t border-border-subtle pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-navy">
                <span>المجموع الفرعي</span>
                <span className="font-semibold">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-navy">
                <span>التوصيل</span>
                <span className="font-semibold">{formatPrice(order.shipping)}</span>
              </div>
              <div className="border-t border-border-subtle pt-2 flex justify-between text-navy font-bold text-lg">
                <span>الإجمالي</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-outline-navy">العودة للرئيسية</Link>
          <Link to="/products" className="btn-cyan">متابعة التسوق</Link>
        </div>
      </div>
    </div>
  );
}
