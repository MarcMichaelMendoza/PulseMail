import axios from 'axios';
import { FETCH_USER } from './type';

/**
 * Fetch the currently authenticated user.
 *
 * This is a thunk action creator (requires redux-thunk). When dispatched
 * it performs an HTTP GET to `/api/current_user` and dispatches a
 * `FETCH_USER` action with the response payload.
 *
 * @returns {Function} Thunk function that accepts `dispatch`.
 */
export const fetchUser = () => {
    return async (dispatch) => {
        const res = await axios.get('/api/current_user');
        dispatch({ type: FETCH_USER, payload: res.data });
    };
};

/**
 * Handle a Stripe payment token and update the user.
 *
 * Sends the provided `token` to the server (`/api/stripe`). On success
 * the server responds with the updated user which is dispatched as
 * `FETCH_USER` payload.
 *
 * @param {Object} token - Stripe token object returned by Stripe Checkout
 * @returns {Function} Thunk function that accepts `dispatch`.
 */
export const handleToken = (token) => {
    return async (dispatch) => {
        const res = await axios.post('/api/stripe', token);
        dispatch({ type: FETCH_USER, payload: res.data });
    };
}

/**
 * Submit a new survey and navigate to the surveys page.
 *
 * Sends `values` to `/api/surveys`. After a successful POST the function
 * uses the provided `history` object to redirect to `/surveys` and then
 * dispatches `FETCH_USER` with the server response.
 *
 * @param {Object} values - Survey form values to submit.
 * @param {Object} history - React Router `history` object for navigation.
 * @returns {Function} Thunk function that accepts `dispatch`.
 */
export const submitSurvey = (values, history) => {
    return async (dispatch) => {
        const res = await axios.post('/api/surveys', values);
        dispatch({ type: FETCH_USER, payload: res.data });
        history.push('/surveys');
    };
}