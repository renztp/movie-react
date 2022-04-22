import React from "react";
import app_logo from "../../assets/website_logo.svg";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="controls controls--left">
          <Link to="/" className="logo">
            <img src={app_logo} alt="" />
          </Link>
          <ul>
            <li>
              <Link to="/">All</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            {/* <li>
              <Link to="/tvshows">TV Shows</Link>
            </li> */}
            <li>
              <Link to="/upcoming">Upcoming</Link>
            </li>
          </ul>
        </div>
        <div className="controls controls--right">
          <button onClick={() => alert("Clicked")}>
            <FiSearch />
          </button>
        </div>
      </div>
    </header>
  );
}
