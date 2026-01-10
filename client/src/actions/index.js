import axios from 'axios';
import { FETCH_USER } from './type';

// Action creator to fetch the current user
export const fetchUser =  () => {
    return function(dispatch) {
        axios.get('/api/current_user').then(res => dispatch({ type: FETCH_USER, payload: res}));
    };
};  