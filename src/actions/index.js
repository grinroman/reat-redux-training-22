export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching);
    request('http://localhost:3001/heroes')
        .then((data) => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
};

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING',
    };
};

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes,
    };
};

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR',
    };
};

export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id,
    };
};

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING',
    };
};

export const filtersFetched = (filter) => {
    // т.к. мы подрубились к redux-thunk-middleware

    return {
        type: 'FILTERS_FETCHED',
        payload: filter,
    };
};

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR',
    };
};

export const activeFilterChanged = (activeFilter) => {
    return { type: 'ACTIVE_FILTER_CHANGED', payload: activeFilter };
};

export const heroCreated = (hero) => {
    return { type: 'HERO_CREATED', payload: hero };
};
