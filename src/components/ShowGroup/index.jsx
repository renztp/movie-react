import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShowGroup = ({ title, groupUrl, items }) => {
  const imageUrl = import.meta.env.VITE_TMDB_IMAGE;
  const [showItems, setShowItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const limitShows = () => {
    let tempArr = [...items];
    tempArr.length = 4;
    setShowItems(tempArr);
  };

  useEffect(() => {
    limitShows();
    setIsLoading(!isLoading);
  }, [items]);

  console.log("showgroup -> mounted");

  const renderCards = () => {
    if (!isLoading) {
      return showItems.map((show) => (
        <div
          key={show.id}
          style={{ backgroundImage: `url(${imageUrl}w500${show.poster_path})` }}
        >
          <p className="ratings">{show.vote_average}</p>
        </div>
      ));
    } else {
      return [1, 2, 3, 4].map((item, index) => (
        <div
          key={item}
          className="loading-cards"
          style={{ animationDelay: index - 0.5 }}
        ></div>
      ));
    }
  };
  return (
    <div className="overview-group show-group">
      <div className="header">
        <h3>{title}</h3>
        <Link to={groupUrl}>View All</Link>
      </div>
      <div className="overview-group show-group__cards">{renderCards()}</div>
    </div>
  );
};

export default ShowGroup;
