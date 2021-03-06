import { createStore, applyMiddleware, Middleware, StoreEnhancer } from "redux"
import rootReducer from "./reducers";
import { MakeStore, createWrapper } from "next-redux-wrapper";

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
}

const makeStore: MakeStore<{}> = () => {
    const store = createStore(rootReducer, {}, bindMiddleware([]));
    return store
}
    

export const wrapper = createWrapper<{}>(makeStore, { debug: true });