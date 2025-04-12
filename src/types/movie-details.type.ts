import { Genre } from "./genre.type.js";
import { RawProductionCompany, RawProductionCountry, SpokenLanguage, ProductionCompany } from "./production.type.js";

export interface RawMovieImage {
  backdrops: [
    {
      aspect_ratio: number;
      height: number;
      iso_639_1: string;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }
  ]
}

export interface RawMovieReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number | null;
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
  total_results: number;
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
  title: string;
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
  production_companies: RawProductionCompany[];
  production_countries: RawProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  images: RawMovieImage;
  reviews: RawMovieReviewsResult;
  videos: RawMovieVideos;
}

export interface MovieImage {
  filePath: string
  voteAverage: number;
  voteCount: number;
}

export interface MovieReview {
  id: string;
  author: string;
  avatarPath: string;
  rating: number | null;
  content: string;
}

export interface MovieReviewsResult {
  page: number;
  results: MovieReview[];
  totalPages: number;
  totalResults: number;
}

export interface MovieVideo {
  id: string;
  name: string;
  official: boolean;
  link: string;
}

export interface MovieDetailsResponse {
  title: string;
  adult: boolean;
  budget: number;
  genres: Genre[];
  overview: string;
  poster: string;
  popularity: number;
  releaseDate: Date;
  revenue: number;
  status: string;
  voteAverage: number;
  voteCount: number;
  productionCompanies: ProductionCompany[];
  images: MovieImage[];
  reviews: MovieReviewsResult;
  videos: MovieVideo[];
}