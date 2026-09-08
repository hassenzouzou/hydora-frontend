import { create } from "zustand";
import type { CartItem } from "./cart-store";

type PendingPurchaseStore = {
  pendingItem: CartItem | null;
  setPendingItem: (item: CartItem) => void;
  clearPendingItem: () => void;
};

export const usePendingPurchaseStore = create<PendingPurchaseStore>((set) => ({
  pendingItem: null,
  setPendingItem: (item) => set({ pendingItem: item }),
  clearPendingItem: () => set({ pendingItem: null }),
}));
