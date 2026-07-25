import { Truck, ShieldCheck, Wallet } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="w-full bg-navy text-white text-[13px]">
      <div className="container-hydora flex items-center justify-center gap-8 py-2">
        <span className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-cyan-brand" />
          توصيل سريع لجميع الولايات
        </span>
        <span className="hidden sm:inline text-white/30">|</span>
        <span className="hidden sm:flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-cyan-brand" />
          1009+ منتج أصلي
        </span>
        <span className="hidden sm:inline text-white/30">|</span>
        <span className="hidden md:flex items-center gap-2">
          <Wallet className="h-4 w-4 text-cyan-brand" />
          الدفع عند الاستلام
        </span>
      </div>
    </div>
  );
}
