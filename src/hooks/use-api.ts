import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts, getProduct, getColors, getSizes } from "../services/api";

// ✅ 1. إنشاء واجهة تصف شكل المنتج القادم من Strapi للتخلص من any
interface StrapiProduct {
  id: string | number;
  documentId?: string;
  [key: string]: unknown;
}

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategories();
      return response.data;
    },
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await getProducts();
      return response.data;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      // 1. نستدعي دالة جلب كل المنتجات (React Query سيجلبها من الكاش ولن يبطئ التطبيق)
      const response = await getProducts();
      const allProducts = response.data;

      // ✅ 2. استخدام الواجهة الجديدة StrapiProduct بدلاً من any
      const exactProduct = allProducts.find(
        (p: StrapiProduct) => String(p.id) === String(id) || String(p.documentId) === String(id),
      );

      // 3. إذا لم يجده، نرمي خطأ لكي تظهر صفحة "المنتج غير موجود"
      if (!exactProduct) {
        throw new Error("المنتج غير موجود");
      }

      return exactProduct;
    },
    enabled: !!id,
  });
};

export const useColors = () => {
  return useQuery({
    queryKey: ["colors"],
    queryFn: async () => {
      const response = await getColors();
      return response.data;
    },
  });
};

export const useSizes = () => {
  return useQuery({
    queryKey: ["sizes"],
    queryFn: async () => {
      const response = await getSizes();
      return response.data;
    },
  });
};
