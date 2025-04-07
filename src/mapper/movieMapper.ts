import { config } from "../config.js";
import { Movie, MovieResponse, RawMovie, RawMovieResponse } from "../types/movie.type.js";

export const mapMovie = (rawMovie: RawMovie, imageSize: number = 500): Movie => ({
  id: rawMovie.id,
  title: rawMovie.title,
  adult: rawMovie.adult,
  genreIds: rawMovie.genre_ids,
  releaseDate: new Date(rawMovie.release_date),
  overview: rawMovie.overview,
  posterPath: config.POSTER_MOVIE_API_URL.replace('w500', `w${imageSize}`) + rawMovie.poster_path,
});

export const mapMovieResponse = (rawResponse: RawMovieResponse, imageSize: number = 500): MovieResponse => ({
  page: rawResponse.page,
  results: rawResponse.results.map((movie) => mapMovie(movie, imageSize)),
  totalPages: rawResponse.total_pages,
  totalResults: rawResponse.total_results
});