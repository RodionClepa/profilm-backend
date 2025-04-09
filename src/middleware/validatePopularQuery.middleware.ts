import { Request, Response, NextFunction } from 'express';
import { FilmQueryParams } from '../types/query.type.js';
import { CustomRequest } from '../types/express/index.js';

export const validatePopularMoviesQuery = (req: CustomRequest<FilmQueryParams>, res: Response, next: NextFunction): void => {
  const page = parseInt(req.query.page as string) || 1;
  const includeAdult = req.query.includeAdult === 'true';
  const imageSize = parseInt(req.query.imageSize as string) || 500;

  if (page < 1 || page > 500) {
    res.status(400).json({ message: "Pages should start at 1 and max at 500" });
    return;
  }

  req.validatedQuery = { page, includeAdult, imageSize };
  next();
};