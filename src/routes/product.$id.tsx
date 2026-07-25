import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart, Check, Shield, Truck, RotateCcw } from "lucide-react";
import { mockProducts } from "@/lib/mock-data";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { ProductCard } from "@/components/products/ProductCard";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = mockProducts.find((p) => String(p.id) === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — HYDORA` },
          { name: "description", content: loaderData.product.description.slice(0, 155) },
          { property: "og:title", content: `${loaderData.product.name} — HYDORA` },
          { property: "og:description", content: loaderData.product.description.slice(0, 155) },
          { property: "og:image", content: loaderData.product.image },
          { name: "twitter:image", content: loaderData.product.image },
        ]
      : [{ title: "المنتج غير موجود — HYDORA" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: NotFound,
  errorComponent: ({ error }) => (
    <div className="container-hydora py-20 text-center">
      <p className="text-navy font-semibold">تعذر تحميل المنتج</p>
      <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
    </div>
  ),
  component: ProductDetailPage,
});

function NotFound() {
  return (
    <div className="container-hydora py-20 text-center">
      <h1 className="text-2xl font-bold text-navy">المنتج غير موجود</h1>
      <p className="text-muted-foreground mt-2 text-sm">قد يكون قد تم حذفه أو أن الرابط غير صحيح.</p>
      <Link to="/products" className="btn-cyan mt-6 inline-flex">تصفح المنتجات</Link>
    </div>
  );
}

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);

  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);

  const related = useMemo(
    () =>
      mockProducts
        .filter((p) => p.id !== product.id && p.categorySlug === product.categorySlug)
        .slice(0, 4),
    [product.id, product.categorySlug],
  );

  const handleAdd = () => {
    if (!product.is_available) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
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
        <Link to="/" className="hover:text-cyan-brand">الرئيسية</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-cyan-brand">المنتجات</Link>
        <span>/</span>
        <span className="text-navy font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="bg-surface-alt rounded-2xl overflow-hidden aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3 mt-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-surface-alt rounded-xl overflow-hidden ring-1 ring-border-subtle">
                <img src={product.image} alt="" className="w-full h-full object-cover opacity-90" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-cyan-light text-navy">
            {product.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy mt-3">{product.name}</h1>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-3xl font-extrabold text-navy">{formatPrice(product.price)}</span>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${
                product.is_available ? "bg-cyan-light text-navy" : "bg-red-100 text-red-600"
              }`}
            >
              {product.is_available ? "متوفر" : "نفد المخزون"}
            </span>
          </div>

          <p className="text-muted-foreground text-sm mt-5 leading-relaxed">{product.description}</p>

          {/* Color */}
          <div className="mt-6">
            <label className="text-navy font-semibold text-sm mb-2 block">اللون: <span className="text-muted-foreground font-normal">{color}</span></label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c: string) => (
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

          {/* Size */}
          <div className="mt-5">
            <label className="text-navy font-semibold text-sm mb-2 block">السعة: <span className="text-muted-foreground font-normal">{size}</span></label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s: string) => (
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

          {/* Qty + Add */}
          <div className="mt-6 flex items-stretch gap-3">
            <div className="inline-flex items-center bg-white rounded-xl border-2 border-border-subtle">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 text-navy hover:text-cyan-brand" aria-label="نقص">
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 font-bold text-navy min-w-[2ch] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3 text-navy hover:text-cyan-brand" aria-label="زيادة">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={!product.is_available}
              className="btn-cyan flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-5 w-5" />
              أضف للسلة
            </button>
          </div>

          {/* Trust chips */}
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
            {[
              { icon: Truck, label: "توصيل لكل الولايات" },
              { icon: Shield, label: "دفع عند الاستلام" },
              { icon: RotateCcw, label: "إرجاع خلال 7 أيام" },
              { icon: Check, label: "جودة مضمونة" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 bg-surface-alt rounded-lg px-3 py-2">
                <Icon className="h-4 w-4 text-cyan-brand" />
                <span className="text-navy">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy">منتجات مشابهة</h2>
            <Link to="/products" className="text-sm text-cyan-brand hover:underline">عرض الكل</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
