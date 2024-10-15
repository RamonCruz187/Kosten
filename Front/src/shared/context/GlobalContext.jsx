import {createContext, useCallback, useEffect, useMemo, useReducer} from 'react';
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
        if( userAuth ) {
            dispatch({
                type: "AUTH_LOGIN",
                payload: userAuth
            });
        }
    }, []);

    return (
        <GlobalContext.Provider value={ contextValue }>
            { children }
        </GlobalContext.Provider>
    );
};