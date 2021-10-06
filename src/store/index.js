import { createSlice, configureStore } from "@reduxjs/toolkit";

const currentCitySlice = createSlice ({
    name: 'currentCity',
    initialState: {cityName: '', cityId: '',  currWeather: {temperature: {imperial: null, metric: null}, weatherIcon: null, weatherText: ''}},
    reducers: {
        updateCurrentCity(state, action){
            state.cityName = action.payload.cityName;
            state.cityId = action.payload.cityId;
        },

        updateCurrentWeather(state, action){
            state.currWeather.weatherText = action.payload.weatherText;
            state.currWeather.weatherIcon = action.payload.weatherIcon;
            state.currWeather.temperature.imperial = action.payload.imperial;
            state.currWeather.temperature.metric = action.payload.metric;
        }

    }
});


const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {favList: []},
    reducers: {
        addFavorite(state, action){
            state.favList.push(action.payload);
        },
        removeFavorite(state, action){
            const index = state.favList.findIndex( favorite => favorite.id === action.payload);
            state.favList.splice(index, 1);
        }
    }
    
});

const store = configureStore({
    reducer: {  currentCity: currentCitySlice.reducer,
                favorites: favoritesSlice.reducer
            }
});


export const favoritesActions = favoritesSlice.actions;
export const currentCityActions = currentCitySlice.actions;
export default store;

