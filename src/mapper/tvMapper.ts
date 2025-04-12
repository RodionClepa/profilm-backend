import { config } from "../config.js";
import { RawTV, RawTVResponse, RawTVResponseTrending, RawTVTrending, TV, TVResponse } from "../types/tv.type.js";

export const mapTV = (rawTV: RawTV, imageSize: number = 500, adult: boolean = false): TV => ({
  id: rawTV.id,
  name: rawTV.name,
  genreIds: rawTV.genre_ids,
  adult: adult,
  releaseDate: new Date(rawTV.first_air_date),
  overview: rawTV.overview,
  posterPath: `${config.FILM_IMAGE_API_URL}w${imageSize}${rawTV.poster_path}`,
});

export const mapTVResponse = (rawResponse: RawTVResponse, imageSize: number = 500, adult: boolean = false): TVResponse => ({
  page: rawResponse.page,
  results: rawResponse.results.map((tv) => mapTV(tv, imageSize, adult)),
  totalPages: rawResponse.total_pages,
  totalResults: rawResponse.total_results
});

export const mapTVTrending = (rawTV: RawTVTrending, imageSize: number = 500, adult: boolean = false): TV => ({
  id: rawTV.id,
  name: rawTV.name,
  genreIds: rawTV.genre_ids,
  adult: adult,
  releaseDate: new Date(rawTV.first_air_date),
  overview: rawTV.overview,
  posterPath: `${config.FILM_IMAGE_API_URL}w${imageSize}${rawTV.poster_path}`,
});

export const mapTVResponseTrending = (rawResponse: RawTVResponseTrending, imageSize: number = 500, adult: boolean = false): TVResponse => ({
  page: rawResponse.page,
  results: rawResponse.results.map((tv) => mapTVTrending(tv, imageSize, adult)),
  totalPages: rawResponse.total_pages,
  totalResults: rawResponse.total_results
});