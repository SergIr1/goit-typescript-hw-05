export interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export interface MovieDetailes extends Movie {
  vote_average: number;
  overview: string;
  genres: Genres[];
}

interface Genres {
  id: number;
  name: string;
}

export interface MovieCast {
  cast: Cast[];
}

export interface Cast {
  id: number;
  profile_path: string;
  name: string;
  character: string;
}

export interface MovieReviews {
  results: Reviews[];
}

export interface Reviews {
  id: string;
  author: string;
  content: string;
}
