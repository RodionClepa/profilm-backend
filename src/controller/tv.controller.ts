import { Request, Response } from "express";
import filmApiService from "../services/filmApi.js";
import { mapTVResponse } from "../mapper/tvMapper.js";

export const getPopularTV = async (req: Request, res: Response) => {
  const { page, includeAdult, imageSize } = req.validatedQuery;

  try {
    const tvs = await filmApiService.getTVPopular({
      include_adult: includeAdult,
      include_video: 'false',
      language: 'en-US',
      page: page,
      sort_by: 'popularity.desc',
    });

    const formattedTVs = mapTVResponse(tvs, imageSize);

    res.json(formattedTVs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};