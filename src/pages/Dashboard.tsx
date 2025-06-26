import { Navigate } from "react-router-dom";
import { useAuth } from "@/store/auth-store";
import { ManagerDashboard } from "./ManagerDashboard";
import { AdminDashboard } from "./AdminDashboard";

export function DashboardPage() {
    const { user } = useAuth();
    console.log("Logged-in user:", user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role === "admin") {
        return <AdminDashboard />;
    }

    if (user.role === "manager") {
        return <ManagerDashboard />;
    }

    return (
        <div>
            <h1 className="text-xl font-bold text-red-600">
                Unauthorized Role
            </h1>
        </div>
    );
}
