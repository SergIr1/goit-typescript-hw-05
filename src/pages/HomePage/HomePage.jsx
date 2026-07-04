import { fetchTrendingMovies } from '../../js/tmdb-api.js';
import { useEffect, useState } from 'react';
import css from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList.jsx';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchTrendingMovies();
        setMovies(data);
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
