import { createServerFn } from "@tanstack/react-start";

// هذه الدالة ستعمل فقط على الخادم ولن يصل كودها للمتصفح
export const fetchProducts = createServerFn({ method: "GET" }).handler(async () => {
  // جلب المتغيرات البيئية بأمان من الخادم
  const token = process.env.STRAPI_API_TOKEN;
  const apiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";

  const response = await fetch(`${apiUrl}/api/products`, {
    // استبدل products بنقطة النهاية المطلوبة
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from Strapi");
  }

  const data = await response.json();
  return data;
});
