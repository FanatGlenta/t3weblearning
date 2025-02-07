import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  fetchCart: (userId?: string) => Promise<void>;
  addToCart: (userId: string, product: CartItem) => Promise<void>;
  removeFromCart: (userId: string, id: number) => Promise<void>;
  updateQuantity: (
    userId: string,
    id: number,
    quantity: number,
  ) => Promise<void>;
  clearCart: (userId: string) => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],

      fetchCart: async (userId) => {
        if (!userId) return;
        const response = await fetch(`/api/shop/cart?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          set({ cart: data });
        }
      },

      addToCart: async (userId, product) => {
        if (!userId || !product) return;
        await fetch("/api/shop/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            productId: product.id,
            quantity: product.quantity,
          }),
        });

        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id,
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + product.quantity }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, product] };
        });
      },

      removeFromCart: async (userId, id) => {
        if (!userId || !id) return;
        await fetch(`/api/shop/cart?userId=${userId}&productId=${id}`, {
          method: "DELETE",
        });

        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: async (userId, id, quantity) => {
        if (!userId || !id || !quantity) return;
        await fetch("/api/shop/cart", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, productId: id, quantity }),
        });

        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: quantity } : item,
          ),
        }));
      },

      clearCart: async (userId) => {
        if (!userId) return;
        await fetch(`/api/shop/cart?userId=${userId}`, {
          method: "DELETE",
        });

        set({ cart: [] });
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
