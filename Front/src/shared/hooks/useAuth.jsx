import {useCallback, useContext, useMemo} from "react";
import {GlobalContext} from "../context/GlobalContext.jsx";

export const useAuth = (factory, deps) => {

    const context = useContext(GlobalContext);

    if(!context)
        return null;

    const handleLogin = useCallback( ( userAuth ) => {
        localStorage.setItem("userAuth", JSON.stringify( userAuth ));

        context.dispatch({
            type: "AUTH_LOGIN",
            payload: userAuth
        });
    }, [context]);

    const handleLogout = useCallback( () => {

        localStorage.removeItem("userAuth");
        localStorage.removeItem("userData");

        context.dispatch({
            type: "AUTH_LOGOUT"
        });
    }, [context]);

    const isAuthenticated = useMemo(() => context.state.user_auth.token !== null, deps);

    return useMemo(() => ({
        isAuthenticated,
        userAuth: context.state.user_auth,
        handleLogin,
        handleLogout
    }), [isAuthenticated, handleLogin, handleLogout]);

}