import React, { useState, useEffect } from "react";
import MovieListing from "../../components/MovieListing/MovieListing";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/RippleLoader/RippleLoader";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
const Home = () => {
  const dispatch = useDispatch();
  const moviesLoading = useSelector((state) => state.movies.moviesLoading);
  const loading = useSelector((state) => state.movies.loading);
  const searchTerm = useSelector((state) => state.movies.searchTerm);
  console.log(searchTerm);
  let movieText = "",
    showText = "";
  if (searchTerm) {
    movieText = searchTerm;
    showText = searchTerm;
  } else {
    movieText = "Harry";
    showText = "Friends";
  }
  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
  }, [dispatch]);
  return (
    <div>
      <div className="banner-image"></div>
      {loading ? <Loader /> : <MovieListing />}
    </div>
  );
};

export default Home;
