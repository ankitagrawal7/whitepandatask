import user from "./user";
import notifications from "./notifications";
import {
    combineReducers
} from "redux";

const rootReducer = combineReducers({
    user,
    notifications
});

export default rootReducer;