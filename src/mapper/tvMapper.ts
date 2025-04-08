import { config } from "../config.js";
import { RawTV, RawTVResponse, TV, TVResponse } from "../types/tv.type.js";

export const mapTV = (rawTV: RawTV, imageSize: number = 500, adult: boolean = false): TV => ({
  id: rawTV.id,
  name: rawTV.name,
  genreIds: rawTV.genre_ids,
  adult: adult,
  releaseDate: new Date(rawTV.first_air_date),
  overview: rawTV.overview,
  posterPath: `${config.POSTER_FILM_API_URL}w${imageSize}${rawTV.poster_path}`,
});

export const mapTVResponse = (rawResponse: RawTVResponse, imageSize: number = 500, adult: boolean = false): TVResponse => ({
  page: rawResponse.page,
  results: rawResponse.results.map((tv) => mapTV(tv, imageSize, adult)),
  totalPages: rawResponse.total_pages,
  totalResults: rawResponse.total_results
});