import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سلة التسوق — HYDORA" },
      { name: "description", content: "راجع منتجاتك قبل إتمام الطلب." },
      { property: "og:title", content: "سلة التسوق — HYDORA" },
      { property: "og:description", content: "راجع منتجاتك قبل إتمام الطلب." },
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
        content: "راجع منتجاتك قبل إتمام الطلب.",
      },
      { name: "twitter:image", content: "https://hydora.dz/og-img.png" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore((s) => s.getTotalPrice());

  if (items.length === 0) {
    return (
      <div className="container-hydora py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="h-24 w-24 rounded-full bg-cyan-light mx-auto flex items-center justify-center mb-5">
            <ShoppingBag className="h-11 w-11 text-cyan-brand" />
          </div>
          <h1 className="text-2xl font-bold text-navy">سلتك فارغة</h1>
          <p className="text-muted-foreground mt-2 text-sm">أضف منتجات لتظهر هنا.</p>
          <Link to="/products" className="btn-cyan mt-6 inline-flex">
            تصفح المنتجات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-hydora py-8">
      <h1 className="text-3xl font-extrabold text-navy mb-6">سلة التسوق</h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-3">
          {items.map((it) => (
            <div
              key={`${it.productId}-${it.color}-${it.size}`}
              className="bg-white border border-border-subtle rounded-2xl p-4 flex gap-4"
            >
              <img
                src={it.image}
                alt={it.name}
                className="h-28 w-28 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      to="/product/$id"
                      params={{ id: String(it.productId) }}
                      className="text-navy font-semibold hover:text-cyan-brand"
                    >
                      {it.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">
                      {it.color} · {it.size}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(it.productId, it.color, it.size)}
                    aria-label="حذف"
                    className="text-muted-foreground hover:text-destructive p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-auto pt-3">
                  <div className="inline-flex items-center bg-surface-alt rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(it.productId, it.color, it.size, it.quantity - 1)
                      }
                      aria-label="نقص"
                      className="p-2 text-navy hover:text-cyan-brand"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-3 font-semibold text-navy min-w-[2ch] text-center">
                      {it.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(it.productId, it.color, it.size, it.quantity + 1)
                      }
                      aria-label="زيادة"
                      className="p-2 text-navy hover:text-cyan-brand"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-navy font-bold text-lg">
                    {formatPrice(it.price * it.quantity)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={clearCart}
              className="text-sm text-muted-foreground hover:text-destructive"
            >
              مسح السلة
            </button>
            <Link to="/products" className="text-sm text-cyan-brand hover:underline">
              متابعة التسوق
            </Link>
          </div>
        </div>

        {/* Summary */}
        <aside className="bg-surface-alt rounded-2xl p-6 h-fit sticky top-32 space-y-4">
          <h3 className="text-navy font-bold text-lg">ملخص الطلب</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-navy">
              <span>المجموع الفرعي</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>التوصيل</span>
              <span>يُحسب في الدفع</span>
            </div>
            <div className="border-t border-border-subtle pt-3 flex justify-between text-navy font-bold text-lg">
              <span>الإجمالي</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <Link to="/checkout" className="btn-cyan w-full">
            إتمام الطلب
          </Link>
          <p className="text-xs text-muted-foreground text-center">دفع آمن عند الاستلام</p>
        </aside>
      </div>
    </div>
  );
}
