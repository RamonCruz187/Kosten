import {useContext} from "react";
import {GlobalContext} from "../context/GlobalContext.jsx";

export const useAuthLogin = () => {

    const context = useContext(GlobalContext);

    if(!context)
        return null;

    const handleLogin = (user_auth) => {
        context.dispatch({
            type: "AUTH_LOGIN",
            payload: user_auth
        });
    }

    const handleLogout = () => {
        context.dispatch({
            type: "AUTH_LOGOUT"
        });
    }

    return {
        user_auth: context.state.user_auth,
        handleLogin,
        handleLogout
    }

}