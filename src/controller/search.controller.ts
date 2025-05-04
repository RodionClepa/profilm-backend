import { Response } from "express";
import filmApiService from "../services/film-api.service.js";
import { CustomRequest } from "../types/express/index.js";
import { SearchQueryParams } from "../types/query.type.js";
import { mapMovieResponse } from "../mapper/movie.mapper.js";
import { mapTVResponse } from "../mapper/tv.mapper.js";

export const searchMovies = async (req: CustomRequest<SearchQueryParams>, res: Response) => {
  const { page, includeAdult, searchName, imageSize } = req.validatedQuery;

  try {
    const movies = await filmApiService.searchMovie(page, includeAdult, searchName);
    const formattedMovies = mapMovieResponse(movies, imageSize);
    res.json(formattedMovies);
    // const tvs = await filmApiService.searchTV(page, includeAdult, searchName);
    // const formattedTVs = mapTVResponse(tvs, imageSize);
    // res.json(formattedTVs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchTVs = async (req: CustomRequest<SearchQueryParams>, res: Response) => {
  const { page, includeAdult, searchName, imageSize } = req.validatedQuery;

  try {
    const tvs = await filmApiService.searchTV(page, includeAdult, searchName);
    const formattedTVs = mapTVResponse(tvs, imageSize);
    res.json(formattedTVs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};