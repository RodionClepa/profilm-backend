import { Request, Response } from "express";
import movieApiService from "../services/moviesApi.js";
import { mapMovieResponse } from "../mapper/movieMapper.js";

export const getPopularMovies = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const include_adult = req.query.include_adult === 'true';

  if (page < 1 || page > 500) {
    res.status(400).json({ message: "Pages should start at 1 and max at 500" });
    return;
  }

  try {
    const movies = await movieApiService.getMoviesPopular({
      include_adult: include_adult,
      include_video: 'false',
      language: 'en-US',
      page: page,
      sort_by: 'popularity.desc',
    });

    const formattedMovies = mapMovieResponse(movies);

    res.json(formattedMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};