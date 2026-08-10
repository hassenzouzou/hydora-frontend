import { Link } from "@tanstack/react-router";
import { Snowflake, Flame, ShieldCheck, Droplets, ArrowLeft } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-cover bg-no-repeat bg-position-[center_25%] bg-[url('/hero-bg-mobile.png')] lg:bg-center lg:bg-[url('/hero-bg.png')] min-h-[85vh] sm:min-h-[90vh] lg:h-224.5 w-full max-w-[1862px] mx-auto flex items-center">
      <div className="container-hydora py-12 sm:py-16 lg:py-24 w-full">
        {/* النص */}
        <div className="space-y-5 sm:space-y-6 text-center lg:text-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.2] sm:leading-[1.15] text-navy">
            ترطيب يدوم
            <span className="block mt-3 sm:mt-4 text-navy">معك أينما ذهبت</span>
          </h1>
          <p className="text-navy/70 text-sm sm:text-base md:text-lg max-w-md sm:max-w-xl mx-auto lg:mx-0 leading-relaxed">
            قوارير حرارية عالية الجودة تصميم أنيق وأداء استثنائي، للحياة اليومية والرحلات والرياضة.
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
            <Link to="/products" className="btn-cyan text-sm sm:text-base">
              تسوق الآن
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-5 sm:pt-6 max-w-xs sm:max-w-2xl mx-auto lg:mx-0">
            {[
              { icon: Snowflake, label: "24H بارد" },
              { icon: Flame, label: "12H ساخن" },
              { icon: ShieldCheck, label: "BPA Free" },
              { icon: Droplets, label: "مانع للتسرب" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-sm px-2 sm:px-3 py-2.5 sm:py-3 border border-border-subtle"
              >
                <f.icon className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-brand shrink-0" />
                <span className="text-navy text-xs sm:text-[13px] font-semibold whitespace-nowrap">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
