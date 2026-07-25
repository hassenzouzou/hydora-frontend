import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import type { MockProduct } from "@/lib/mock-data";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

export function ProductCard({ product }: { product: MockProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.is_available) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      color: product.colors[0],
      size: product.sizes[0],
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
      {/* Badges */}
      <div className="absolute top-3 inset-x-3 z-10 flex items-start justify-between gap-2 pointer-events-none">
        <span
          className={`text-[11px] font-bold px-2 py-1 rounded-full ${
            product.is_available ? "bg-cyan-light text-navy" : "bg-red-100 text-red-600"
          }`}
        >
          {product.is_available ? "متوفر" : "نفد المخزون"}
        </span>
        <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-white/90 backdrop-blur text-navy border border-border-subtle">
          {product.category}
        </span>
      </div>

      <div
        className={`aspect-square bg-surface-alt overflow-hidden ${
          !product.is_available ? "grayscale" : ""
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 pb-14 flex flex-col gap-2 flex-1">
        <h3 className="text-navy font-semibold text-[15px] line-clamp-2 leading-snug min-h-[42px]">
          {product.name}
        </h3>
        <div className="text-navy font-bold text-lg mt-auto">{formatPrice(product.price)}</div>
      </div>

      <button
        onClick={handleQuickAdd}
        disabled={!product.is_available}
        aria-label="أضف للسلة"
        className="absolute bottom-3 end-3 bg-cyan-brand hover:bg-cyan-dark disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full p-2.5 shadow-lg transition-all hover:scale-110"
      >
        <ShoppingCart className="h-4 w-4" />
      </button>
    </Link>
  );
}
