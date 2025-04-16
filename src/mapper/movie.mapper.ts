import { config, JOB_TITLE, LOGO_SIZES, POSTER_SIZE, PROFILE_SIZES } from "../config.js";
import { RawCrew } from "../types/credits.type.js";
import { RawMovieDetailsResponse, MovieDetailsResponse, MovieCrew } from "../types/movie-details.type.js";
import { Movie, MovieResponse, RawMovie, RawMovieResponse } from "../types/movie.type.js";
import { ProductionCompany, RawProductionCompany } from "../types/production.type.js";
import { mapCast } from "./credits.mapper.js";
import { mapImagesDetails } from "./image.mapper.js";
import { mapResultReviews } from "./review.mapper.js";
import { mapVideo } from "./video.mapper.js";

export const mapMovie = (rawMovie: RawMovie, imageSize: number = 500): Movie => ({
  id: rawMovie.id,
  title: rawMovie.title,
  adult: rawMovie.adult,
  genreIds: rawMovie.genre_ids,
  releaseDate: new Date(rawMovie.release_date),
  overview: rawMovie.overview,
  posterPath: `${config.FILM_IMAGE_API_URL}w${imageSize}${rawMovie.poster_path}`,
});

export const mapMovieResponse = (rawResponse: RawMovieResponse, imageSize: number = 500): MovieResponse => ({
  page: rawResponse.page,
  results: rawResponse.results.map((movie) => mapMovie(movie, imageSize)),
  totalPages: rawResponse.total_pages,
  totalResults: rawResponse.total_results
});

export const mapMovieProductionCompany = (rawMovieCompany: RawProductionCompany): ProductionCompany => ({
  id: rawMovieCompany.id,
  logoPath: config.FILM_IMAGE_API_URL + LOGO_SIZES.medium + rawMovieCompany.logo_path,
  name: rawMovieCompany.name,
  originCountry: rawMovieCompany.origin_country
})

export const extractByJob = (rawMovieCrew: RawCrew[], jobName: string): MovieCrew | null => {
  const crewMember = rawMovieCrew.find(crewMember => crewMember.job === jobName);

  if (crewMember) {
    return {
      adult: crewMember.adult,
      gender: crewMember.gender,
      id: crewMember.id,
      name: crewMember.name,
      popularity: crewMember.popularity,
      profilePath: config.FILM_IMAGE_API_URL + PROFILE_SIZES.medium + crewMember.profile_path,
      job: crewMember.job
    };
  } else {
    return null;
  }
};

export const mapMovieDetailsResponse = (rawResponse: RawMovieDetailsResponse): MovieDetailsResponse => ({
  id: rawResponse.id,
  title: rawResponse.title,
  adult: rawResponse.adult,
  budget: rawResponse.budget,
  genres: rawResponse.genres,
  overview: rawResponse.overview,
  poster: config.FILM_IMAGE_API_URL + POSTER_SIZE.big + rawResponse.poster_path,
  tagline: rawResponse.tagline,
  runtime: rawResponse.runtime,
  popularity: rawResponse.popularity,
  releaseDate: new Date(rawResponse.release_date),
  revenue: rawResponse.revenue,
  status: rawResponse.status,
  voteAverage: rawResponse.vote_average,
  voteCount: rawResponse.vote_count,
  productionCompanies: rawResponse.production_companies.map(mapMovieProductionCompany),
  images: rawResponse.images.backdrops.map(mapImagesDetails),
  reviews: mapResultReviews(rawResponse.reviews),
  videos: rawResponse.videos.results.map(mapVideo),
  director: extractByJob(rawResponse.credits.crew, JOB_TITLE.DIRECTOR),
  producer: extractByJob(rawResponse.credits.crew, JOB_TITLE.PRODUCER),
  cast: rawResponse.credits.cast.map(mapCast),
  recommendations: rawResponse.recommendations.results.map((movie) => mapMovie(movie, 342))
})