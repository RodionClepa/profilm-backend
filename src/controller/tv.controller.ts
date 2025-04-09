import { Request, Response } from "express";
import filmApiService from "../services/filmApi.js";
import { mapTVResponse, mapTVResponseTrending } from "../mapper/tvMapper.js";
import { FilmTrendingQueryParams } from "../types/query.type.js";
import { CustomRequest } from "../types/express/index.js";

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