import axios from "axios";
// const API_KEY = "0980648f34ca3c5c15bd33c187ec8327";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTgwNjQ4ZjM0Y2EzYzVjMTViZDMzYzE4N2VjODMyNyIsIm5iZiI6MTczMTQ5MDQ0NC41MzcwMDM4LCJzdWIiOiI2NzM0NzBlYWE2N2UzNmJiNjY4ZDhjZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VLeQT31mMUXkyvpjyRh9DexSAvP7l9VUozndE_bDwow";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    accept: "application/json",
  },
  params: {
    language: "en-US",
  },
};

const searchMovie = async (query, page = 1) => {
  if (!query) return console.log("Query is empty!");
  const response = await axios(`search/movie`, {
    ...options,
    params: { ...options.params, include_adult: false, query, page },
  });
  return response.data;
};

const trendingMovie = async (page = 1) => {
  const response = await axios(`trending/movie/day`, {
    ...options,
    params: {
      ...options.params,
      include_adult: false,
      page,
    },
  });
  return response.data;
};

const detailsMovie = async (movieId) => {
  const response = await axios(`movie/${movieId}`, options);
  return response.data;
};

const reviewsMovie = async (movieId, page = 1) => {
  const response = await axios(`movie/${movieId}/reviews`, {
    ...options,
    params: { ...options.params, page },
  });
  return response.data;
};

const creditsMovie = async (movieId) => {
  const response = await axios(`movie/${movieId}/credits`, options);
  return response.data;
};

export { searchMovie, trendingMovie, detailsMovie, reviewsMovie, creditsMovie };
