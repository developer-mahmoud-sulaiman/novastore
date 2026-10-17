
import { create } from "zustand";
import type { Product } from "../types/Product";
import { persist } from "zustand/middleware";

interface WishlistState {
    items: Product[];
    toggleItem: (product: Product) => void;
    removeItem: (id: number) => void;
    isInWishlist: (id: number) => boolean;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            toggleItem: (product) =>
                set((state) => {
                    const exists = state.items.some(
                        (item) => item.id === product.id
                    );

                    return {
                        items: exists
                            ? state.items.filter(
                                  (item) => item.id !== product.id
                              )
                            : [...state.items, product],
                    };
                }),

            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),

            isInWishlist: (id) =>
                get().items.some((item) => item.id === id),

            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: "novastore-wishlist",
        }
    )
);


export const selectWishlistCount = (state: WishlistState) => state.items.length