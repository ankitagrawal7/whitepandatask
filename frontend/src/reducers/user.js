import { REGISTER, NEW_USER, EXISTING_USER, GET_USER_DATA, SET_USER_DATA, LOGOUT, GET_TOKEN } from "./../constants";

const INITIAL_STATE = {
    user: null,
    isRegistered: null,
    token: null
}

export default (state = INITIAL_STATE, payload) => {
    switch (payload.type) {
        case REGISTER:
            return {
                user: payload.user
            };

        case GET_USER_DATA:
            console.log(payload)
            return {
                ...state,
                user: payload.user
            };

        case GET_TOKEN:
                const data = sessionStorage.getItem("user");
                const token = (data === null) ? null : JSON.parse(data).token;
                return {
                    ...state,
                    token: token
                };

        case SET_USER_DATA:
            console.log(SET_USER_DATA, payload.user);
            // sessionStorage.setItem("user", JSON.stringify(payload.user));
            return {
                ...state,
                token: payload.user.token,
            };

        case LOGOUT:
            // sessionStorage.removeItem("user");
            return {
                user: null,
                isRegistered: null,
                token: null
            };

        case NEW_USER:
            console.log(NEW_USER, payload);
            return {
                ...state,
                isRegistered: payload.error.isRegistered
            };

        case EXISTING_USER:
            console.log(EXISTING_USER, payload);
            return {
                ...state,
                isRegistered: payload.data.isRegistered
            };

        default:
            return state;
    }
}