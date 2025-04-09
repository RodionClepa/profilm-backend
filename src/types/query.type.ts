export interface FilmQueryParams {
  page: number;
  includeAdult: boolean;
  imageSize: number;
}

export interface FilmTrendingQueryParams extends FilmQueryParams {
  timeWindow: TimeWindow;
}

export enum TimeWindow {
  DAY = "day",
  WEEK = "week"
}