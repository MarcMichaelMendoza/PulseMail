import { FETCH_USER } from '../actions/type';

// Auth reducer to manage authentication state
export default function (state = null, action) {
     console.log(action);
     switch(action.type) {
          case FETCH_USER:
               return action.payload || false;
          default: 
               return state;
     }
}