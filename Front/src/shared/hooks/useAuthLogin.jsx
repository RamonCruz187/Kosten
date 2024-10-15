import {useCallback, useContext} from "react";
import {GlobalContext} from "../context/GlobalContext.jsx";

export const useAuthLogin = () => {

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

        context.dispatch({
            type: "AUTH_LOGOUT"
        });
    }, [context]);

    return {
        userAuth: context.state.user_auth,
        handleLogin,
        handleLogout
    }

}