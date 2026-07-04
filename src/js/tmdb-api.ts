import axios from 'axios';
import {
  Cast,
  Movie,
  MovieCast,
  MovieDetailes,
  MovieReviews,
} from '../types/global';

const urlTrending =
  'https://api.themoviedb.org/3/trending/movie/day?include_adult=false&language=en-US&page=1';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTgzMTI4ZjU1NDliNDVmNDQ4ZmZhMzEwYTlkODVkZSIsIm5iZiI6MTc0MjkyNjU4Mi45NzMsInN1YiI6IjY3ZTJmMmY2NGM1Mjc0NjY2NWRjYTdhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4XXMo8gRfCj8ZtSS3w6k7zzuAexDIhicPnLbvK8xnc0',
  },
};

interface SearchCollectionMovies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchTrendingMovies =
  async (): Promise<SearchCollectionMovies> => {
    const response = await axios.get<SearchCollectionMovies>(
      urlTrending,
      options
    );

    return response.data;
  };

export const fetchSearch = async (
  query: string
): Promise<SearchCollectionMovies> => {
  const urlSearch = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  const resp = await axios.get<SearchCollectionMovies>(urlSearch, options);

  return resp.data;
};

export const fetshMovieById = async (
  movieId: string
): Promise<MovieDetailes> => {
  const urlId = `https://api.themoviedb.org/3/movie/${movieId}?include_adult=false&language=en-US`;

  const resp = await axios.get<MovieDetailes>(urlId, options);

  return resp.data;
};

export const fetchMovieCast = async (movieId: string): Promise<MovieCast> => {
  const urlId = `https://api.themoviedb.org/3/movie/${movieId}/credits?include_adult=false&language=en-US`;

  const resp = await axios.get<MovieCast>(urlId, options);

  return resp.data;
};

export const fetchMovieReviews = async (
  movieId: string
): Promise<MovieReviews> => {
  const urlId = `https://api.themoviedb.org/3/movie/${movieId}/reviews?include_adult=false&language=en-US`;

  const resp = await axios.get<MovieReviews>(urlId, options);

  return resp.data;
};
