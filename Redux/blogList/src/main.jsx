import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createStore } from 'redux';
import { Provider } from 'react-redux';

// notificationReducer is passed here, making it handle all dispatched actions
import notificationReducer from './reducers/notificationReducer'

const store = createStore(notificationReducer)

// Provider makes the store accessible to all components via useSelector/useDispatch
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)