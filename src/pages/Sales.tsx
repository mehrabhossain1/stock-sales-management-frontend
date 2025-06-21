/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Calendar,
    Download,
    // Pencil,
    Search,
    ShoppingBag,
    ShoppingCart,
    // Trash2,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SalesForm } from "@/components/forms/SalesForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from "@/components/ui/tooltip";
import { useSalesStore } from "@/store/salesStore";
import { useStockStore } from "@/store/stockStore";

export function SalesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<string | null>(null);

    const {
        sales,
        loading,
        error,
        fetchSales,
        addSale,
        // updateSale,
        // deleteSale,
    } = useSalesStore();

    const { stocks, fetchStocks } = useStockStore();

    useEffect(() => {
        fetchSales();
    }, [fetchSales]);

    useEffect(() => {
        fetchStocks();
    }, [fetchStocks]);

    // Sort items by saleDate (newest first) and filter by search term
    const sortedAndFilteredSales = [...sales]
        .filter((sale) => sale && sale.customerName)
        .sort(
            (a, b) =>
                new Date(b.saleDate ?? b.createdAt ?? "").getTime() -
                new Date(a.saleDate ?? a.createdAt ?? "").getTime()
        )
        .filter(
            (sale) =>
                sale.customerName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                (sale.product?.name ?? "")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );

    const totalSales = sales
        .filter(Boolean)
        .reduce((total, sale) => total + (sale.totalAmount ?? 0), 0);

    const totalProductsSold = sales
        .filter(Boolean)
        .reduce((total, sale) => total + (sale.quantity ?? 0), 0);

    const totalCustomers = new Set(
        sales.filter(Boolean).map((sale) => sale.customerName)
    ).size;

    const handleFormSubmit = async (values: any) => {
        await addSale(values);
        await fetchSales(); // Refresh sales from API
        setShowForm(false);
        setEditingItem(null);
    };

    const handleBackFromForm = () => {
        setShowForm(false);
        setEditingItem(null);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) return <p>Loading sales...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold">Sales Management</h1>
                <Button
                    onClick={() => setShowForm(true)}
                    className="transition "
                >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    New Sale
                </Button>
            </div>

            {showForm ? (
                <Card className="shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <CardTitle>
                            {editingItem ? "Edit Sale" : "New Sale"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SalesForm
                            products={stocks}
                            onBack={handleBackFromForm}
                            onSubmit={handleFormSubmit}
                            // editItem={editingItem}
                        />
                    </CardContent>
                </Card>
            ) : (
                <>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:shadow-lg transition">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Sales
                                </CardTitle>
                                <ShoppingCart className="h-5 w-5 opacity-80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    ৳{totalSales.toFixed(2)}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    +15% from last month
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transition">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Products Sold
                                </CardTitle>
                                <ShoppingBag className="h-5 w-5 opacity-80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {totalProductsSold}
                                </div>
                                <p className="text-xs text-white/70">
                                    Across {sales.length} orders
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md hover:shadow-lg transition">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Customers
                                </CardTitle>
                                <Users className="h-5 w-5 opacity-80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {totalCustomers}
                                </div>
                                <p className="text-xs text-white/70">
                                    Unique customers
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="shadow-md hover:shadow-lg transition">
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search by customer or product..."
                                        className="pl-8"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Filter by Date
                                    </Button>
                                    <Button variant="outline">
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                </div>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader className="bg-muted/60">
                                        <TableRow>
                                            <TableHead className="w-[80px]">
                                                Serial
                                            </TableHead>
                                            <TableHead>Customer Name</TableHead>
                                            <TableHead>Product Name</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Price/Unit</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead>Date</TableHead>
                                            {/* <TableHead className="text-right">
                                                Actions
                                            </TableHead> */}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedAndFilteredSales
                                            .filter(Boolean)
                                            .map((sale, index) => (
                                                <TableRow
                                                    key={sale._id}
                                                    className="hover:bg-muted/40 even:bg-muted/10 transition"
                                                >
                                                    <TableCell>
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {sale.customerName ??
                                                            "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {sale.product?.name ??
                                                            "-"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {sale.quantity}
                                                    </TableCell>
                                                    <TableCell>
                                                        ৳
                                                        {(
                                                            sale.pricePerUnit ??
                                                            0
                                                        ).toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className="font-bold">
                                                        ৳
                                                        {(
                                                            sale.totalAmount ??
                                                            0
                                                        ).toFixed(2)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatDate(
                                                            sale.saleDate ??
                                                                sale.createdAt
                                                        )}
                                                    </TableCell>
                                                    {/* <TableCell className="text-right">
                                                        <TooltipProvider>
                                                            <div className="flex justify-end gap-2">
                                                                <Tooltip>
                                                                    <TooltipTrigger
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="outline"
                                                                            size="icon"
                                                                            className="h-8 w-8"
                                                                            onClick={() =>
                                                                                handleEditClick(
                                                                                    sale._id!
                                                                                )
                                                                            }
                                                                        >
                                                                            <Pencil className="h-4 w-4" />
                                                                            <span className="sr-only">
                                                                                Edit
                                                                            </span>
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>
                                                                            Edit
                                                                            sale
                                                                        </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                                <Tooltip>
                                                                    <TooltipTrigger
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="outline"
                                                                            size="icon"
                                                                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                                            onClick={() =>
                                                                                handleDeleteClick(
                                                                                    sale._id!
                                                                                )
                                                                            }
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                            <span className="sr-only">
                                                                                Delete
                                                                            </span>
                                                                        </Button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>
                                                                            Delete
                                                                            sale
                                                                        </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </div>
                                                        </TooltipProvider>
                                                    </TableCell> */}
                                                </TableRow>
                                            ))}
                                        {sortedAndFilteredSales.length ===
                                            0 && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={7}
                                                    className="h-24 text-center"
                                                >
                                                    No results found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}

            {/* Delete Confirmation Dialog (optional, if you implement delete) */}
            {/* <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this sale record?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}
        </div>
    );
}
