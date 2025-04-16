import { CastResponse, RawCast, RawCrew } from "./credits.type.js";
import { Genre } from "./genre.type.js";
import { ImageResponse, RawTVDetailsImages } from "./images.type.js";
import { RawProductionCompany, RawProductionCountry, SpokenLanguage } from "./production.type.js";
import { RawReviewsResult, ReviewsResult } from "./reviews.type.js";
import { RawTVResponse, TV } from "./tv.type.js";
import { RawTVVideos, VideoResponse } from "./video.type.js";


export interface RawCreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
}

export interface RawEpisodeAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

export interface RawTVNetwork {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface RawTVSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface RawTVCredits {
  cast: RawCast[];
  crew: RawCrew[];
}

export interface RawTVSeasonEpisodeResponse {
  air_date: string,
  episode_number: number,
  id: number,
  name: string,
  overview: string,
  production_code: string,
  runtime: number,
  season_number: number,
  show_id: number,
  still_path: string,
  vote_average: number,
  vote_count: number,
  crew: RawCrew[],
  guest_stars: RawCast[],
}

export interface RawTVSeasonDetailsResponse {
  _id: string,
  air_date: string,
  episodes: RawTVSeasonEpisodeResponse[];
}

export interface RawTVDetailsResponse {
  adult: boolean;
  backdrop_path: string;
  created_by: RawCreatedBy[];
  episode_run_time: number[]; // Api returns empty array
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: RawEpisodeAir;
  name: string;
  next_episode_to_air: RawEpisodeAir;
  networks: RawTVNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: RawProductionCompany[];
  production_countries: RawProductionCountry[];
  seasons: RawTVSeason[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  images: RawTVDetailsImages;
  reviews: RawReviewsResult;
  videos: RawTVVideos;
  credits: RawTVCredits;
  recommendations: RawTVResponse;
  seasonsEpisodes: RawTVSeasonDetailsResponse[];
}

export interface TVSeason {
  airDate: string;
  episodeCount: number;
  id: number;
  name: string;
  overview: string;
  posterPath: string;
  seasonNumber: number;
  voteAverage: number;
}

export interface TVSeasonEpisode {
  airDate: Date;
  episodeNumber: number;
  id: number;
  name: string;
  runtime: number;
}

export interface TVSeasonDetails {
  id: string;
  seasonNumber: number;
  airDate: Date;
  episodes: TVSeasonEpisode[];
}

export interface TVDetailsResponse {
  adult: boolean;
  releaseDate: Date;
  genres: Genre[];
  homepage: string;
  id: number;
  production: boolean;
  lastAirDate: Date;
  title: string;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  overview: string;
  popularity: number;
  poster: string;
  seasons: TVSeason[];
  status: string;
  tagline: string;
  type: string;
  voteAverage: number;
  voteCount: number;
  images: ImageResponse[];
  reviews: ReviewsResult;
  videos: VideoResponse[];
  cast: CastResponse[];
  recommendations: TV[];
  seasonsEpisodes: TVSeasonDetails[];
}