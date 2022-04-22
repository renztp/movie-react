import axios from "axios";

const tmdb_key = import.meta.env.VITE_TMDB_APIKEY;
const tmdb_url = import.meta.env.VITE_TMDB_URL;

export const generateShow = (
  page = 1,
  type = "movie",
  filter = "top_rated"
) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/${type}/${filter}?api_key=${tmdb_key}&language=en-US&page=${page}`
    )
    .then((res) => ({ status: 200, data: [...res.data.results] }))
    .catch((err) => ({
      status: 404,
      message: "Something went wrong on fetching TMDB Api",
    }));
};

export const fetchShowData = (id, type) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${tmdb_key}&language=en-US`
    )
    .then((res) => ({ status: 200, data: res.data }))
    .catch((err) => ({
      status: 400,
      message: "Something went wrong on fetching TMDB Api",
    }));
};

export const fetchShowCredits = (id, type = "movie") => {
  // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${tmdb_key}&language=en-US`
    )
    .then((res) => ({ status: 200, data: res.data }))
    .catch((err) => ({
      status: 400,
      message: "Something went wrong on fetching TMDB Api",
    }));
};

export const fetchShowSingleData = (id, type) => {
  const showOverview = axios.get(
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${tmdb_key}&language=en-US`
  );
  const showCasts = axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${tmdb_key}&language=en-US`
  );
  const showSimilar = axios.get(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${tmdb_key}&language=en-US&page=1`
  );
  return axios
    .all([showOverview, showCasts, showSimilar])
    .then(
      axios.spread(function (resOverview, resCasts, resSimilar) {
        let limitCasts = resCasts.data.cast;
        let limitSimilar = resSimilar.data.results;
        limitCasts.length = 6;
        limitSimilar.length = 6;
        return {
          // resCrew: resCasts.data,
          resSimilar: limitSimilar,
          resOverview: resOverview.data,
          resCasts: limitCasts,
        };
      })
    )
    .catch((err) => ({
      status: 400,
      message: "Something went wrong on fetching TMDB Api",
    }));
};
