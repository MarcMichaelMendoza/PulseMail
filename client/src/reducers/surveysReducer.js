import { FETCH_SURVEYS, DELETE_SURVEY } from '../actions/type';

export default function surveysReducer(state = null, action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        case DELETE_SURVEY:
            return action.payload;
        default:
            return state;
    }
}
