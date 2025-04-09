import { Request, Response } from "express";
import filmApiService from "../services/filmApi.js";
import { mapMovieResponse } from "../mapper/movieMapper.js";
import { CustomRequest } from "../types/express/index.js";
import { FilmQueryParams, FilmTrendingQueryParams } from "../types/query.type.js";

export const getPopularMovies = async (req: CustomRequest<FilmQueryParams>, res: Response) => {
  const { page, includeAdult, imageSize } = req.validatedQuery;

  try {
    const movies = await filmApiService.discoverMovie({
      include_adult: includeAdult,
      include_video: 'false',
      language: 'en-US',
      page: page,
      sort_by: 'popularity.desc',
    });

    const formattedMovies = mapMovieResponse(movies, imageSize);

    res.json(formattedMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrendingMovies = async (req: CustomRequest<FilmTrendingQueryParams>, res: Response) => {
  const { page, includeAdult, imageSize, timeWindow } = req.validatedQuery;

  try {
    const movies = await filmApiService.trendingMovies({
      include_adult: includeAdult,
      include_video: 'false',
      page: page
    }, timeWindow);

    const formattedMovies = mapMovieResponse(movies, imageSize);

    res.json(formattedMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};