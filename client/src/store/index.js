import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import reducer from './reducer';
import  { compose } from 'redux';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

// export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));