import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, DELETE_SURVEY } from './type';

export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async (dispatch) => {
    const res = await axios.post('/api/surveys', values);
    dispatch({ type: FETCH_USER, payload: res.data });
    history.push('/surveys');
};

export const fetchSurveys = () => async (dispatch) => {
    const res = await axios.get('/api/surveys');
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const deleteSurvey = (surveyId) => async (dispatch) => {
    const res = await axios.delete(`/api/surveys/${surveyId}`);
    dispatch({ type: DELETE_SURVEY, payload: res.data });
};