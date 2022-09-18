import { configureStore } from '@reduxjs/toolkit';
import filters from '../reducers/filters';
import heroes from '../components/heroesList/heroesSlice'; // экспорт дефолтного reducer'а

// store == {dispatch, getState} именно в этом месте!
const stringMiddleWare = (/*store*/) => (next /*dispatch*/) => (action) => {
    // next ~ dispatch
    // осталеживем нашу строку в диспетч и сами формируем объект
    if (typeof action === 'string') {
        return next({ type: action });
    }
    return next(action);
};

// const enhancer =
//     (createStore) =>
//     (...args) => {
//         const store = createStore(...args);

//         const oldDispatch = store.dispatch; // saving old store
//         store.dispatch = (action) => {
//             // осталеживем нашу строку в диспетч и сами формируем объект
//             if (typeof action === 'string') {
//                 return oldDispatch({ type: action });
//             }
//             return oldDispatch(action);
//         };
//         return store;
//     };

// const store = createStore( //TODO: как мы раньше собирали все
//     combineReducers({ filters, heroes }),
//     compose(
//         applyMiddleware(ReduxThunk, stringMiddleWare),
//         window.__REDUX_DEVTOOLS_EXTENSION__ &&
//             window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

const store = configureStore({
    reducer: { heroes, filters },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(stringMiddleWare), // в toolkit включены некоторые популярные middlewar'ы
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
