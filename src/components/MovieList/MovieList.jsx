import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div>
      <ul className={css.list}>
        {movies.map(({ id, title, poster_path }) => (
          <li className={css.item} key={id}>
            <Link to={`/movies/${id}`} state={location}>
              <img
                className={css.img}
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
              />
              <h3 className={css.title}>{title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
