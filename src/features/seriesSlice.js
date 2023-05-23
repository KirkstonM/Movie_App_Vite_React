import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MY_KEY } from '../credentials';

const initialState = {
    series : [],
    isLoading : false,
    error : false,
    seriesDetails : {}
};

export const fetchSeries = createAsyncThunk('series/fetchSeries', async(query, thunkAPI) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${MY_KEY}&s=${query}&type="series"`)
        const data = await response.json();
        if (data.Response === "True") {
            return data.Search
        } else  {
            return thunkAPI.rejectWithValue({ error: data.Error });
        }
    } catch (error) {
        return thunkAPI.rejectWithValue({ error : error.message })
    }
});

export const fetchSeriesDetails = createAsyncThunk('series/seriesDetail', async(id, thunkAPI) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${MY_KEY}&i=${id}&plot=full"`)
        const data = await response.json();
       return data    
    } catch (error) {
        return thunkAPI.rejectWithValue({ error : error.message })
    }
})

const seriesSlice = createSlice({
    name : 'series',
    initialState,
    reducers : {
        clearDetails : (state) => {
            state.seriesDetails = {}
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchSeries.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        })
        .addCase(fetchSeries.fulfilled, (state, action) => {
            state.isLoading = false;
            state.series = action.payload;
            state.error = false;
        })
        .addCase(fetchSeries.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })

        .addCase(fetchSeriesDetails.fulfilled, (state, action) => {
            state.seriesDetails = action.payload
        })
        .addCase(fetchSeriesDetails.rejected, (state, action) => {
            state.error = action.payload
        })
    }
});

export const allSeries = (state) => state.series.series;
export const details = (state) => state.series.seriesDetails;
export const errors = (state) => state.series.error;
export const isloading = (state) => state.series.isLoading;
export const { clearDetails } = seriesSlice.actions;
export default seriesSlice.reducer;