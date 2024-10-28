/**
 * Componente que redirecciona al usuario autenticado (dado de alta y logueado)
 * a sus respectivas rutas: Administracion (si es admin)
 * y Logout.
 */

import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "../shared/hooks/useAuth.jsx";
import {AdminLayout} from "../modules/admin/layout/AdminLayout.jsx";
import {useUserData} from "../shared/hooks/useUserData.jsx";
import {useEffect} from "react";

export function UserAdminPrivateRoutes() {

    const { isAuthenticated } = useAuth();
    const { user } = useUserData();

    if ( !isAuthenticated ) {
        return <Navigate to="/login" replace />;
    }

    if ( user.role !== 'ADMIN' ) {
        return <Navigate to="/" replace />;
    }

    return <AdminLayout />;

}