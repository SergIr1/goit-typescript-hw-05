import axios from 'axios';

const urlTrending =
  'https://api.themoviedb.org/3/trending/movie/day?include_adult=false&language=en-US&page=1';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTgzMTI4ZjU1NDliNDVmNDQ4ZmZhMzEwYTlkODVkZSIsIm5iZiI6MTc0MjkyNjU4Mi45NzMsInN1YiI6IjY3ZTJmMmY2NGM1Mjc0NjY2NWRjYTdhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4XXMo8gRfCj8ZtSS3w6k7zzuAexDIhicPnLbvK8xnc0',
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(urlTrending, options);

  return response.data.results;
};

export const fetchSearch = async query => {
  const urlSearch = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  const resp = await axios.get(urlSearch, options);

  return resp.data.results;
};

export const fetshMovieById = async movieId => {
  const urlId = `https://api.themoviedb.org/3/movie/${movieId}?include_adult=false&language=en-US`;

  const resp = await axios.get(urlId, options);

  return resp.data;
};

export const fetchMovieCast = async movieId => {
  const urlId = `https://api.themoviedb.org/3/movie/${movieId}/credits?include_adult=false&language=en-US`;

  const resp = await axios.get(urlId, options);

  return resp.data.cast;
};

export const fetchMovieReviews = async movieId => {
  const urlId = `https://api.themoviedb.org/3/movie/${movieId}/reviews?include_adult=false&language=en-US`;

  const resp = await axios.get(urlId, options);

  return resp.data.results;
};
