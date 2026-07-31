import { Link } from "@tanstack/react-router";
import { ShoppingCart, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useCartStore } from "@/store/cart-store";
import { useCategories } from "@/hooks/use-api";

interface Category {
  id: string | number;
  name?: string;
  slug?: string;
  [key: string]: unknown;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const totalItems = useCartStore((s) => s.getTotalItems());
  const openDrawer = useCartStore((s) => s.openDrawer);

  const { data: categories } = useCategories();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border-subtle">
      <div className="container-hydora flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg hover:bg-cyan-light text-navy"
          >
            <Menu className="h-5 w-5" />
          </button>
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-navy">
            <Link
              to="/"
              className="hover:text-cyan-brand transition-colors"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-cyan-brand" }}
            >
              الرئيسية
            </Link>
            <Link
              to="/products"
              className="hover:text-cyan-brand transition-colors"
              activeProps={{ className: "text-cyan-brand" }}
            >
              المنتجات
            </Link>

            {/* ✅ 3. قسم التصنيفات مع تصميم الدروب داون المُحسن */}
            <li className="relative group list-none">
              {/* أضفنا py-4 هنا لزيادة مساحة الالتقاط ومنع اختفاء القائمة بسرعة */}
              <button className="inline-flex items-center gap-1 hover:text-cyan-brand transition-colors py-4">
                التصنيفات
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {/* الحاوية الرئيسية للدروب داون */}
              <div className="absolute top-[85%] inset-s-0 rtl:inset-s-auto rtl:inset-e-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(21,37,88,0.15)] border border-border-subtle p-3 min-w-65 flex flex-col gap-1">
                  {categories?.map((c: Category) => {
                    const catName = c.name || "قسم";
                    const catSlug = c.slug || "";

                    return (
                      <Link
                        key={c.id}
                        to="/products"
                        search={{ category: catSlug }}
                        className="block px-4 py-2.5 rounded-xl hover:bg-surface-alt text-navy font-semibold text-[14px] transition-all hover:translate-x-1 rtl:hover:-translate-x-1 hover:text-cyan-brand"
                      >
                        {catName}
                      </Link>
                    );
                  })}

                  {categories && categories.length > 0 && (
                    <>
                      <div className="h-px bg-border-subtle my-2 mx-2"></div>
                      <Link
                        to="/products"
                        className="block px-3 py-2.5 rounded-xl hover:bg-cyan-brand/10 text-cyan-brand text-sm font-bold text-center transition-colors"
                      >
                        عرض جميع المنتجات
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </li>

            <Link
              to="/about"
              className="hover:text-cyan-brand transition-colors"
              activeProps={{ className: "text-cyan-brand" }}
            >
              من نحن
            </Link>
            <Link
              to="/contact"
              className="hover:text-cyan-brand transition-colors"
              activeProps={{ className: "text-cyan-brand" }}
            >
              تواصل معنا
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Logo />
          <button
            onClick={openDrawer}
            aria-label="السلة"
            className="relative p-2 rounded-lg hover:bg-cyan-light text-navy transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -inset-e-1 bg-cyan-brand text-white text-[10px] font-bold rounded-full min-w-4.5 h-4.5 px-1 flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border-subtle bg-white">
          <ul className="container-hydora flex flex-col py-3">
            <li>
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-navy hover:text-cyan-brand text-[15px] font-medium"
              >
                الرئيسية
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-navy hover:text-cyan-brand text-[15px] font-medium"
              >
                المنتجات
              </Link>
            </li>
            <li>
              <button
                onClick={() => setMobileCatsOpen((v) => !v)}
                className="w-full flex items-center justify-between py-3 text-navy hover:text-cyan-brand text-[15px] font-medium"
              >
                التصنيفات
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileCatsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileCatsOpen && (
                <ul className="ps-4 pb-2 space-y-1">
                  {categories?.map((c: Category) => (
                    <li key={c.id}>
                      <Link
                        to="/products"
                        search={{ category: c.slug || "" }}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-sm text-navy/80 hover:text-cyan-brand"
                      >
                        {c.name || "قسم"}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-navy hover:text-cyan-brand text-[15px] font-medium"
              >
                من نحن
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-navy hover:text-cyan-brand text-[15px] font-medium"
              >
                تواصل معنا
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
