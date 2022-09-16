import { createStore, combineReducers } from 'redux';
import filters from '../reducers/filters';
import heroes from '../reducers/heroes';

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

const store = createStore(combineReducers({ filters, heroes }), enhancer);
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export default store;
