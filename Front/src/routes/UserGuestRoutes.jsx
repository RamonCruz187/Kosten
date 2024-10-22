/**
 * Componente que redirecciona al usuario invitado (cuando
 * no está autenticado): Login, Signup
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../shared/hooks/useAuth.jsx";

export function UserGuestRoutes() {

    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to={'/admin'}/> : <Outlet />;
}