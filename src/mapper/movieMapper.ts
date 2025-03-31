import { config } from "../config.js";
import { Movie, MovieResponse, RawMovie, RawMovieResponse } from "../types/movie.type.js";

export const mapMovie = (rawMovie: RawMovie): Movie => ({
  id: rawMovie.id,
  title: rawMovie.title,
  adult: rawMovie.adult,
  genreIds: rawMovie.genre_ids,
  releaseDate: new Date(rawMovie.release_date),
  overview: rawMovie.overview,
  posterPath: config.POSTER_MOVIE_API_URL + rawMovie.poster_path,
});

export const mapMovieResponse = (rawResponse: RawMovieResponse): MovieResponse => ({
  page: rawResponse.page,
  results: rawResponse.results.map(mapMovie),
  totalPages: rawResponse.total_pages,
  totalResults: rawResponse.total_results
});