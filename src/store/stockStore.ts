/* eslint-disable @typescript-eslint/no-explicit-any */
// store/stockStore.ts
import { api } from "@/lib/axios";
import { create } from "zustand";

export type StockItem = {
    _id?: string;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    description?: string;
    createdAt?: string;
};

type StockStore = {
    stocks: StockItem[];
    loading: boolean;
    error: string | null;
    fetchStocks: () => Promise<void>;
    addStock: (stock: Omit<StockItem, "_id" | "createdAt">) => Promise<void>;
    updateStock: (id: string, stock: Partial<StockItem>) => Promise<void>;
    deleteStock: (id: string) => Promise<void>;
};

export const useStockStore = create<StockStore>((set) => ({
    stocks: [],
    loading: false,
    error: null,

    fetchStocks: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.get("/products");
            set({ stocks: res.data.products, loading: false });
        } catch (err: any) {
            set({
                error:
                    err.response?.data?.message || "Failed to fetch products",
                loading: false,
            });
        }
    },

    addStock: async (stock) => {
        set({ loading: true, error: null });
        try {
            const res = await api.post("/products", stock);
            set((state) => ({
                stocks: [...state.stocks, res.data.product],
                loading: false,
            }));
        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Failed to add product",
                loading: false,
            });
        }
    },

    updateStock: async (id, stock) => {
        set({ loading: true, error: null });
        try {
            const res = await api.put(`/products/${id}`, stock);
            set((state) => ({
                stocks: state.stocks.map((item) =>
                    item._id === id ? res.data.product : item
                ),
                loading: false,
            }));
        } catch (err: any) {
            set({
                error:
                    err.response?.data?.message || "Failed to update product",
                loading: false,
            });
        }
    },

    deleteStock: async (id) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/products/${id}`);
            set((state) => ({
                stocks: state.stocks.filter((item) => item._id !== id),
                loading: false,
            }));
        } catch (err: any) {
            set({
                error:
                    err.response?.data?.message || "Failed to delete product",
                loading: false,
            });
        }
    },
}));
