import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Send } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy text-white mt-24">
      <div className="container-hydora grid grid-cols-1 md:grid-cols-3 gap-10 py-14">
        {/* Brand */}
        <div className="space-y-4">
          <Logo onDark />
          <p className="text-sm text-white/70 leading-relaxed">
            HYDORA — قوارير حرارية عالية الجودة للترطيب أينما ذهبت. تصميم أنيق وأداء استثنائي للحياة اليومية والرياضية.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-cyan-brand transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-cyan-brand transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="TikTok" className="p-2 rounded-full bg-white/10 hover:bg-cyan-brand transition-colors">
              <Send className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/" className="hover:text-cyan-brand">الرئيسية</Link></li>
            <li><Link to="/products" className="hover:text-cyan-brand">المنتجات</Link></li>
            <li><a href="#" className="hover:text-cyan-brand">العروض</a></li>
            <li><a href="#" className="hover:text-cyan-brand">وصل حديثاً</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-white font-bold mb-4">مساعدة</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-cyan-brand">أسئلة شائعة</a></li>
            <li><a href="#" className="hover:text-cyan-brand">تتبع الطلب</a></li>
            <li><a href="#" className="hover:text-cyan-brand">شروط والأحكام</a></li>
            <li><a href="#" className="hover:text-cyan-brand">سياسة الإرجاع</a></li>
            <li><Link to="/contact" className="hover:text-cyan-brand">تواصل معنا</Link></li>
            <li><Link to="/about" className="hover:text-cyan-brand">من نحن</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-hydora flex flex-col md:flex-row items-center justify-between gap-3 py-5 text-xs text-white/60">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-white/10 rounded">VISA</span>
            <span className="px-2 py-1 bg-white/10 rounded">Mastercard</span>
            <span className="px-2 py-1 bg-white/10 rounded">Edahabia</span>
          </div>
          <p>© 2025 HYDORA — جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
