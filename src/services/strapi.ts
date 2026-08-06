import { createServerFn } from "@tanstack/react-start";

export const fetchProducts = createServerFn({ method: "GET" }).handler(async () => {
  const token = process.env.STRAPI_API_TOKEN;
  const apiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";

  const response = await fetch(`${apiUrl}/api/products?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products from Strapi");
  }

  const data = await response.json();
  return data;
});

export const fetchProductById = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const token = process.env.STRAPI_API_TOKEN;
    const apiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";

    // 1. استخدام filters لتجاوز مشكلة الصلاحيات
    const response = await fetch(`${apiUrl}/api/products?filters[id][$eq]=${id}&populate=*`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return null;

    const result = await response.json();
    if (!result.data || result.data.length === 0) return null;

    const item = result.data[0];

    // 2. تسطيح البيانات لتتوافق مع ما تتوقعه مكونات الواجهة
    return item.attributes ? { id: item.id, ...item.attributes } : item;
  });
