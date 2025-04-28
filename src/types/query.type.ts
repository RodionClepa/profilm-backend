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

export enum TypeSearch {
  MOVIE = "movie",
  TV = "tv",
  PEOPLE = "people",
}

export interface SearchQueryParams {
  searchName: string;
  selectedType: string,
  page: number;
  includeAdult: boolean;
  imageSize: number;
}