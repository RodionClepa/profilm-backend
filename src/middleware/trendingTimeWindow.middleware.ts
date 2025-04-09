import { Request, Response, NextFunction } from 'express';
import { FilmTrendingQueryParams, TimeWindow } from '../types/query.type.js';
import { CustomRequest } from '../types/express/index.js';

export const trendingTimeWindow = (req: CustomRequest<FilmTrendingQueryParams>, res: Response, next: NextFunction): void => {
  const timeWindow = req.query.timeWindow as string | undefined;

  if (!(timeWindow && Object.values(TimeWindow).includes(timeWindow as TimeWindow))) {
    res.status(400).json({ message: "Invalid timeWindow query parameter" });
    return;
  }

  req.validatedQuery = { ...req.validatedQuery, timeWindow: timeWindow as TimeWindow };
  next();
};