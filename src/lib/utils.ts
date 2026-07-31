// src/lib/utils.ts

// اجلب رابط سترابي من متغيرات البيئة
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

export function getStrapiMedia(url: string | null | undefined) {
  if (!url) return "/logo.PNG"; // صورة افتراضية في حال عدم وجود صورة

  // إذا كان الرابط كاملاً بالفعل (مثلاً لو كنت تستخدم Cloudinary مع Strapi)
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // دمج مسار الخادم مع مسار الصورة
  return `${STRAPI_URL}${url}`;
}
