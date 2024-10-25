/**
 * Componente que redirecciona al usuario invitado (cuando
 * no está autenticado): Login, Signup
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../shared/hooks/useAuth.jsx";
import {useUserData} from "../shared/hooks/useUserData.jsx";

export function UserGuestRoutes() {

    const { isAuthenticated } = useAuth();
    const { user } = useUserData();

    if ( isAuthenticated && user.role !== 'ADMIN' ) {
        return <Navigate to="/" replace />;
    }

    if ( user.role === 'ADMIN' ) {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
}