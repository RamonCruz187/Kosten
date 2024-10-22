import {useCallback, useContext, useMemo} from "react";
import {GlobalContext} from "../context/GlobalContext.jsx";

export const usePackages = () => {
    const context = useContext(GlobalContext);

    if(!context)
        return null;

    const setPackages = useCallback( ( packages ) => {
        context.dispatch({
            type: "SET_PACKAGES",
            payload: packages
        });
    }, [context]);

    return useMemo(() => ({
        packages: context.state.packages,
        setPackages
    }), [setPackages]);

}