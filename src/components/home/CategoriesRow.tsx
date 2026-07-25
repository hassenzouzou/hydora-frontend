import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { mockCategories } from "@/lib/mock-data";

export function CategoriesRow() {
  return (
    <section className="bg-white py-16">
      <div className="container-hydora">
        <div className="text-center mb-10">
          <h2 className="section-title-underline text-2xl md:text-3xl">تصفح مجموعاتنا</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {mockCategories.map((c) => (
            <Link
              key={c.id}
              to="/products"
              search={{ category: c.slug }}
              className="card-hydora block overflow-hidden group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-surface-alt">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-navy font-semibold text-[15px]">{c.name}</span>
                <span className="text-cyan-brand text-sm inline-flex items-center gap-1 font-medium">
                  تصفح
                  <ArrowLeft className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
