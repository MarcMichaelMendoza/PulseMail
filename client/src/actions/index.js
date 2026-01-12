import axios from 'axios';
import { FETCH_USER } from './type';

// Action creator to fetch the current user
export const fetchUser = () => {
    return async (dispatch) => {
        const res = await axios.get('/api/current_user');
        dispatch({ type: FETCH_USER, payload: res.data });
    };
};  

// Action creator to handle Stripe payment token
export const handleToken = (token) => {
    return async (dispatch) => {
        const res = await axios.post('/api/stripe', token);
        dispatch({ type: FETCH_USER, payload: res.data });
    };
}