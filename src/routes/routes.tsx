import { createBrowserRouter } from "react-router-dom";

// import { RootLayout } from "@/components/layout/RootLayout";
import LoginPage from "@/pages/LoginPage";

import { DashboardPage } from "@/pages/Dashboard";
import { SalesPage } from "@/pages/Sales";
import { StockPage } from "@/pages/Stock";
import { ProtectedRoute } from "./ProtectedRoute";
import { DueSalesPage } from "@/pages/DueSalesPage";
import Homepage from "@/pages/homepage/Homepage";
import { ProductsPage } from "@/pages/productspage/ProductsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
        children: [
            // {
            //     index: true,
            //     element: <Navigate to="/dashboard" replace />,
            // },
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
            {
                path: "stock",
                element: (
                    <ProtectedRoute allowedRoles={["admin", "manager"]}>
                        <StockPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "sales",
                element: (
                    <ProtectedRoute allowedRoles={["admin", "manager"]}>
                        <SalesPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "sales/dues",
                element: (
                    <ProtectedRoute allowedRoles={["admin", "manager"]}>
                        <DueSalesPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/products",
        element: <ProductsPage />,
    },

    {
        path: "/login",
        element: <LoginPage />,
    },
]);
