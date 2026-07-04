import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../js/tmdb-api';
import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getInfo();
  }, [movieId]);
  return (
    <div className={css.container}>
      <h2 className={css.title}>Reviews</h2>
      <ul className={css.list}>
        {isLoading && <p className={css.loading}>Loading...</p>}
        {error && <p className={css.error}>Error...</p>}
        {reviews.length > 0 ? (
          reviews.map(({ id, author, content }) => (
            <li className={css.item} key={id}>
              <h3 className={css.author}>Author: {author}</h3>
              <p className={css.content}>{content}</p>
            </li>
          ))
        ) : (
          <p className={css.noReviews}>No reviews available for this movie.</p>
        )}
      </ul>
    </div>
  );
}
