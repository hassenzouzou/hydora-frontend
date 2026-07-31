const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    // 'Authorization': `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}` // نزع التعليق إذا لزم الأمر
  };

  const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const getCategories = () => apiClient("/categories?populate=*");
export const getProducts = () => apiClient("/products?populate=*");
export const getProduct = (id: string) => apiClient(`/products/${id}?populate=*`);
export const getColors = () => apiClient("/colors");
export const getSizes = () => apiClient("/sizes");
export const getDeliveryRates = () => apiClient("/delivery-rates?pagination[limit]=60");

export const createOrder = (orderData: Record<string, unknown>) => {
  return apiClient("/orders", {
    method: "POST",
    body: JSON.stringify({ data: orderData }),
  });
};
