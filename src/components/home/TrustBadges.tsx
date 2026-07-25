import { ShieldCheck, Truck, Wallet, Headphones } from "lucide-react";

const badges = [
  { icon: ShieldCheck, title: "جودة مضمونة", subtitle: "منتجات عالية الجودة مع ضمان" },
  { icon: Truck, title: "توصيل سريع", subtitle: "توصيل لجميع الولايات" },
  { icon: Wallet, title: "الدفع عند الاستلام", subtitle: "ادفع عند استلام طلبك" },
  { icon: Headphones, title: "خدمة عملاء 7/7", subtitle: "نحن هنا لمساعدتك" },
];

export function TrustBadges() {
  return (
    <section className="bg-white py-14">
      <div className="container-hydora grid grid-cols-2 md:grid-cols-4 gap-6">
        {badges.map((b) => (
          <div key={b.title} className="text-center px-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-light text-cyan-brand mb-3">
              <b.icon className="h-7 w-7" />
            </div>
            <h4 className="text-navy font-bold text-[15px]">{b.title}</h4>
            <p className="text-muted-foreground text-[13px] mt-1">{b.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
