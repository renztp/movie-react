import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShowGroup = ({ title, groupUrl, items }) => {
  const imageUrl = import.meta.env.VITE_TMDB_IMAGE;
  const [showItems, setShowItems] = useState([]);
  const limitShows = () => {
    let tempArr = [...items];
    tempArr.length = 4;
    setShowItems(tempArr);
  };

  useEffect(() => {
    limitShows();
  }, [items]);

  const cards = () => {
    return showItems.map((show) => (
      <div
        key={show.id}
        style={{ backgroundImage: `url(${imageUrl}w500${show.poster_path})` }}
      >
        <p className="ratings">{show.vote_average}</p>
      </div>
    ));
  };
  const cardsLoading = () => {
    return [1, 2, 3, 4].map((item, index) => (
      <div
        key={item}
        className="loading-cards"
        style={{ animationDelay: index - 0.5 }}
      ></div>
    ));
  };
  return (
    <div className="overview-group show-group">
      <div className="header">
        <h3>{title}</h3>
        <Link to={groupUrl}>View All</Link>
      </div>
      <div className="overview-group show-group__cards">
        {showItems.length > 0 ? cards() : cardsLoading()}
      </div>
    </div>
  );
};

export default ShowGroup;
