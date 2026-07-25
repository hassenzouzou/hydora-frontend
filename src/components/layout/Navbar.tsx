import { Link } from "@tanstack/react-router";
import { ShoppingCart, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useCartStore } from "@/store/cart-store";
import { mockCategories } from "@/lib/mock-data";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const totalItems = useCartStore((s) => s.getTotalItems());
  const openDrawer = useCartStore((s) => s.openDrawer);

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
            <li className="relative group list-none">
              <button className="inline-flex items-center gap-1 hover:text-cyan-brand transition-colors">
                التصنيفات
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full inset-s-1/2 -translate-x-1/2 rtl:translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-border-subtle p-2 min-w-240px">
                  {mockCategories.map((c) => (
                    <Link
                      key={c.id}
                      to="/products"
                      search={{ category: c.slug }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-cyan-light text-navy text-sm transition-colors"
                    >
                      <img src={c.image} alt="" className="w-9 h-9 rounded-lg object-cover" />
                      <span className="font-medium">{c.name}</span>
                    </Link>
                  ))}
                  <div className="border-t border-border-subtle mt-2 pt-2">
                    <Link
                      to="/products"
                      className="block px-3 py-2 rounded-lg hover:bg-cyan-light text-cyan-brand text-sm font-semibold text-center"
                    >
                      عرض جميع المنتجات
                    </Link>
                  </div>
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
          <Link to="/" aria-label="HYDORA">
            <Logo />
          </Link>
          <button
            onClick={openDrawer}
            aria-label="السلة"
            className="relative p-2 rounded-lg hover:bg-cyan-light text-navy"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -inset-e-0.5 bg-cyan-brand text-white text-[10px] font-bold rounded-full min-w-18px h-18px px-1 flex items-center justify-center">
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
                  {mockCategories.map((c) => (
                    <li key={c.id}>
                      <Link
                        to="/products"
                        search={{ category: c.slug }}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-sm text-navy/80 hover:text-cyan-brand"
                      >
                        {c.name}
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
