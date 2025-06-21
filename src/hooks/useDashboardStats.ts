import { useEffect, useState } from "react";

import { useAuth } from "@/store/auth-store";
import { api } from "@/lib/axios";

export function useDashboardStats() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalSales: 0,
        totalProducts: 0,
        recentActivities: [] as string[],
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const [productsRes, salesRes] = await Promise.all([
                    api.get("/products"),
                    api.get("/sales"),
                ]);

                const products = productsRes.data.products;
                const sales = salesRes.data.sales;
                console.log(productsRes.data.products, salesRes.data.sales);

                const totalRevenue = sales.reduce(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (acc: number, sale: any) => acc + sale.paidAmount,
                    0
                );

                const recentActivities = [...sales, ...products]
                    .sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                    .slice(0, 5)
                    .map((item) =>
                        item.product
                            ? `Sold ${item.product.name} - ৳${item.paidAmount} (Qty: ${item.quantity})`
                            : `Created Product - ${item.name} (Qty: ${item.quantity})`
                    );

                setStats({
                    totalRevenue,
                    totalSales: sales.length,
                    totalProducts: products.length,
                    recentActivities,
                });

                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            }
        }

        fetchData();
    }, [user?.token]);

    return { ...stats, loading };
}
