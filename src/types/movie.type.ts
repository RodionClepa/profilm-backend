export interface RawMovie {
  id: number;
  title: string;
  overview: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface RawMovieResponse {
  page: number;
  results: RawMovie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  title: string;
  adult: boolean;
  genreIds: number[];
  releaseDate: Date;
  overview: string;
  posterPath: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}