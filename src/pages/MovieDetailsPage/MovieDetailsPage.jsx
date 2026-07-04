import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetshMovieById } from '../../js/tmdb-api';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state);

  console.log(backLinkRef);
  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetshMovieById(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovie();
  }, [movieId]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Woops there was an error, please reload the page...</p>}
      {movie && (
        <div className={css.container}>
          <Link to={backLinkRef.current}>
            <button className={css.btn} type="button">
              Go back
            </button>
          </Link>
          <div className={css.wrapDetails}>
            <img
              className={css.img}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={css.info}>
              <h1 className={css.title}>{movie.title}</h1>
              <p className={css.rating}>Rating: {movie.vote_average}</p>
              <p className={css.overview}>{movie.overview}</p>
              <p className={css.genres}>
                Genres: {movie.genres.map(({ name }) => name).join(', ')}
              </p>
            </div>
          </div>
          <ul className={css.list}>
            <li>
              <Link className={css.link} to="cast">
                Cast
              </Link>
            </li>
            <li>
              <Link className={css.link} to="reviews">
                Reviews
              </Link>
            </li>
          </ul>
          <Suspense fallback={<p>Loading cast or reviews</p>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
}
