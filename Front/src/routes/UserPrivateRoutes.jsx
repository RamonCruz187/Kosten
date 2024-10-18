/**
 * Componente que redirecciona al usuario autenticado (dado de alta y logueado)
 * a sus respectivas rutas: Mi Cuenta, Mis Peliculas, Administracion (si es admin)
 * y Logout.
 */

import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "../shared/hooks/useAuth.jsx";

export function UserPrivateRoutes() {

    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to={`/login`}/>;
}