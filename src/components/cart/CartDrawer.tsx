import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isDrawerOpen);
  const close = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const total = useCartStore((s) => s.getTotalPrice());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60">
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={close} aria-hidden />
      <aside
        className="absolute inset-y-0 inset-e-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-label="سلة التسوق"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-subtle">
          <h2 className="text-navy font-bold text-lg flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-cyan-brand" />
            سلة التسوق
          </h2>
          <button
            onClick={close}
            aria-label="إغلاق"
            className="p-2 text-navy hover:text-cyan-brand"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="h-20 w-20 rounded-full bg-cyan-light flex items-center justify-center mb-4">
              <ShoppingBag className="h-9 w-9 text-cyan-brand" />
            </div>
            <p className="text-navy font-semibold">سلتك فارغة</p>
            <p className="text-muted-foreground text-sm mt-1 mb-6">ابدأ التسوق لإضافة منتجات.</p>
            <button onClick={close} className="btn-cyan">
              تصفح المنتجات
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((it) => (
                <div
                  key={`${it.productId}-${it.color}-${it.size}`}
                  className="flex gap-3 bg-surface-alt rounded-xl p-3"
                >
                  <img src={it.image} alt={it.name} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-navy font-semibold text-sm line-clamp-2 flex-1">
                        {it.name}
                      </h4>
                      <button
                        onClick={() => removeItem(it.productId, it.color, it.size)}
                        aria-label="حذف"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {it.color} · {it.size}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center bg-white rounded-lg border border-border-subtle">
                        <button
                          onClick={() =>
                            updateQuantity(it.productId, it.color, it.size, it.quantity - 1)
                          }
                          aria-label="نقص"
                          className="p-1.5 text-navy hover:text-cyan-brand"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-3 text-sm font-semibold text-navy">{it.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(it.productId, it.color, it.size, it.quantity + 1)
                          }
                          aria-label="زيادة"
                          className="p-1.5 text-navy hover:text-cyan-brand"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="text-navy font-bold text-sm">
                        {formatPrice(it.price * it.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border-subtle p-5 space-y-3 bg-white">
              <div className="flex items-center justify-between text-navy">
                <span className="text-sm text-muted-foreground">المجموع الفرعي</span>
                <span className="font-bold text-lg">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-muted-foreground">تُحسب تكلفة التوصيل في صفحة الدفع.</p>
              <div className="flex gap-2">
                <Link
                  to="/cart"
                  onClick={close}
                  className="btn-outline-navy flex-1 py-2.5! text-sm"
                >
                  السلة
                </Link>
                <Link to="/checkout" onClick={close} className="btn-cyan flex-1 py-2.5! text-sm">
                  إتمام الطلب
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
