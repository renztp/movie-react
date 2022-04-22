import React, { useState, useEffect } from "react";

// Fonts
import WebFont from "webfontloader";

// React Router Dom
import { useNavigate, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import MoviesView from "./views/MoviesView";
import Header from "./components/Header/Header";
import UpcomingView from "./views/UpcomingView";
import axios from "axios";

// Service
import { generateShow } from "./services/tmdb/tmdb.service";
import NotFoundView from "./views/NotFoundView";
import SingleMovieView from "./views/SingleMovieView";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);
  const [shows, setShows] = useState({
    featured: [],
    tvSeries: [],
    upcoming: [],
  });
  let navigate = useNavigate();

  const testRequest = async () => {
    let response = await generateShow();
    console.log(response);
  };

  const getOverviewShows = async () => {
    let featuredShows, tvShows, upcomingShows;
    try {
      featuredShows = await generateShow(1, "movie", "popular");
      tvShows = await generateShow();
      upcomingShows = await generateShow(1, "movie", "upcoming");

      featuredShows.data.length = 10;
      tvShows.data.length = 4;
      upcomingShows.data.length = 4;

      setShows((prevState) => ({
        ...prevState,
        featured: featuredShows.data,
        tvSeries: tvShows.data,
        upcoming: upcomingShows.data,
      }));
    } catch (err) {
      console.log(err);
      navigate("/404");
    }
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Inter", "Noto Sans", "Bebas Neue", "Lato"],
      },
    });
    getOverviewShows();
    testRequest();
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
        <Route path="/movie/:id" element={<SingleMovieView />} />

        <Route path="movies" element={<MoviesView />} />
        {/* <Route path="movie/:id" element={<SingleMovieView />} /> */}
        <Route path="upcoming" element={<UpcomingView />} />

        <Route path="*" element={<NotFoundView />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
