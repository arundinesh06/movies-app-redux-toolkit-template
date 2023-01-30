import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApiKey";

// Fetch Movies
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const response = await movieApi
      .get(`?apiKey=${APIKey}&s=${term}&type=movie`)
      .catch((err) => {
        console.log(err);
      });
    return { data: response.data, term: term };
  }
);

// Fetch Shows
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    const response = await movieApi
      .get(`?apiKey=${APIKey}&s=${term}&type=series`)
      .catch((err) => {
        console.log(err);
      });
    return { data: response.data, term: term };
  }
);

// Fetch Movies / Shows details
export const fetchAsyncMoviesOrShowDetails = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowsDetails",
  async (id) => {
    const response = await movieApi
      .get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
      .catch((err) => {
        console.log(err);
      });
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  loading: false,
  detailsLoading: false,
  searchTerm: null,
};
const movieSlice = createSlice({
  name: "movies",
  initialState: initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
    setSearchTerm: (state, term) => {
      state.searchTerm = term.payload;
      state.loading = true;
      console.log(term);
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchAsyncMovies.pending, (state, action) => {
  //       state.moviesLoading = true;
  //       state.searchTerm = action.payload;
  //     })
  //     .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
  //       state.moviesLoading = true;
  //       state.searchTerm = action.payload;
  //     });
  // },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state) => {
      console.log("Pending");
      return { ...state, loading: true };
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Movies fetched successfully");
      return {
        ...state,
        movies: payload.data,
        loading: false,
      };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },
    [fetchAsyncShows.pending]: (state) => {
      return { ...state, loading: true };
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Shows fetched successfully");
      return {
        ...state,
        shows: payload.data,
        loading: false,
      };
    },
    [fetchAsyncMoviesOrShowDetails.pending]: (state) => {
      return { ...state, detailsLoading: true };
    },
    [fetchAsyncMoviesOrShowDetails.fulfilled]: (state, { payload }) => {
      console.log("Show details fetched successfully");
      return { ...state, selectedMovieOrShow: payload, detailsLoading: false };
    },
  },
});
export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const { setSearchTerm } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export default movieSlice.reducer;
