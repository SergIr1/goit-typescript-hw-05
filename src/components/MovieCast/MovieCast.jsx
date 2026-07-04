import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../js/tmdb-api';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieCast(movieId);
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      <ul className={css.list}>
        {movies.length > 0 &&
          movies.map(({ id, profile_path, name, character }) => (
            <li className={css.item} key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                alt={name}
              />
              <p>{name}</p>
              <p>as {character}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
