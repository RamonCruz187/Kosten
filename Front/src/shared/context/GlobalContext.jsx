// Front/src/shared/context/GlobalContext.jsx
import { createContext, useEffect, useMemo, useReducer } from 'react';
import { initialState, reducer } from "./GlobalStoreReducer.jsx";

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = useMemo( ()=> ({
        state,
        dispatch,
    }), [ state, dispatch ]);

    useEffect(() => {
        const userAuth = JSON.parse(localStorage.getItem("userAuth"));
        const userData = JSON.parse(localStorage.getItem("userData"));
        
        if( userAuth ) {
            dispatch({
                type: "AUTH_LOGIN",
                payload: userAuth
            });
        }
        
        if( userData ) {
            dispatch({
                type: "SET_USER_DATA",
                payload: userData
            });
        }
    }, []);

    return (
        <GlobalContext.Provider value={ contextValue }>
            { children }
        </GlobalContext.Provider>
    );
};