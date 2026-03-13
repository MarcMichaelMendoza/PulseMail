import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import reducers from "./reducers";
import reduxThunk from 'redux-thunk';
import './styles/App.css';

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

root.render(
    <Provider store={store}><App /></Provider>
);