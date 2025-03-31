import { Request, Response } from "express";
import movieApiService from "../services/moviesApi.js";

export const getTvGenres = async (req: Request, res: Response) => {
  try {
    const genres = await movieApiService.fetchTVGenres();

    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieGenres = async (req: Request, res: Response) => {
  try {
    const genres = await movieApiService.fetchMovieGenres();

    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};