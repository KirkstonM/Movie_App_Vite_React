import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './features/movieSlice';
import seriesReducer from './features/seriesSlice';

export const store = configureStore({
    reducer : {
        movies : movieReducer,
        series : seriesReducer,
    }
});