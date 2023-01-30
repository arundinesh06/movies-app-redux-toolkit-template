import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
  setSearchTerm,
  resetSearchTerm,
} from "../../features/movies/movieSlice";
const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (term === "") {
      return alert("Please add a search term");
    }
    await dispatch(setSearchTerm(term));
    await dispatch(fetchAsyncMovies(term));
    await dispatch(fetchAsyncShows(term));
    navigate("/");
    setTerm("");
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App </Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search movies or shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      {/* <div className="user-image">
        <img src={user} alt="User" />
      </div> */}
    </div>
  );
};

export default Header;
