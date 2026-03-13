import { FETCH_SURVEYS } from '../actions/type';

export default function surveysReducer(state = null, action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        default:
            return state;
    }
}
