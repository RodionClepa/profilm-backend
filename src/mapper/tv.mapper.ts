import { config, POSTER_SIZE } from "../config.js";
import { RawTVDetailsResponse, RawTVSeason, RawTVSeasonDetailsResponse, RawTVSeasonEpisodeResponse, TVDetailsResponse, TVSeason, TVSeasonDetails, TVSeasonEpisode } from "../types/tv-details.type.js";
import { RawTV, RawTVResponse, RawTVResponseTrending, RawTVTrending, TV, TVResponse } from "../types/tv.type.js";
import { mapCast } from "./credits.mapper.js";
import { mapImagesDetails } from "./image.mapper.js";
import { mapResultReviews } from "./review.mapper.js";
import { mapVideo } from "./video.mapper.js";

export const mapTV = (rawTV: RawTV, imageSize: number = 500, adult: boolean = false): TV => ({
  id: rawTV.id,
  title: rawTV.name,
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
  title: rawTV.name,
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

export const mapTVSeason = (rawSeason: RawTVSeason): TVSeason => ({
  airDate: rawSeason.air_date,
  episodeCount: rawSeason.episode_count,
  id: rawSeason.id,
  name: rawSeason.name,
  overview: rawSeason.overview,
  posterPath: `${config.FILM_IMAGE_API_URL}w${POSTER_SIZE.medium}${rawSeason.poster_path}`,
  seasonNumber: rawSeason.season_number,
  voteAverage: rawSeason.vote_average
})

export const mapTVSeasonEpisode = (rawEpisode: RawTVSeasonEpisodeResponse): TVSeasonEpisode => ({
  airDate: new Date(rawEpisode.air_date),
  episodeNumber: rawEpisode.episode_number,
  id: rawEpisode.id,
  name: rawEpisode.name,
  runtime: rawEpisode.runtime
})

export const mapTVSeasonDetails = (rawSeasonsDetails: RawTVSeasonDetailsResponse[]): TVSeasonDetails[] => {
  return rawSeasonsDetails.map((season, i) => ({
    seasonNumber: i + 1,
    id: season._id,
    airDate: new Date(season.air_date),
    episodes: season.episodes.map(mapTVSeasonEpisode)
  }))
}

export const mapTVDetailsResponse = (rawResponse: RawTVDetailsResponse): TVDetailsResponse => ({
  id: rawResponse.id,
  title: rawResponse.name,
  adult: rawResponse.adult,
  genres: rawResponse.genres,
  overview: rawResponse.overview,
  poster: config.FILM_IMAGE_API_URL + POSTER_SIZE.big + rawResponse.poster_path,
  tagline: rawResponse.tagline,
  homepage: rawResponse.homepage,
  popularity: rawResponse.popularity,
  releaseDate: new Date(rawResponse.first_air_date),
  lastAirDate: new Date(rawResponse.last_air_date),
  status: rawResponse.status,
  voteAverage: rawResponse.vote_average,
  voteCount: rawResponse.vote_count,
  images: rawResponse.images.backdrops.map(mapImagesDetails),
  reviews: mapResultReviews(rawResponse.reviews),
  videos: rawResponse.videos.results.map(mapVideo),
  cast: rawResponse.credits.cast.map(mapCast),
  recommendations: rawResponse.recommendations.results.map((tv) => mapTV(tv, 342)),
  production: rawResponse.in_production,
  numberOfEpisodes: rawResponse.number_of_episodes,
  numberOfSeasons: rawResponse.number_of_seasons,
  seasons: rawResponse.seasons.map(mapTVSeason),
  type: rawResponse.type,
  seasonsEpisodes: mapTVSeasonDetails(rawResponse.seasonsEpisodes),
})