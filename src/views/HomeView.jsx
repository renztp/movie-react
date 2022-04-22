import React, { useState, useEffect } from "react";
import Featured from "../components/Featured";
import ShowGroup from "../components/ShowGroup";
import { generateShow } from "../services/tmdb/tmdb.service";

export default function HomeView({ featured, tvSeries, upcoming }) {
  useEffect(() => {
    console.log("- HomeView mounted");
  }, []);

  return (
    <div className="home-view">
      <div className="container">
        <Featured featuredItems={featured} />
        <ShowGroup title="Movies" groupUrl="movies" items={tvSeries} />
        <ShowGroup title="Upcoming" groupUrl="upcoming" items={upcoming} />
      </div>
    </div>
  );
}
