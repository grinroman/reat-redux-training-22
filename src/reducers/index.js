const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filteredHeroes: [],
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING': {
            return {
                ...state,
                heroesLoadingStatus: 'loading',
            };
        }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes:
                    state.activeFilter === 'all'
                        ? action.payload
                        : action.payload.filter(
                              (item) => item.element === state.activeFilter
                          ),
                heroesLoadingStatus: 'idle',
            };
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error',
            };
        case 'HERO_DELETED': {
            const newCreatedHeroList = state.heroes.filter(
                (item) => item.id !== action.payload
            );
            return {
                ...state,
                heroes: newCreatedHeroList,
                filteredHeroes:
                    state.activeFilter === 'all'
                        ? newCreatedHeroList
                        : newCreatedHeroList.filter(
                              (item) => item.element === state.activeFilter
                          ),
            };
        }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading',
            };
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle',
            };
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error',
            };
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes:
                    action.payload === 'all'
                        ? state.heroes
                        : state.heroes.filter(
                              (item) => item.element === action.payload
                          ),
            };
        case 'HERO_CREATED':
            let newCreatedHeroList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newCreatedHeroList,
                filteredHeroes:
                    state.activeFilter === 'all'
                        ? newCreatedHeroList
                        : newCreatedHeroList.filter(
                              (item) => item.element === state.activeFilter
                          ),
            };
        default: {
            console.log('unhandeled action: ', action.type);
            return state;
        }
    }
};

export default reducer;
