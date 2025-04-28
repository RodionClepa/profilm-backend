import { Response } from "express";
import filmApiService from "../services/film-api.service.js";
import { CustomRequest } from "../types/express/index.js";
import { SearchQueryParams, TypeSearch } from "../types/query.type.js";
import { mapMovieResponse } from "../mapper/movie.mapper.js";

export const searchMedia = async (req: CustomRequest<SearchQueryParams>, res: Response) => {
  const { page, includeAdult, searchName, selectedType, imageSize } = req.validatedQuery;

  try {
    if (TypeSearch.MOVIE === selectedType) {
      const movies = await filmApiService.searchMovie(page, includeAdult, searchName);

      const formattedMovies = mapMovieResponse(movies, imageSize);

      res.json(formattedMovies);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};