import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShowGroup = ({ title, groupUrl, items }) => {
  const imageUrl = import.meta.env.VITE_TMDB_IMAGE;
  const [showItems, setShowItems] = useState([...items]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("- ShowGroup Mounted");
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      setShowItems([...items]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [items]);

  const renderCards = () => {
    if (!isLoading) {
      return showItems.map((show) => (
        <Link
          to={`/movie/${show.id}`}
          key={show.id}
          style={{ backgroundImage: `url(${imageUrl}w500${show.poster_path})` }}
        >
          <p className="ratings">{show.vote_average}</p>
        </Link>
      ));
    } else {
      // Render 4 cards if it has groupUrl(overview page) else 12 cards
      let dummyArr = groupUrl ? [...Array(4).keys()] : [...Array(12).keys()];
      return dummyArr.map((item, index) => (
        <a
          key={item}
          className="loading-cards"
          style={{ animationDelay: index - 0.5 }}
        ></a>
      ));
    }
  };

  return (
    <div className="overview-group show-group">
      <div className="header">
        <h3>{title}</h3>
        {groupUrl && <Link to={groupUrl}>View All</Link>}
      </div>
      <div className="overview-group show-group__cards">{renderCards()}</div>
    </div>
  );
};

export default ShowGroup;
