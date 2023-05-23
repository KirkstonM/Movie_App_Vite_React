import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MY_KEY } from '../credentials';

const initialState = {
    movies : [],
    isLoading : false,
    error : false,
    movieDetails : {}
};

export const fetchMovies = createAsyncThunk('movies/fetchmovies', async(query, thunkAPI) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${MY_KEY}&s=${query}&type="movie"`)
        const data = await response.json();
        if (data.Response === "True") {
            return data.Search
        } else {
            return thunkAPI.rejectWithValue({ error : data.Error })
        }
    } catch (error) {
        return thunkAPI.rejectWithValue({ error : error.message })
    }
});

export const fetchMovieDetails = createAsyncThunk('movies/moviesDetials', async(id, thunkAPI) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${MY_KEY}&i=${id}&plot=full"`)
        const data = await response.json();
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue({ error : error.message })
    }
})
const movieSlice = createSlice({
    name : 'movies',
    initialState,
    reducers: {
        clearDetails : (state) => {
            state.movieDetails = {}
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchMovies.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.movies = action.payload;
        })
        .addCase(fetchMovies.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.movieDetails = action.payload;
        })
        .addCase(fetchMovieDetails.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
});

export const allMovies = (state) => state.movies.movies;
export const details = (state) => state.movies.movieDetails;
export const errors = (state) => state.movies.error;
export const isloading = (state) => state.movies.isLoading;
export const { clearDetails } =  movieSlice.actions;
export default movieSlice.reducer;