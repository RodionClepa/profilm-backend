import { config } from "../config.js";
import { RawMovieImage, MovieImage, RawMovieReview, MovieReview, RawMovieReviewsResult, MovieReviewsResult, RawMovieVideos, MovieVideo, RawMovieDetailsResponse, MovieDetailsResponse } from "../types/movie-details.type.js";
import { Movie, MovieResponse, RawMovie, RawMovieResponse } from "../types/movie.type.js";
import { ProductionCompany, RawProductionCompany } from "../types/production.type.js";

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


export const mapMovieImagesDetails = (rawImage: RawMovieImage): MovieImage[] => (
  rawImage.backdrops.map((image) => ({
    filePath: config.FILM_IMAGE_API_URL + 'w1280' + image.file_path,
    voteAverage: image.vote_average,
    voteCount: image.vote_count
  }))
)

export const mapMovieReview = (rawMovieReview: RawMovieReview): MovieReview => ({
  id: rawMovieReview.id,
  author: rawMovieReview.author,
  avatarPath: config.FILM_IMAGE_API_URL + 'w154' + rawMovieReview.author_details.avatar_path,
  rating: rawMovieReview.author_details.rating,
  content: rawMovieReview.content,
})

export const mapMovieResultReviews = (rawReviewResult: RawMovieReviewsResult): MovieReviewsResult => ({
  page: rawReviewResult.page,
  results: rawReviewResult.results.map(mapMovieReview),
  totalPages: rawReviewResult.total_pages,
  totalResults: rawReviewResult.total_results
})

export const mapMovieVideos = (rawMovieVideo: RawMovieVideos): MovieVideo[] => (
  rawMovieVideo.results.map((video) => ({
    id: video.id,
    name: video.name,
    official: video.official,
    link: config.YOUTUBE_VIDEOS + video.key
  }))
)

export const mapMovieProductionCompany = (rawMovieCompany: RawProductionCompany): ProductionCompany => ({
  id: rawMovieCompany.id,
  logoPath: config.FILM_IMAGE_API_URL + 'w154' + rawMovieCompany.logo_path,
  name: rawMovieCompany.name,
  originCountry: rawMovieCompany.origin_country
})

export const mapMovieDetailsResponse = (rawResponse: RawMovieDetailsResponse): MovieDetailsResponse => ({
  title: rawResponse.title,
  adult: rawResponse.adult,
  budget: rawResponse.budget,
  genres: rawResponse.genres,
  overview: rawResponse.overview,
  poster: config.FILM_IMAGE_API_URL + 'w780' + rawResponse.poster_path,
  popularity: rawResponse.popularity,
  releaseDate: new Date(rawResponse.release_date),
  revenue: rawResponse.revenue,
  status: rawResponse.status,
  voteAverage: rawResponse.vote_average,
  voteCount: rawResponse.vote_count,
  productionCompanies: rawResponse.production_companies.map(mapMovieProductionCompany),
  images: mapMovieImagesDetails(rawResponse.images),
  reviews: mapMovieResultReviews(rawResponse.reviews),
  videos: mapMovieVideos(rawResponse.videos)
})