import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
import { getCategories } from './actions/ActionsCategories'
import {getPosts} from "./actions/ActionsPosts";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
);

store.dispatch(getPosts());
store.dispatch(getCategories());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker();
