import React, { useState, useEffect } from "react";
import ShowGroup from "../components/ShowGroup";
import { useNavigate } from "react-router-dom";
import { generateShow } from "../services/tmdb/tmdb.service";
import Loading from "../components/Loading";

export default function UpcomingView() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  let fetchShows = async () => {
    let showsData;
    try {
      showsData = await generateShow(1, "movie", "upcoming");
    } catch (err) {
      console.log(err);
      navigate("/404");
    }
    console.log(showsData);
    setShows(showsData.data);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchShows();
    setIsLoading(false);
  }, []);

  return (
    <div className="upcoming-view">
      <div className="container">
        <ShowGroup title="Upcoming Movies" groupUrl={false} items={shows} />
      </div>
    </div>
  );
}
