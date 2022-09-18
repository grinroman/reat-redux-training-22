import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';
const initialState = { heroes: [], heroesLoadingStatus: 'indle' };

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', () => {
    const { request } = useHttp();
    return request('http://localhost:3001/heroes'); //!! должна вернуть Promise!
}); // без async await т.к. все уже лежит в хуке useHttp

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroCreated: (state, action) => {
            // мутабельная запись на самом деле конаертируется в иммутабельную потому что внутри лежит inner.js
            state.heroes.push(action.payload);
        }, // формируем сам action creator а потом справа пишем само изменение state
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter(
                (item) => item.id !== action.payload
            );
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchHeroes.pending, (state) => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload; //т.к. данные из промиса автоматически прийдут в payload
            })
            .addCase(fetchHeroes.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {}),
});
// returns имя, объект с actions + reducer

const { actions, reducer } = heroesSlice;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted,
} = actions;
