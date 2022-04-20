import React, { useState, useEffect } from "react";

// Fonts
import WebFont from "webfontloader";

// React Router Dom
import { Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import MoviesView from "./views/MoviesView";
import Header from "./components/Header/Header";
import UpcomingView from "./views/UpcomingView";
import SingleView from "./views/SingleView";
import axios from "axios";

// Service
import { getPopularMovies, generateShow } from "./services/tmdb/tmdb.service";
import NotFoundView from "./views/NotFoundView";

function App() {
  const [count, setCount] = useState(0);
  const [shows, setShows] = useState({
    featured: [],
    tvSeries: [],
    upcoming: [],
  });

  const getOverviewShows = async () => {
    try {
      let featuredShows = await generateShow(1, "movie", "popular");
      let tvShows = await generateShow();
      let upcomingShows = await generateShow(1, "movie", "upcoming");
      console.log(tvShows);

      featuredShows.length = 10;
      tvShows.length = 10;

      console.log({ featuredShows, tvShows, upcomingShows });
      setShows((prevState) => ({
        ...prevState,
        featured: featuredShows.data.results,
        tvSeries: tvShows.data.results,
        upcoming: upcomingShows.data.results,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Inter", "Noto Sans", "Bebas Neue", "Lato"],
      },
    });
    getOverviewShows();
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomeView
              featured={shows.featured}
              tvSeries={shows.tvSeries}
              upcoming={shows.upcoming}
            />
          }
        />
        <Route path="/movies" element={<MoviesView />} />
        <Route path="/movies/:id" element={<SingleView />} />
        <Route path="/upcoming" element={<UpcomingView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </div>
  );
}

export default App;
