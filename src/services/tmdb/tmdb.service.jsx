import axios from "axios";

const tmdb_key = import.meta.env.VITE_TMDB_APIKEY;
const tmdb_url = import.meta.env.VITE_TMDB_URL;

export const getPopularMovies = (page = 1) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${tmdb_key}&language=en-US&page=${page}`
    )
    .catch((err) => console.log(err));
};

export const generateShow = (
  page = 1,
  type = "movie",
  filter = "top_rated"
) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/${type}/${filter}?api_key=${tmdb_key}&language=en-US&page=${page}`
    )
    .catch((err) => console.log(err));
};
