import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Send,
  MessageCircle,
  Headphones,
  Truck,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا — HYDORA" },
      {
        name: "description",
        content:
          "تواصل مع فريق HYDORA — الهاتف، البريد الإلكتروني، العنوان، وساعات العمل. نحن هنا لخدمتك.",
      },
      { property: "og:title", content: "تواصل معنا — HYDORA" },
      {
        property: "og:description",
        content: "معلومات الاتصال بمتجر HYDORA وخدمة العملاء.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://hydora.dz/contact" },
      { property: "og:image", content: "https://hydora.dz/og-img.png" },
      { property: "og:site_name", content: "HYDORA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@hydora" },
      { name: "twitter:creator", content: "@hydora" },
      { name: "twitter:title", content: "تواصل معنا — HYDORA" },
      {
        name: "twitter:description",
        content: "معلومات الاتصال بمتجر HYDORA وخدمة العملاء.",
      },
      { name: "twitter:image", content: "https://hydora.dz/og-img.png" },
    ],
  }),
  component: ContactPage,
});

const contactCards = [
  {
    icon: Phone,
    title: "الهاتف",
    lines: ["0555 12 34 56", "0770 98 76 54"],
    action: { label: "اتصل الآن", href: "tel:0555123456" },
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    lines: ["contact@hydora.dz", "support@hydora.dz"],
    action: { label: "راسلنا", href: "mailto:contact@hydora.dz" },
  },
  {
    icon: MapPin,
    title: "العنوان",
    lines: ["شارع ديدوش مراد", "الجزائر العاصمة، الجزائر 16000"],
    action: { label: "احصل على الاتجاهات", href: "#" },
  },
  {
    icon: Clock,
    title: "ساعات العمل",
    lines: ["السبت - الخميس: 9:00 - 18:00", "الجمعة: مغلق"],
    action: { label: "نرد خلال 24 ساعة", href: "#" },
  },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Send, label: "TikTok", href: "#" },
];

const promises = [
  {
    icon: Headphones,
    title: "دعم مباشر",
    text: "فريق خدمة عملاء جزائري جاهز للإجابة على استفساراتك.",
  },
  {
    icon: Truck,
    title: "توصيل لكل الولايات",
    text: "نوصل طلباتك إلى باب منزلك في جميع ولايات الجزائر.",
  },
  {
    icon: ShieldCheck,
    title: "ثقة مضمونة",
    text: "منتجات أصلية مع ضمان الجودة وإمكانية الاستبدال.",
  },
];

function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-cyan-light to-white py-20 md:py-24">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-brand/10 blur-3xl" />
        </div>
        <div className="container-hydora relative text-center max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-white text-cyan-brand text-xs font-bold rounded-full mb-4 shadow-brand-sm">
            تواصل معنا
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">
            نحن هنا لخدمتك
          </h1>
          <p className="mt-5 text-navy/70 text-lg leading-relaxed">
            لأي استفسار أو مساعدة، فريق HYDORA جاهز للرد عليك خلال ساعات العمل. اختر الطريقة الأنسب
            للتواصل معنا.
          </p>

          {/* Quick actions */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="tel:0555123456" className="btn-primary" aria-label="اتصل بنا">
              <Phone className="h-4 w-4" />
              اتصل بنا الآن
            </a>
            <a
              href="https://wa.me/213555123456"
              target="_blank"
              rel="noreferrer"
              className="btn-cyan"
              aria-label="تواصل عبر واتساب"
            >
              <MessageCircle className="h-4 w-4" />
              واتساب
            </a>
            <a
              href="mailto:contact@hydora.dz"
              className="btn-outline-navy"
              aria-label="راسلنا عبر البريد"
            >
              <Mail className="h-4 w-4" />
              راسلنا
            </a>
          </div>
        </div>
      </section>

      {/* Contact grid */}
      <section className="container-hydora py-16 md:py-20">
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Info cards */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-5">
              {contactCards.map((card) => (
                <InfoCard key={card.title} {...card} />
              ))}
            </div>
          </div>

          {/* Sidebar: location + social */}
          <aside className="space-y-6">
            <LocationCard />
            <SocialCard />
          </aside>
        </div>
      </section>

      {/* Promise section */}
      <section className="bg-surface-alt py-16 md:py-20">
        <div className="container-hydora max-w-5xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white text-cyan-brand text-xs font-bold rounded-full mb-4 shadow-brand-sm">
            لماذا HYDORA؟
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy">
            نبذل قصارى جهدنا لنكون قريبين منك
          </h2>
          <p className="mt-3 text-navy/70 max-w-2xl mx-auto">
            سواء كنت تبحث عن استفسار، تتبع طلب، أو اقتراح — نحن هنا لنسمعك ونساعدك.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {promises.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl p-6 text-center shadow-brand-sm hover:shadow-brand-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-light text-cyan-brand mb-4">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-navy font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-navy/70 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  lines,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  action: { label: string; href: string };
}) {
  return (
    <div className="group bg-white rounded-2xl p-6 border border-border-subtle shadow-brand-sm hover:shadow-brand-md transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-brand to-cyan-dark text-white inline-flex items-center justify-center shadow-brand-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-navy font-bold text-lg mb-1">{title}</h3>
          {lines.map((line) => (
            <p key={line} className="text-navy/70 text-sm leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-5 pt-5 border-t border-border-subtle">
        <a
          href={action.href}
          className="text-sm font-semibold text-cyan-brand hover:text-cyan-dark transition-colors inline-flex items-center gap-1"
        >
          {action.label}
          <span aria-hidden="true">←</span>
        </a>
      </div>
    </div>
  );
}

function LocationCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-navy text-white p-6">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 220 C80 180, 120 200, 160 170 C200 140, 240 160, 280 130 C320 100, 360 120, 400 90"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 6"
            className="text-cyan-brand"
          />
          <circle cx="160" cy="170" r="6" className="fill-cyan-brand" />
          <circle cx="280" cy="130" r="4" className="fill-white/50" />
          <circle cx="320" cy="110" r="4" className="fill-white/50" />
        </svg>
      </div>
      <div className="relative">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-cyan-brand mb-4">
          <MapPin className="h-5 w-5" />
        </div>
        <h3 className="font-bold text-lg mb-2">موقع المتجر</h3>
        <p className="text-white/80 text-sm leading-relaxed mb-4">
          شارع ديدوش مراد
          <br />
          الجزائر العاصمة، الجزائر 16000
        </p>
        <a
          href="#"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/10 hover:bg-cyan-brand text-white text-sm font-semibold transition-colors"
        >
          <MapPin className="h-4 w-4" />
          عرض الموقع على الخريطة
        </a>
      </div>
    </div>
  );
}

function SocialCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-border-subtle shadow-brand-sm">
      <h3 className="text-navy font-bold text-lg mb-2">تابعنا على</h3>
      <p className="text-navy/70 text-sm leading-relaxed mb-5">
        كن أول من يعرف العروض والمنتجات الجديدة عبر قنواتنا.
      </p>
      <div className="flex items-center gap-3">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="flex-1 flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-surface-alt text-navy hover:bg-cyan-brand hover:text-white transition-colors"
          >
            <social.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{social.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
