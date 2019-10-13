import { SUCCESS, ERROR, RESET } from "./../constants";

const INITIAL_STATE = {
    response: null,
    error: null
}

export default (state = INITIAL_STATE, payload) => {
    switch (payload.type) {
        case SUCCESS:
            console.log(payload);
            return {
                ...state,
                response: payload.response
            };

        case ERROR:
            return {
                ...state,
                error: payload.error
            };

        case RESET:
            return {
                response: null,
                error: null
            };

        default:
            return state;
    }
}