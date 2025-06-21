import { useManagerStats } from "@/hooks/useManagerStats";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { DollarSign, BarChart3, ShoppingCart } from "lucide-react";

export function ManagerDashboard() {
    const {
        totalRevenue,
        totalProducts,
        totalSales,
        recentActivities,
        loading,
    } = useManagerStats();

    // if (totalRevenue === 0 && totalProducts === 0 && totalSales === 0) {
    //     return (
    //         <div className="text-center text-muted-foreground">
    //             No data available. Start adding products and sales!
    //         </div>
    //     );
    // }

    if (loading) return <div>Loading manager stats...</div>;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">
                    Manager Dashboard
                </h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-gradient-to-r from-violet-500 to-violet-600 text-white">
                    <CardHeader className="flex flex-row justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Your Revenue
                        </CardTitle>
                        <DollarSign className="h-5 w-5 opacity-80" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            ৳{totalRevenue.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardHeader className="flex flex-row justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Your Products
                        </CardTitle>
                        <BarChart3 className="h-5 w-5 opacity-80" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">
                            {totalProducts}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardHeader className="flex flex-row justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Your Sales
                        </CardTitle>
                        <ShoppingCart className="h-5 w-5 opacity-80" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{totalSales}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                        Recent Activity
                    </CardTitle>
                    <CardDescription>
                        Your latest products and sales
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {recentActivities.map((act, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 border rounded-md p-4 hover:bg-muted transition"
                        >
                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                {i + 1}
                            </div>
                            <div className="flex-1 text-sm">{act}</div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                                {new Date().toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
