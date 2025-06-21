import { createBrowserRouter, Navigate } from "react-router-dom";

import { RootLayout } from "@/components/layout/RootLayout";
import LoginPage from "@/pages/LoginPage";
// import UnauthorizedPage from "@/pages/UnauthorizedPage";
// import ProtectedRoute from "./ProtectedRoute";
// import AdminDashboard from "@/pages/AdminDashboard";
// import ManagerDashboard from "@/pages/ManagerDashboard";

import { DashboardPage } from "@/pages/Dashboard";
import { SalesPage } from "@/pages/Sales";
import { StockPage } from "@/pages/Stock";
import { ProtectedRoute } from "./ProtectedRoute";
import { DueSalesPage } from "@/pages/DueSalesPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
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
        path: "/login",
        element: <LoginPage />,
    },
]);

// export const router = createBrowserRouter([
//     {
//         path: "/login",
//         element: <LoginPage />,
//     },
//     {
//         path: "/unauthorized",
//         element: <UnauthorizedPage />,
//     },
//     {
//         path: "/",
//         element: <RootLayout />,
//         children: [
//             {
//                 index: true,
//                 element: <Navigate to="/dashboard" replace />,
//             },
//             {
//                 element: <ProtectedRoute roles={["admin"]} />,
//                 children: [{ path: "dashboard", element: <AdminDashboard /> }],
//             },
//             {
//                 element: <ProtectedRoute roles={["manager"]} />,
//                 children: [
//                     { path: "dashboard", element: <ManagerDashboard /> },
//                 ],
//             },
//         ],
//     },
// ]);
