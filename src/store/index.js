import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';

// store == {dispatch, getState} именно в этом месте!
const stringMiddleWare = (/*store*/) => (next /*dispatch*/) => (action) => {
    // next ~ dispatch
    // осталеживем нашу строку в диспетч и сами формируем объект
    if (typeof action === 'string') {
        return next({ type: action });
    }
    return next(action);
};

const enhancer =
    (createStore) =>
    (...args) => {
        const store = createStore(...args);

        const oldDispatch = store.dispatch; // saving old store
        store.dispatch = (action) => {
            // осталеживем нашу строку в диспетч и сами формируем объект
            if (typeof action === 'string') {
                return oldDispatch({ type: action });
            }
            return oldDispatch(action);
        };
        return store;
    };

const store = createStore(
    combineReducers({ filters, heroes }),
    compose(
        applyMiddleware(stringMiddleWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )

    // compose(
    //     enhancer,
    //     window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //         window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
);
export default store;
