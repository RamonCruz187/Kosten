/**
 * Componente que redirecciona al usuario autenticado (dado de alta y logueado)
 * a sus respectivas rutas: Mi Cuenta, Mis Peliculas, Administracion (si es admin)
 * y Logout.
 */

import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "../shared/hooks/useAuth.jsx";
import {AdminLayout} from "../modules/admin/layout/AdminLayout.jsx";

export function UserPrivateRoutes() {

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <AdminLayout />;

}