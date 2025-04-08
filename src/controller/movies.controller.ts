import { Request, Response } from "express";
import filmApiService from "../services/filmApi.js";
import { mapMovieResponse } from "../mapper/movieMapper.js";
import { CustomRequest } from "../types/express/index.js";
import { FilmQueryParams } from "../types/query.type.js";

export const getPopularMovies = async (req: CustomRequest<FilmQueryParams>, res: Response) => {
  const { page, includeAdult, imageSize } = req.validatedQuery;

  try {
    const movies = await filmApiService.getMoviesPopular({
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