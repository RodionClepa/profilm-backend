import { Request, Response } from "express";
import filmApiService from "../services/film-api.service.js";

export const getTvGenres = async (req: Request, res: Response) => {
  try {
    const genres = await filmApiService.fetchTVGenres();

    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieGenres = async (req: Request, res: Response) => {
  try {
    const genres = await filmApiService.fetchMovieGenres();

    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};