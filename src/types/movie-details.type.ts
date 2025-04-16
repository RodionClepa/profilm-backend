import { CastResponse, RawCast, RawCrew } from "./credits.type.js";
import { Genre } from "./genre.type.js";
import { ImageResponse, RawDetailsImages } from "./images.type.js";
import { Movie, RawMovie } from "./movie.type.js";
import { RawProductionCompany, RawProductionCountry, SpokenLanguage, ProductionCompany } from "./production.type.js";
import { RawReviewsResult, ReviewsResult } from "./reviews.type.js";
import { RawMovieVideos, VideoResponse } from "./video.type.js";

export interface RawMovieCreditResponse {
  id: number;
  cast: RawCast[];
  crew: RawCrew[];
}

export interface RawMovieRecommendationsResponse {
  page: number;
  results: RawMovie[];
  total_pages: number;
  total_results: number;
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
  images: RawDetailsImages;
  reviews: RawReviewsResult;
  videos: RawMovieVideos;
  credits: RawMovieCreditResponse;
  recommendations: RawMovieRecommendationsResponse;
}

export interface MovieCrew {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  popularity: number;
  profilePath: string | null;
  job: string;
}

export interface MovieDetailsResponse {
  id: number;
  title: string;
  adult: boolean;
  budget: number;
  genres: Genre[];
  overview: string;
  poster: string;
  popularity: number;
  tagline: string;
  runtime: number;
  releaseDate: Date;
  revenue: number;
  status: string;
  voteAverage: number;
  voteCount: number;
  productionCompanies: ProductionCompany[];
  images: ImageResponse[];
  reviews: ReviewsResult;
  videos: VideoResponse[];
  director: MovieCrew | null;
  producer: MovieCrew | null;
  cast: CastResponse[];
  recommendations: Movie[];
}