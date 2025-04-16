import { Request, Response } from "express";
import filmApiService from "../services/film-api.service.js";
import { mapTVDetailsResponse, mapTVResponse, mapTVResponseTrending } from "../mapper/tv.mapper.js";
import { FilmTrendingQueryParams } from "../types/query.type.js";
import { CustomRequest } from "../types/express/index.js";
import { NotFoundError } from "../errors/not-found.errors.js";

export const getPopularTV = async (req: CustomRequest<FilmTrendingQueryParams>, res: Response) => {
  const { page, includeAdult, imageSize } = req.validatedQuery;

  try {
    const tvs = await filmApiService.discoverTV({
      include_adult: includeAdult,
      include_video: 'false',
      language: 'en-US',
      page: page,
      sort_by: 'popularity.desc',
      'primary_release_date.lte': new Date().toISOString().split('T')[0]
    });

    const formattedTVs = mapTVResponse(tvs, imageSize, includeAdult);

    res.json(formattedTVs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrendingTVs = async (req: CustomRequest<FilmTrendingQueryParams>, res: Response) => {
  const { page, includeAdult, imageSize, timeWindow } = req.validatedQuery;

  try {
    const tvs = await filmApiService.trendingTVs({
      include_adult: includeAdult,
      include_video: 'false',
      page: page
    }, timeWindow);

    const formattedTVs = mapTVResponseTrending(tvs, imageSize);

    res.json(formattedTVs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTVDetails = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const tvId: number = parseInt(id, 10);

  if (isNaN(tvId)) {
    res.status(400).send('Invalid tv ID');
    return;
  }

  try {
    const tv = await filmApiService.detailsTV(tvId);

    const formattedTVs = mapTVDetailsResponse(tv);

    res.json(formattedTVs);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error('Error in getTVDetails:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}