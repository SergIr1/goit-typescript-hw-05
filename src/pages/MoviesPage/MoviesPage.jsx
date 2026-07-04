// import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { fetchSearch } from '../../js/tmdb-api.js';
import { useDebounce } from 'use-debounce';
// import { toast } from 'react-hot-toast';
import css from './MoviesPage.module.css';

import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList.jsx';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('search') ?? '';

  const [debouncedQuery] = useDebounce(query, 5000);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getSearch = async () => {
      try {
        setIsLoading(true);

        const data = await fetchSearch(debouncedQuery);
        setMovies(data);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getSearch();
  }, [debouncedQuery]);

  const cahgeSearchText = event => {
    // console.log(event.target.value);

    const nextParams = new URLSearchParams(searchParams);

    if (event.target.value !== '') {
      nextParams.set('search', event.target.value);
    } else {
      nextParams.delete('search');
    }

    setSearchParams(nextParams);
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Search Movies</h1>
      <form className={css.form}>
        <div className={css.wrap}>
          <input
            className={css.input}
            type="text"
            name="search"
            value={query}
            onChange={cahgeSearchText}
            placeholder="Search for a movie"
          />
          <button className={css.btn} type="submit">
            Search
          </button>
        </div>
        {isLoading && <p className={css.text}>Loading...</p>}
        {error && (
          <p className={css.text}>
            Woops there was an error, please reload the page...
          </p>
        )}
        {movies.length > 0 && <MovieList movies={movies} />}
      </form>
    </div>
  );
}
