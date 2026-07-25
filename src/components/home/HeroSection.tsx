import { Link } from "@tanstack/react-router";
import { Snowflake, Flame, ShieldCheck, Droplets, Sparkles, ArrowLeft } from "lucide-react";
import { mockProducts } from "@/lib/mock-data";

export function HeroSection() {
  const bottles = mockProducts.slice(0, 4);
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-surface-hero to-white">
      <div className="container-hydora grid grid-cols-1 lg:grid-cols-5 gap-10 items-center py-16 lg:py-24 min-h-[75vh]">
        {/* Text — RTL: appears on the right */}
        <div className="lg:col-span-3 space-y-6 text-center lg:text-start">
          {/* <span className="inline-flex items-center gap-2 bg-cyan-light text-navy px-4 py-1.5 rounded-full text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-cyan-brand" />
            الأفضل مبيعاً في الجزائر
          </span> */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] text-navy">
            ترطيب يدوم
            <span className="block mt-4 text-navy">معك أينما ذهبت</span>
          </h1>
          <p className="text-navy/70 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
            قوارير حرارية عالية الجودة تصميم أنيق وأداء استثنائي، للحياة اليومية والرحلات والرياضة.
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <Link to="/products" className="btn-cyan">
              تسوق الآن
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <a href="#best-sellers" className="btn-outline-navy">
              اكتشف المجموعة
            </a>
          </div>

          {/* Feature badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-2xl mx-auto lg:mx-0">
            {[
              { icon: Snowflake, label: "24H بارد" },
              { icon: Flame, label: "12H ساخن" },
              { icon: ShieldCheck, label: "BPA Free" },
              { icon: Droplets, label: "مانع للتسرب" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2 bg-white rounded-xl shadow-sm px-3 py-3 border border-border-subtle"
              >
                <f.icon className="h-5 w-5 text-cyan-brand shrink-0" />
                <span className="text-navy text-[13px] font-semibold">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottles — LTR side */}
        <div className="lg:col-span-2 relative h-380px lg:h-520px hidden md:block">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-72 h-72 bg-cyan-light rounded-full blur-3xl opacity-60" />
          </div>
          {bottles.map((b, i) => {
            const positions = [
              "top-4 start-8 w-40 h-52 rotate-[-6deg] z-20",
              "top-16 end-4 w-36 h-48 rotate-[8deg] z-10",
              "bottom-8 start-0 w-32 h-44 rotate-[10deg] z-30",
              "bottom-0 end-14 w-44 h-56 rotate-[-4deg] z-10",
            ];
            return (
              <div
                key={b.id}
                className={`absolute ${positions[i]} rounded-3xl overflow-hidden bg-white shadow-[0_20px_50px_-15px_rgba(21,37,88,0.35)]`}
              >
                <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>

        {/* Mobile single hero bottle */}
        <div className="md:hidden mx-auto w-56 h-72 rounded-3xl overflow-hidden bg-white shadow-brand-md">
          <img
            src={bottles[0].image}
            alt={bottles[0].name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
