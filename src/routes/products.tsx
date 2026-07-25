import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { mockProducts, mockCategories } from "@/lib/mock-data";
import { ProductCard } from "@/components/products/ProductCard";

type SearchParams = {
  category?: string;
  search?: string;
  sort?: string;
};

export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    category: typeof s.category === "string" ? s.category : undefined,
    search: typeof s.search === "string" ? s.search : undefined,
    sort: typeof s.sort === "string" ? s.sort : undefined,
  }),
  head: () => ({
    meta: [
      { title: "المنتجات — HYDORA" },
      { name: "description", content: "تسوق مجموعة HYDORA من القوارير الحرارية عالية الجودة." },
    ],
  }),
  component: ProductsPage,
});

const ALL_SIZES = ["350ml", "500ml", "750ml", "1L"];
const ALL_COLORS = [
  { name: "أزرق", hex: "#00c4e2" },
  { name: "أسود", hex: "#152558" },
  { name: "أبيض", hex: "#ffffff" },
  { name: "أحمر", hex: "#ef4444" },
  { name: "رمادي", hex: "#94a3b8" },
];

function ProductsPage() {
  const { category, search: initialSearch } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [searchQ, setSearchQ] = useState(initialSearch ?? "");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sort, setSort] = useState<"new" | "price_asc" | "price_desc">("new");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...mockProducts];
    if (category) list = list.filter((p) => p.categorySlug === category);
    if (searchQ.trim()) list = list.filter((p) => p.name.includes(searchQ.trim()));
    if (selectedSizes.length) list = list.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    if (selectedColors.length) list = list.filter((p) => p.colors.some((c) => selectedColors.includes(c)));
    if (onlyAvailable) list = list.filter((p) => p.is_available);
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [category, searchQ, selectedSizes, selectedColors, onlyAvailable, sort]);

  const toggle = <T,>(arr: T[], v: T, setter: (a: T[]) => void) =>
    setter(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setOnlyAvailable(false);
    setSearchQ("");
    navigate({ to: "/products", search: {} });
  };

  const FiltersPanel = (
    <div className="space-y-6">
      <div>
        <label className="text-navy font-semibold text-sm mb-2 block">البحث</label>
        <div className="flex items-center bg-white rounded-lg px-3 py-2 border border-border-subtle focus-within:border-cyan-brand">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="ابحث..."
            className="bg-transparent flex-1 outline-none text-sm px-2"
          />
        </div>
      </div>

      <div>
        <label className="text-navy font-semibold text-sm mb-2 block">التصنيف</label>
        <div className="space-y-2">
          <button
            onClick={() => navigate({ to: "/products", search: {} })}
            className={`block w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
              !category ? "bg-cyan-brand text-white" : "hover:bg-white text-navy"
            }`}
          >
            الكل
          </button>
          {mockCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate({ to: "/products", search: { category: c.slug } })}
              className={`block w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
                category === c.slug ? "bg-cyan-brand text-white" : "hover:bg-white text-navy"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-navy font-semibold text-sm mb-2 block">السعة</label>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggle(selectedSizes, s, setSelectedSizes)}
              className={`px-3 py-1.5 rounded-lg text-sm border-2 transition-colors ${
                selectedSizes.includes(s)
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-navy border-border-subtle hover:border-cyan-brand"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-navy font-semibold text-sm mb-2 block">اللون</label>
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => toggle(selectedColors, c.name, setSelectedColors)}
              aria-label={c.name}
              className={`h-9 w-9 rounded-full border-2 transition-all ${
                selectedColors.includes(c.name)
                  ? "ring-2 ring-offset-2 ring-cyan-brand border-white"
                  : "border-white shadow-sm hover:scale-110"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-navy text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={onlyAvailable}
          onChange={(e) => setOnlyAvailable(e.target.checked)}
          className="w-4 h-4 accent-cyan-brand"
        />
        المتوفر فقط
      </label>

      <button onClick={clearFilters} className="btn-outline-navy w-full !py-2 text-sm">
        مسح الفلاتر
      </button>
    </div>
  );

  return (
    <div className="container-hydora py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-navy">المنتجات</h1>
        <p className="text-muted-foreground text-sm mt-1">
          يُعرض {filtered.length} منتج
        </p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block bg-surface-alt rounded-2xl p-5 sticky top-32 self-start max-h-[calc(100vh-8rem)] overflow-auto">
          {FiltersPanel}
        </aside>

        <div>
          {/* Sort bar */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 btn-outline-navy !py-2 !px-4 text-sm"
            >
              <SlidersHorizontal className="h-4 w-4" />
              الفلاتر
            </button>
            <div className="me-auto lg:me-0" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-white border border-border-subtle rounded-lg px-3 py-2 text-sm text-navy focus:outline-none focus:border-cyan-brand"
            >
              <option value="new">الأحدث</option>
              <option value="price_asc">الأرخص</option>
              <option value="price_desc">الأغلى</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-surface-alt rounded-2xl py-20 text-center">
              <p className="text-navy font-semibold text-lg">لا توجد منتجات مطابقة</p>
              <p className="text-muted-foreground text-sm mt-2">جرّب تعديل الفلاتر</p>
              <button onClick={clearFilters} className="btn-cyan mt-6 !py-2 !px-6 text-sm">مسح الفلاتر</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters sheet */}
      {mobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}>
          <div
            className="absolute inset-y-0 end-0 w-[85%] max-w-sm bg-white p-5 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-navy font-bold">الفلاتر</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2 text-navy">
                <X className="h-5 w-5" />
              </button>
            </div>
            {FiltersPanel}
          </div>
        </div>
      )}
    </div>
  );
}
