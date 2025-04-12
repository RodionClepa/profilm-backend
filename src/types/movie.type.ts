import { Genre } from "./genre.type.js";
import { ProductionCompany, ProductionCountry, SpokenLanguage } from "./production.type.js";

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

export interface RawMovieImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface RawMovieReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number
  };
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  url: string;
}

export interface RawMovieReviewsResult {
  page: number;
  results: RawMovieReview[];
  total_pages: number;
  total_results: number
}

export interface RawMovieVideos {
  id: number;
  results: [
    {
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: Date;
      id: string;
    },
  ]
}

export interface RawMovieDetailsResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  images: RawMovieImage[];
  reviews: RawMovieReviewsResult;
  videos: RawMovieVideos;
}

