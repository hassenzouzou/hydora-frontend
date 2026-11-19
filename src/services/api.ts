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

export interface DeliveryRateItem {
  id: number | string;
  attributes?: {
    wilaya_name: string;
    home_delivery_cost: number;
    desk_delivery_cost: number;
    is_free_delivery: boolean;
    [key: string]: unknown;
  };
  wilaya_name?: string;
  home_delivery_cost?: number;
  desk_delivery_cost?: number;
  is_free_delivery?: boolean;
  [key: string]: unknown;
}

export const getDeliveryRates = () =>
  apiClient("/delivery-rates?pagination[limit]=100&sort=wilaya_name:asc");
export const getCategories = () => apiClient("/categories?populate=*");
export const getProducts = () => apiClient("/products?populate=*");
export const getProduct = (id: string) => apiClient(`/products/${id}?populate=*`);
export const getColors = () => apiClient("/colors");

export const createOrder = (orderData: Record<string, unknown>) => {
  return apiClient("/orders", {
    method: "POST",
    body: JSON.stringify({ data: orderData }),
  });
};
