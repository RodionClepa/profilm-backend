import { Request, Response } from "express";
import movieApiService from "../services/moviesApi.js";
import { mapMovieResponse } from "../mapper/movieMapper.js";
import { CustomRequest } from "../types/express/index.js";
import { FilmQueryParams } from "../types/query.type.js";

export const getPopularMovies = async (req: CustomRequest<FilmQueryParams>, res: Response) => {
  console.log("req-query", req.validatedQuery);
  const page = req.validatedQuery.page;
  const include_adult = req.validatedQuery.include_adult;
  const imageSize = req.validatedQuery.imageSize;

  try {
    const movies = await movieApiService.getMoviesPopular({
      include_adult: include_adult,
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