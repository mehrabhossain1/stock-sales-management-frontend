/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { api } from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/store/auth-store";

interface RevenueDataItem {
    month: string;
    revenue: number;
}

export function RevenueBarChart() {
    const { user } = useAuth();
    const [data, setData] = useState<RevenueDataItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRevenueData() {
            try {
                const res = await api.get("/sales");
                const sales = res.data.sales;

                // Filter if manager
                const filteredSales =
                    user?.role === "manager"
                        ? sales.filter(
                              (sale: any) => sale.soldBy?._id === user?.id
                          )
                        : sales;

                const revenueMap: { [month: string]: number } = {};

                filteredSales.forEach((sale: any) => {
                    const date = new Date(sale.saleDate);
                    const month = date.toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                    });
                    revenueMap[month] =
                        (revenueMap[month] || 0) + sale.paidAmount;
                });

                const chartData: RevenueDataItem[] = Object.entries(
                    revenueMap
                ).map(([month, revenue]) => ({ month, revenue }));

                // Sort by date
                chartData.sort(
                    (a, b) =>
                        new Date(a.month).getTime() -
                        new Date(b.month).getTime()
                );

                setData(chartData);
            } catch (err) {
                console.error("Failed to fetch chart data", err);
            } finally {
                setLoading(false);
            }
        }

        fetchRevenueData();
    }, [user]);

    if (loading) return <div>Loading chart...</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Monthly Revenue Chart
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                            formatter={(value: number) =>
                                `৳${value.toLocaleString()}`
                            }
                        />
                        <Bar
                            dataKey="revenue"
                            fill="#4f46e5"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
