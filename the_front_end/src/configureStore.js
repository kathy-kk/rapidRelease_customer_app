import { createStore, applyMiddleware } from 'redux';
 import customerApp from './store/Customer/reducer';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const configureStore = () => {

    const middlewares = [thunk];
    if(process.env.NODE_ENV !== 'production'){
        middlewares.push(createLogger);
    }
    return createStore(customerApp, applyMiddleware(...middlewares));
};

export default configureStore();