// Front/src/shared/context/GlobalStoreReducer.jsx
import {ROLES, types_reducer} from "../types/index.js";

export const USER_AUTH = {
    userId: 0,
    username: ROLES.GUEST.toUpperCase(),
    token: null
}

export const USER_DATA = {
    id: NaN,
    username: undefined,
    email: undefined,
    contact: undefined,
    role: undefined
}

export const initialState = {
    user_auth: USER_AUTH,
    user_data: USER_DATA,
    packages: [],
    categories: [],
};

export const reducer = (state, action) => {
    switch (action.type) {
        case types_reducer.AUTH_LOGIN:
            return {
                ...state,
                user_auth: action.payload,
            };
        case types_reducer.AUTH_LOGOUT:
            return {
                ...state,
                user_auth: USER_AUTH,
                user_data: USER_DATA
            };
        case types_reducer.SET_USER_DATA:
            return {
                ...state,
                user_data: action.payload,
            };
        case types_reducer.SET_PACKAGES:
            return {
                ...state,
                packages: action.payload,
            };
        case types_reducer.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        default:
            return state;
    }
};