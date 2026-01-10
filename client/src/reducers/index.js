import { combineReducers } from "redux";
import authReducer from "./authReducer";

// The combineReducers helper function turns an object whose values are different
// reducer functions into a single reducer function you can pass to createStore.
export default combineReducers({
    // The 'auth' piece of state is being managed by the authReducer.
    auth: authReducer
});