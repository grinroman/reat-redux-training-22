import { createAction } from '@reduxjs/toolkit';
import {
    heroesFetched,
    heroesFetchingError,
    heroesFetching,
} from '../components/heroesList/heroesSlice';

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
        .then((data) => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()));
};

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters,
    };
};
export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING',
    };
};

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR',
    };
};

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter,
    };
};

// export const heroCreated = (hero) => {
//     return {
//         type: 'HERO_CREATED',
//         payload: hero
//     }
// }

export const heroCreated = createAction('HERO_CREATED');

// export const heroDeleted = (id) => {
//     return {
//         type: 'HERO_DELETED',
//         payload: id
//     }
// }

export const heroDeleted = createAction('HERO_DELETED');
