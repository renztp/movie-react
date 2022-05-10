import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchShowSingleData } from "../services/tmdb/tmdb.service";
import {
  BsStarHalf,
  BsHourglassSplit,
  BsCameraVideoFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ActorsData from "../components/Single/ActorsData";
import Cover from "../components/Single/Cover";
import Loading from "../components/Loading";

export default function SingleMovieView() {
  let params = useParams();
  let navigate = useNavigate();
  const imageUrl = import.meta.env.VITE_TMDB_IMAGE;
  const [isLoading, setIsLoading] = useState(true);
  const [showData, setShowData] = useState({});
  const [showCasts, setShowCasts] = useState([]);
  const [showCompanies, setShowCompanies] = useState([]);
  const [showSimilar, setShowSimilar] = useState([]);

  const testFetch = async () => {
    let response;
    try {
      response = await fetchShowSingleData(params.id, "movie");
    } catch (err) {
      console.log(err);
    }
    console.log({ source: "from testFetch", response });
  };

  const getShowData = async () => {
    let response;
    try {
      response = await fetchShowSingleData(params.id, "movie");
    } catch (err) {
      console.log(err);
      navigate("/404");
    }

    setShowData(response.resOverview);
    setShowCasts(response.resCasts);
    setShowCompanies(response.resOverview.production_companies);
    setShowSimilar(response.resSimilar);
  };

  const renderContent = () => {
    if (!isLoading) {
      return (
        <>
          <div className="overview">
            <Cover poster_path={showData.poster_path} cover_width="w500" />
            <div className="overview__info">
              <span className="rating">
                <BsStarHalf />
                {showData.vote_average}
              </span>
              <h2>{showData.title}</h2>
              <p>{showData.overview}</p>
              <ActorsData casts={showCasts} />
              <div className="controls">
                <button>Watch</button>
                <button>Add to Favourites</button>
              </div>
            </div>
          </div>
          <div className="miscdata">
            <h3>Production Companies</h3>
            <ul className="companies">
              {showCompanies.map((company) => (
                <li key={company.id}>
                  {company.logo_path ? (
                    <img src={`${imageUrl}w500${company.logo_path}`} alt="" />
                  ) : (
                    <BsCameraVideoFill />
                  )}

                  <p>{company.name}</p>
                </li>
              ))}
            </ul>
            <br />
            <h3>Similar Movies</h3>
            {showSimilar && (
              <ul className="similar-movies">
                {showSimilar.map((item) => (
                  <li key={item.id}>
                    <Link to={`/movie/${item.id}`} replace>
                      <img src={`${imageUrl}w500${item.poster_path}`} alt="" />
                      <p>{item.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      );
    } else {
      return <Loading />;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getShowData();
    testFetch();
    console.log(showSimilar);
    setIsLoading(false);
  }, [params]);

  useEffect(() => {}, [showData]);

  return (
    <div className="single-movie-view single-view">
      <div className="container">{renderContent()}</div>
    </div>
  );
}
