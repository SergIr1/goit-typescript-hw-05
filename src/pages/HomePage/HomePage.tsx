import { fetchTrendingMovies } from '../../js/tmdb-api.js';
import { useEffect, useState } from 'react';
import css from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { Movie } from '../../types/global';

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchTrendingMovies();
        // console.log(data);
        setMovies(data.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Treding Movies</h1>
      {isLoading && <p>Loading movies...</p>}
      {error && <p>Woops there was an error, please reload the page...</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
