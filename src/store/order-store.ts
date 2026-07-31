import { create } from "zustand";
import type { CartItem } from "./cart-store";

export type PlacedOrder = {
  id: string;
  createdAt: string;
  items: CartItem[];
  customer: {
    fullName: string;
    phone: string;
    wilayaCode: number;
    wilayaName: string;
    commune: string;
    deliveryType: "home" | "stopdesk";
  };
  subtotal: number;
  shipping: number;
  total: number;
};

type OrderStore = {
  lastOrder: PlacedOrder | null;
  setLastOrder: (o: PlacedOrder) => void;
  clearLastOrder: () => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  lastOrder: null,
  setLastOrder: (o) => set({ lastOrder: o }),
  clearLastOrder: () => set({ lastOrder: null }),
}));
