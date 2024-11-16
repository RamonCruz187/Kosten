import {useCallback, useContext, useMemo} from "react";
import {GlobalContext} from "../context/GlobalContext.jsx";

export const useStaffData = () => {
    const context = useContext(GlobalContext);

    if(!context)
        return null;

    const setStaffData = useCallback( ( staffData ) => {
        context.dispatch({
            type: "SET_PACKAGES",
            payload: staffData
        });
    }, [context]);

    return useMemo(() => ({
        staffData: context.state.staffData,
        setStaffData
    }), [setStaffData]);

}