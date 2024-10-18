/**
 * Componente que redirecciona al usuario invitado (cuando
 * no está autenticado): Login, Signup
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuthLogin } from "../shared/hooks/useAuthLogin.jsx";

export function UserGuestRoutes() {

    const { isAuthenticated } = useAuthLogin();

    return isAuthenticated ? <Navigate to={'/admin'}/> : <Outlet />;
}