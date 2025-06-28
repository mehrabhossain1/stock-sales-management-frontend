// hooks/useProductsQuery.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

type Product = {
    _id: string;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    description: string;
};

type ProductsQueryParams = {
    search?: string;
    page?: number;
    limit?: number;
};

type ProductsResponse = {
    message: string;
    count: number;
    total: number;
    page: number;
    limit: number;
    products: Product[];
};

export const useProductsQuery = ({
    search = "",
    page = 1,
    limit = 8,
}: ProductsQueryParams) => {
    return useQuery<ProductsResponse>({
        queryKey: ["products", search, page, limit],
        queryFn: async () => {
            const res = await api.get("/products", {
                params: { search, page, limit },
            });
            return res.data;
        },
        staleTime: 1000 * 60 * 5, // optional: 5 minutes
    });
};
