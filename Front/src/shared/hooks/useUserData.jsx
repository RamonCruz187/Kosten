import {useCallback, useContext, useMemo} from "react";
import {GlobalContext} from "../context/GlobalContext.jsx";

export const useUserData = () => {

    const context = useContext(GlobalContext);

    if(!context)
        return null;

    const getUserData = useCallback( () => {

        if(!context.state.user_data) {
            const userData = localStorage.getItem('userData');
            if(userData)
                context.dispatch({
                    type: "SET_USER_DATA",
                    payload: JSON.parse(userData)
                });
        }

        return context.state.user_data;
    }, [context]);

    const setUserData = useCallback( ( userData ) => {
        localStorage.setItem('userData', JSON.stringify(userData));
        context.dispatch({
            type: "SET_USER_DATA",
            payload: userData
        });
    }, [context]);

    return useMemo(() => ({
        getUserData,
        setUserData
    }), [getUserData, setUserData]);
}