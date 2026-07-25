// Mock data for HYDORA storefront — mirrors Strapi API shape.
// Swap `mockProducts` / `mockCategories` for real API calls when backend is wired up.

export type MockCategory = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

export type MockProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  is_available: boolean;
  rating: number;
  image: string;
  category: string;
  categorySlug: string;
  colors: string[];
  sizes: string[];
};

// Reusable product image URLs (Unsplash / picsum placeholders — replace with Strapi CDN later)
const bottleImages = [
  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
  "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=80",
  "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=600&q=80",
  "https://images.unsplash.com/photo-1550505095-81378a674395?w=600&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=600&q=80",
  "https://images.unsplash.com/photo-1555529669-2269763671c0?w=600&q=80",
  "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&q=80",
];

export const mockCategories: MockCategory[] = [
  {
    id: 1,
    name: "قوارير حرارية",
    slug: "thermal",
    image: bottleImages[0],
  },
  {
    id: 2,
    name: "قوارير رياضية",
    slug: "sport",
    image: bottleImages[1],
  },
  {
    id: 3,
    name: "قوارير للأطفال",
    slug: "kids",
    image: bottleImages[3],
  },
  {
    id: 4,
    name: "قوارير مكتبية",
    slug: "office",
    image: bottleImages[5],
  },
];

const colorPool = ["أزرق", "أسود", "أبيض", "أحمر", "رمادي"];
const sizePool = ["350ml", "500ml", "750ml", "1L"];

const productNames = [
  "قارورة حرارية زرقاء كلاسيكية",
  "قارورة رياضية خفيفة الوزن",
  "قارورة أطفال آمنة BPA Free",
  "قارورة مكتبية بمقبض حراري",
  "قارورة سفر مقاومة للصدمات",
  "قارورة معدنية فاخرة",
  "قارورة رياضية بغطاء رياضي",
  "قارورة عائلية سعة كبيرة",
];

export const mockProducts: MockProduct[] = productNames.map((name, i) => ({
  id: i + 1,
  name,
  description:
    "قارورة عالية الجودة، مصنوعة من ستانلس ستيل مزدوج الجدار. تحافظ على البرودة لمدة 24 ساعة والحرارة لمدة 12 ساعة. تصميم أنيق مقاوم للتسرب، مناسبة لجميع الاستخدامات اليومية والرياضية.",
  price: 1500 + i * 350,
  is_available: i !== 5,
  rating: 4 + (i % 3) * 0.3,
  image: bottleImages[i % bottleImages.length],
  category: mockCategories[i % mockCategories.length].name,
  categorySlug: mockCategories[i % mockCategories.length].slug,
  colors: colorPool.slice(0, 3 + (i % 3)),
  sizes: sizePool.slice(0, 2 + (i % 3)),
}));
