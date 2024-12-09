// Front/src/routes/UserAdminPrivateRoutes.jsx
/* Componente que redirecciona al usuario autenticado (dado de alta y logueado)
 * a sus respectivas rutas: Administracion (si es admin) y Logout. */

import { Navigate } from 'react-router-dom';
import {useAuth} from "../shared/hooks/useAuth.jsx";
import {useUserData} from "../shared/hooks/useUserData.jsx";

export function UserAdminPrivateRoutes({ children }) {

    const { isAuthenticated } = useAuth();
    const { user } = useUserData();

    if ( !isAuthenticated ) {
        return <Navigate to="/login" replace />;
    }

    if ( user.role !== 'ADMIN' ) {
        return <Navigate to="/" replace />;
    }

    return children;

}