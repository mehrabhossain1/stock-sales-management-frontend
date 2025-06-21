"use client";

import {
    BarChart3,
    DollarSign,
    Plus,
    Search,
    Pencil,
    Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useStockStore } from "@/store/stockStore";
import { useAuth } from "@/store/auth-store";
import { StockForm } from "@/components/forms/NewStockForm";

export function StockPage() {
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";

    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<string | null>(null);
    const [editFields, setEditFields] = useState<{
        name: string;
        quantity: number;
        price: number;
    }>({
        name: "",
        quantity: 0,
        price: 0,
    });

    const { stocks, fetchStocks, loading, error, updateStock, deleteStock } =
        useStockStore();

    useEffect(() => {
        fetchStocks();
    }, [fetchStocks]);

    // Sort and filter
    const sortedAndFilteredItems = [...stocks]
        .sort(
            (a, b) =>
                new Date(b.createdAt ?? "").getTime() -
                new Date(a.createdAt ?? "").getTime()
        )
        .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const totalStockItems = stocks.reduce(
        (total, item) => total + item.quantity,
        0
    );
    const totalInventoryValue = stocks.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );

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

    // Edit logic
    const handleEditClick = (item: (typeof stocks)[0]) => {
        setEditingItem(item._id!);
        setEditFields({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
        });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFields((prev) => ({
            ...prev,
            [name]: name === "name" ? value : Number(value),
        }));
    };

    const handleEditSave = async (id: string) => {
        await updateStock(id, editFields);
        setEditingItem(null);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await deleteStock(id);
        }
    };

    if (loading) return <p>Loading stocks...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight">
                    Stock Management
                </h1>
                <Button
                    onClick={() => setShowForm(true)}
                    className="transition "
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Products
                </Button>
            </div>

            {/* Add form can go here if needed */}
            {showForm ? (
                <Card className="shadow-md hover:shadow-lg transition">
                    <CardHeader>
                        <CardTitle>
                            {editingItem ? "Edit Product" : "Add New Product"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <StockForm
                            onBack={() => {
                                setShowForm(false);
                                setEditingItem(null);
                            }}
                            onSubmit={async (values) => {
                                if (editingItem) {
                                    // Update product
                                    await updateStock(editingItem, values);
                                    setEditingItem(null);
                                } else {
                                    // Add new product
                                    await useStockStore
                                        .getState()
                                        .addStock(values);
                                }
                                setShowForm(false);
                            }}
                            editItem={
                                editingItem
                                    ? stocks.find(
                                          (item) => item._id === editingItem
                                      )
                                    : null
                            }
                        />
                    </CardContent>
                </Card>
            ) : (
                <>
                    {/* Summary Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transition">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Stock Items
                                </CardTitle>
                                <BarChart3 className="h-5 w-5 opacity-80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    {totalStockItems}
                                </div>
                                <p className="text-xs text-white/70">
                                    Across {stocks.length} products
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:shadow-lg transition">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Inventory Value
                                </CardTitle>
                                <DollarSign className="h-5 w-5 opacity-80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">
                                    ৳{totalInventoryValue.toFixed(2)}
                                </div>
                                <p className="text-xs text-white/70">
                                    Based on current stock
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Stock Overview */}
                    <Card className="shadow-md hover:shadow-lg transition">
                        <CardHeader>
                            <CardTitle>Stock Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search products..."
                                        className="pl-8"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="rounded-md border overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-muted/60">
                                        <TableRow>
                                            <TableHead className="w-[80px]">
                                                #
                                            </TableHead>
                                            <TableHead>Product Name</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead>Date</TableHead>
                                            {isAdmin && (
                                                <TableHead className="text-right">
                                                    Actions
                                                </TableHead>
                                            )}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedAndFilteredItems.map(
                                            (item, index) => (
                                                <TableRow
                                                    key={item._id}
                                                    className="hover:bg-muted/40 even:bg-muted/10 transition"
                                                >
                                                    <TableCell>
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {editingItem ===
                                                        item._id ? (
                                                            <Input
                                                                name="name"
                                                                value={
                                                                    editFields.name
                                                                }
                                                                onChange={
                                                                    handleEditChange
                                                                }
                                                            />
                                                        ) : (
                                                            item.name
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {editingItem ===
                                                        item._id ? (
                                                            <Input
                                                                name="quantity"
                                                                type="number"
                                                                value={
                                                                    editFields.quantity
                                                                }
                                                                onChange={
                                                                    handleEditChange
                                                                }
                                                            />
                                                        ) : (
                                                            item.quantity
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {editingItem ===
                                                        item._id ? (
                                                            <Input
                                                                name="price"
                                                                type="number"
                                                                value={
                                                                    editFields.price
                                                                }
                                                                onChange={
                                                                    handleEditChange
                                                                }
                                                            />
                                                        ) : (
                                                            <>
                                                                ৳
                                                                {item.price.toFixed(
                                                                    2
                                                                )}
                                                            </>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="font-bold">
                                                        ৳
                                                        {(
                                                            item.quantity *
                                                            item.price
                                                        ).toFixed(2)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatDate(
                                                            item.createdAt
                                                        )}
                                                    </TableCell>
                                                    {isAdmin && (
                                                        <TableCell className="text-right">
                                                            {editingItem ===
                                                            item._id ? (
                                                                <>
                                                                    <Button
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            handleEditSave(
                                                                                item._id!
                                                                            )
                                                                        }
                                                                        className="mr-2"
                                                                    >
                                                                        Save
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        onClick={() =>
                                                                            setEditingItem(
                                                                                null
                                                                            )
                                                                        }
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="h-8 w-8 mr-2"
                                                                        onClick={() =>
                                                                            handleEditClick(
                                                                                item
                                                                            )
                                                                        }
                                                                    >
                                                                        <Pencil className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="outline"
                                                                        size="icon"
                                                                        className="h-8 w-8 text-destructive"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                item._id!
                                                                            )
                                                                        }
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            )
                                        )}
                                        {sortedAndFilteredItems.length ===
                                            0 && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={isAdmin ? 7 : 6}
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
        </div>
    );
}
