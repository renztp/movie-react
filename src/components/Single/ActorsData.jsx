import React from "react";

export default function ActorsData({ casts }) {
  let imgUrl = import.meta.env.VITE_TMDB_IMAGE;
  return (
    <div className="actors">
      <h4>Actors</h4>
      <ul>
        {casts.map((actor) => (
          <li key={actor.id}>
            <img
              src={`${imgUrl}w500${actor.profile_path}`}
              alt="Profile Image"
            />
            <div className="meta">
              <h5>{actor.character}</h5>
              <span>{actor.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
