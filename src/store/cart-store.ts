import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
  size: string;
};

type CartStore = {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, color: string, size: string) => void;
  updateQuantity: (productId: number, color: string, size: string, qty: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

const keyOf = (p: number, c: string, s: string) => `${p}-${c}-${s}`;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      addItem: (item) => {
        const items = [...get().items];
        const idx = items.findIndex(
          (i) => keyOf(i.productId, i.color, i.size) === keyOf(item.productId, item.color, item.size),
        );
        if (idx >= 0) {
          items[idx] = { ...items[idx], quantity: items[idx].quantity + item.quantity };
        } else {
          items.push(item);
        }
        set({ items });
      },
      removeItem: (productId, color, size) =>
        set({
          items: get().items.filter(
            (i) => keyOf(i.productId, i.color, i.size) !== keyOf(productId, color, size),
          ),
        }),
      updateQuantity: (productId, color, size, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, color, size);
          return;
        }
        set({
          items: get().items.map((i) =>
            keyOf(i.productId, i.color, i.size) === keyOf(productId, color, size)
              ? { ...i, quantity: qty }
              : i,
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
      getTotalPrice: () => get().items.reduce((s, i) => s + i.quantity * i.price, 0),
    }),
    { name: "hydora-cart" },
  ),
);
