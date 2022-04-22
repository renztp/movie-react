import React from "react";

export default function Cover({ poster_path, cover_width = "w500" }) {
  let imgUrl = import.meta.env.VITE_TMDB_IMAGE;
  return (
    <div className="overview__cover">
      <img src={`${imgUrl + cover_width + poster_path}`} alt="Poster Image" />
    </div>
  );
}
