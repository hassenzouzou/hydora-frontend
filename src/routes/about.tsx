import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Award, Leaf, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن — HYDORA" },
      {
        name: "description",
        content:
          "تعرّف على HYDORA — علامة جزائرية متخصصة في القوارير الحرارية عالية الجودة، رسالتنا، قيمنا، وقصتنا.",
      },
      { property: "og:title", content: "من نحن — HYDORA" },
      {
        property: "og:description",
        content: "قصة HYDORA ورسالتنا في تقديم قوارير ترطيب استثنائية للسوق الجزائري.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://hydora.dz/about" },
      { property: "og:image", content: "https://hydora.dz/og-img.png" },
      { property: "og:site_name", content: "HYDORA" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@hydora" },
      { name: "twitter:creator", content: "@hydora" },
      { name: "twitter:title", content: "من نحن — HYDORA" },
      {
        name: "twitter:description",
        content: "قصة HYDORA ورسالتنا في تقديم قوارير ترطيب استثنائية للسوق الجزائري.",
      },
      { name: "twitter:image", content: "https://hydora.dz/og-img.png" },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Award,
    title: "جودة عالية",
    text: "ستانلس ستيل مزدوج الجدار، معايير صارمة في كل قارورة نصنعها.",
  },
  { icon: Leaf, title: "صديقة للبيئة", text: "قلل استخدام البلاستيك واحمل قارورتك أينما ذهبت." },
  { icon: Droplets, title: "ترطيب يدوم", text: "برودة تصل إلى 24 ساعة وحرارة تدوم 12 ساعة." },
  {
    icon: Users,
    title: "قريبون منك",
    text: "خدمة عملاء جزائرية، توصيل لجميع الولايات، دفع عند الاستلام.",
  },
];

function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-cyan-light to-white py-20">
        <div className="container-hydora text-center max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-white text-cyan-brand text-xs font-bold rounded-full mb-4">
            من نحن
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy leading-tight">
            HYDORA — ترطيب يليق بيومك
          </h1>
          <p className="mt-5 text-navy/70 text-lg leading-relaxed">
            علامة جزائرية شابة تؤمن أن الترطيب اليومي يستحق قارورة أنيقة، عملية، ومصممة لتدوم. من
            قلب الجزائر إلى كل ولاية.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="container-hydora py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="section-title-underline text-2xl md:text-3xl">قصتنا</h2>
          <div className="mt-6 space-y-4 text-navy/80 leading-relaxed">
            <p>
              بدأت HYDORA من فكرة بسيطة: لماذا لا تتوفر قوارير حرارية عالية الجودة بأسعار عادلة في
              السوق الجزائري؟ فقررنا أن نجيب بأنفسنا.
            </p>
            <p>
              اليوم، نقدم مجموعة متكاملة من القوارير الحرارية والرياضية والمكتبية، مصممة خصيصاً
              لتتحمل الاستخدام اليومي وتحافظ على مشروبك بالدرجة المثالية.
            </p>
            <p>
              نؤمن أن كل رشفة ماء تستحق أن تكون بنفس النقاء والانتعاش الذي أخذتها به من أول لحظة.
            </p>
          </div>
        </div>
        <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-surface-alt">
          <img
            src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=80"
            alt="HYDORA"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-alt py-16">
        <div className="container-hydora">
          <div className="text-center mb-10">
            <h2 className="section-title-underline text-2xl md:text-3xl">قيمنا</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-light text-cyan-brand mb-3">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="text-navy font-bold mb-1">{v.title}</h3>
                <p className="text-sm text-navy/70 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-hydora py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy">جاهز لاكتشاف مجموعتنا؟</h2>
        <p className="mt-3 text-navy/70">تصفّح كل القوارير واختر ما يناسب أسلوب حياتك.</p>
        <Link to="/products" className="btn-cyan inline-block mt-6">
          تصفح المنتجات
        </Link>
      </section>
    </div>
  );
}
