import { Link } from "@tanstack/react-router";
import { Phone, Mail, Instagram, Facebook, Send } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white mt-24">
      <div className="container-hydora grid grid-cols-1 md:grid-cols-3 gap-10 py-14">
        {/* Brand */}
        <div className="space-y-4">
          <Logo onDark />
          <p className="text-sm text-white/70 leading-relaxed">
            HYDORA - قوارير حرارية عالية الجودة للترطيب أينما ذهبت. تصميم أنيق وأداء استثنائي للحياة
            اليومية والرياضية.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link to="/" className="hover:text-cyan-brand transition-colors">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-cyan-brand transition-colors">
                المنتجات
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-cyan-brand transition-colors">
                من نحن
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cyan-brand transition-colors">
                تواصل معنا
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-4">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-cyan-brand shrink-0" />
              <a href="tel:0555123456" className="hover:text-cyan-brand transition-colors">
                0555 12 34 56
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyan-brand shrink-0" />
              <a
                href="mailto:contact@hydora.dz"
                className="hover:text-cyan-brand transition-colors"
              >
                contact@hydora.dz
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-3 mt-5">
            <a
              href="#"
              aria-label="Instagram"
              className="p-2 rounded-full bg-white/10 hover:bg-cyan-brand transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="p-2 rounded-full bg-white/10 hover:bg-cyan-brand transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="p-2 rounded-full bg-white/10 hover:bg-cyan-brand transition-colors"
            >
              <Send className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-hydora flex flex-col md:flex-row items-center justify-between gap-3 py-5 text-xs text-white/60">
          <p>© {year} HYDORA - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
