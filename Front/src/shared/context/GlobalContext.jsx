import { createContext, useMemo, useReducer } from 'react';
import { initialState, reducer } from "./GlobalStoreReducer.jsx";

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = useMemo( ()=> ({
        state,
        dispatch,
    }), [ state, dispatch ]);

    return (
        <GlobalContext.Provider value={ contextValue }>
            { children }
        </GlobalContext.Provider>
    );
};