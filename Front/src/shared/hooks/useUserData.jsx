import { useCallback, useContext, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import { types_reducer } from "../types/index.js";

export const useUserData = () => {
    const context = useContext(GlobalContext);

    if (!context) return null;

    const getUserData = useCallback(() => {
        // Add a guard to prevent unnecessary dispatches
        if (!context.state.user_data.id) {
            const userData = localStorage.getItem('userData');

            if (userData) {
                const parsedData = JSON.parse(userData);
                if (parsedData.id !== context.state.user_data.id) { // Ensure it only dispatches if the data is different
                    context.dispatch({
                        type: types_reducer.SET_USER_DATA,
                        payload: parsedData
                    });
                }
            }
        }
    }, [context.state.user_data.id, context.dispatch]);

    const setUserData = useCallback((userData) => {
        localStorage.setItem('userData', JSON.stringify(userData));
        context.dispatch({
            type: types_reducer.SET_USER_DATA,
            payload: userData
        });
    }, [context.dispatch]);

    return useMemo(() => ({
        getUserData,
        setUserData,
        user: context.state.user_data
    }), [getUserData, setUserData, context.state.user_data]);
};


//************ original *********** */
// import {useCallback, useContext, useMemo} from "react";
// import {GlobalContext} from "../context/GlobalContext.jsx";
// import {types_reducer} from "../types/index.js";

// export const useUserData = () => {

//     const context = useContext(GlobalContext);

//     if(!context)
//         return null;

//     const getUserData = useCallback( () => {

//         if(!context.state.user_data.id) {
//             const userData = localStorage.getItem('userData');

//             if(userData)
//                 context.dispatch({
//                     type: types_reducer.SET_USER_DATA,
//                     payload: JSON.parse(userData)
//                 });
//         }

//     }, [context]);

//     const setUserData = useCallback( ( userData ) => {
//         localStorage.setItem('userData', JSON.stringify(userData));
//         context.dispatch({
//             type: types_reducer.SET_USER_DATA,
//             payload: userData
//         });
//     }, [context]);

//     return useMemo(() => ({
//         getUserData,
//         setUserData,
//         user: context.state.user_data
//     }), [getUserData, setUserData]);
// }