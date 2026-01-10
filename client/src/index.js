import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import reducers from "./reducers";

// Find the root DOM node
const el = document.getElementById("root");

// Create a React root for concurrent mode
const root = ReactDOM.createRoot(el);

// Create the Redux store
// The first argument is all the reducers in the application.
// The second argument is the initial state.
// The third argument is middleware (currently none).
const store = createStore(reducers, {}, applyMiddleware());

// Render the root component of the application.
// The Provider component from react-redux makes the Redux store
// available to any nested components that need to access it.
root.render(
    <Provider store={store}><App /></Provider>
);