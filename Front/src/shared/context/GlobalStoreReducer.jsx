import {ROLES, types_reducer} from "../types/index.js";

export const USER_AUTH = {
    userId: 0,
    username: ROLES.GUEST.toUpperCase(),
    token: null
}

const initialState = {
    user_auth: USER_AUTH,
};

const reducer = (state, action) => {
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
            };
        default:
            return state;
    }
};

export { initialState, reducer }