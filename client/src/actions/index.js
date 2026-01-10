import axios from 'axios';
import { FETCH_USER } from './type';

const fetchUser =  (dispatch) => {
    return function() {
        axios
            .get('/api/current_user')
            .then(res => dispatch({ type: FETCH_USER, payload: res}));
    };
};  