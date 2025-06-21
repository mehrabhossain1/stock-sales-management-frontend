"use client";

import { useEffect } from "react";
import { useSalesStore } from "@/store/salesStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function DueSalesPage() {
    const { dueSales, loading, error, fetchDueSales } = useSalesStore();

    useEffect(() => {
        fetchDueSales();
    }, [fetchDueSales]);

    if (loading) return <p>Loading due sales...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <Card className="shadow-md hover:shadow-lg transition">
            <CardHeader>
                <CardTitle>Due Sales</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/60">
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Customer Name</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead>Paid</TableHead>
                                <TableHead>Due</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dueSales.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="text-center"
                                    >
                                        No due sales found.
                                    </TableCell>
                                </TableRow>
                            )}
                            {dueSales.map((sale, idx) => (
                                <TableRow key={sale._id}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{sale.customerName}</TableCell>
                                    <TableCell>
                                        {sale.product?.name ?? "-"}
                                    </TableCell>
                                    <TableCell>{sale.quantity}</TableCell>
                                    <TableCell>৳{sale.totalAmount}</TableCell>
                                    <TableCell>৳{sale.paidAmount}</TableCell>
                                    <TableCell className="font-bold text-red-500">
                                        ৳{sale.dueAmount}
                                    </TableCell>
                                    <TableCell>
                                        {sale.saleDate
                                            ? new Date(
                                                  sale.saleDate
                                              ).toLocaleDateString()
                                            : "-"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
