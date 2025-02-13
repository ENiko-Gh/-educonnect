import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

interface ProtectedRouteProps {
    requiredRole: string;
    children: React.ReactNode; // Usamos React.ReactNode para ser más flexible
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole, children }) => {
    const user = getCurrentUser();

    // Comprobamos si no hay usuario o si el usuario no tiene el rol adecuado
    if (!user) {
        // Si no hay usuario, redirigimos a login
        return <Navigate to="/login" replace />;
    }

    if (user.role !== requiredRole) {
        // Si el usuario no tiene el rol requerido, redirigimos a una página de acceso denegado o login
        return <Navigate to="/login" replace />;
    }

    // Si todo es correcto, mostramos los children
    return <>{children}</>;
};

export default ProtectedRoute;
