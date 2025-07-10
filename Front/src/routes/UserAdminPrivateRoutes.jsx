// Front/src/routes/UserAdminPrivateRoutes.jsx
/* Componente que redirecciona al usuario autenticado (dado de alta y logueado)
 * a sus respectivas rutas: Administracion (si es admin) y Logout. */

import { Navigate } from 'react-router-dom';
import {useAuth} from "../shared/hooks/useAuth.jsx";
import {useUserData} from "../shared/hooks/useUserData.jsx";
import Loading from '@/shared/components/Loading.jsx';

export function UserAdminPrivateRoutes({ children }) {

    const { isAuthenticated } = useAuth();
    const { user } = useUserData();

    // Agregar un estado de loading mientras se cargan los datos
    if (!isAuthenticated && localStorage.getItem("userAuth")) {
        // Está cargando los datos del localStorage
        return <Loading />;
    }

    // Si no está autenticado, redirigir al login
    if ( !isAuthenticated ) {
        return <Navigate to="/login" replace />;
    }

    // Si está autenticado pero no es admin, redirigir al inicio
    if ( user.role !== 'ADMIN' ) {
        return <Navigate to="/" replace />;
    }

    // Si está autenticado y es admin, mostrar el contenido
    return children;

}