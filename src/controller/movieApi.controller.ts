import { Request, Response } from "express";
import MovieApiService from "../services/moviesApi.js";
import movieApiService from "../services/moviesApi.js";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await movieApiService.fetchMovies({
      include_adult: 'false',
      include_video: 'false',
      language: 'en-US',
      page: 1,
      sort_by: 'popularity.desc',
    });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};