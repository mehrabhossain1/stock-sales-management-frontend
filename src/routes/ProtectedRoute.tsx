import { Navigate } from "react-router-dom";
import { useAuth } from "@/store/auth-store";

interface ProtectedRouteProps {
    allowedRoles: ("admin" | "manager" | "user")[];
    children: React.ReactNode;
}

export function ProtectedRoute({
    allowedRoles,
    children,
}: ProtectedRouteProps) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return (
            <div className="text-red-500 font-semibold p-4">
                Unauthorized Role
            </div>
        );
    }

    return <>{children}</>;
}
