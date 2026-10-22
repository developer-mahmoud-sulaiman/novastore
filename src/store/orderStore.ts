import { create } from "zustand";
import type { Order } from "../types/order";
import { persist } from "zustand/middleware";

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
  updatedOrderStatus: (id: string, status: Order["status"]) => void;
  clearOrders: () => void;
}

export const useOrdersStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),

      getOrderById: (id) => get().orders.find((o) => o.id === id),

      updatedOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),

      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "novastore-orders",
    },
  ),
);

export const selectOrders = (state: OrderState) => state.orders;
export const selectOrdersCount = (state: OrderState) => state.orders.length;
