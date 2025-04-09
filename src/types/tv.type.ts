export interface RawTV {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface RawTVResponse {
  page: number;
  results: RawTV[];
  total_pages: number;
  total_results: number;
}

export interface TV {
  id: number;
  name: string;
  genreIds: number[];
  adult: boolean;
  releaseDate: Date;
  overview: string;
  posterPath: string;
}

export interface TVResponse {
  page: number;
  results: TV[];
  totalPages: number;
  totalResults: number;
}

// TRENDING
export interface RawTVTrending {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  media_type: string;
}

export interface RawTVResponseTrending {
  page: number;
  results: RawTVTrending[];
  total_pages: number;
  total_results: number;
}