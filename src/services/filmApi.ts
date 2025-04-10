import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '../config.js';
import cacheService from './cacheService.js';
import { GenreApiResponse } from '../types/genre.type.js';
import { RawMovieResponse } from '../types/movie.type.js';
import { RawTVResponse, RawTVResponseTrending, RawTVTrending } from '../types/tv.type.js';
import { TimeWindow } from '../types/query.type.js';

class FilmApiService {
  private axiosInstance: AxiosInstance;
  private apiUrl: string;

  constructor(private apiKey: string) {
    this.apiUrl = config.FILM_API_URL;
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });
  }

  async discoverMovie(params: any): Promise<RawMovieResponse> {
    const cacheKey = JSON.stringify({ function: "getMoviesPopular", params });
    const cachedData = cacheService.get<RawMovieResponse>(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response: AxiosResponse<RawMovieResponse> = await this.axiosInstance.get<RawMovieResponse>('/discover/movie', { params });
      cacheService.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new Error('Failed to fetch movie data');
    }
  }

  async discoverTV(params: any): Promise<RawTVResponse> {
    const cacheKey = JSON.stringify({ function: "discoverTV", params });
    const cachedData = cacheService.get<RawTVResponse>(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response: AxiosResponse<RawTVResponse> = await this.axiosInstance.get<RawTVResponse>('/discover/tv', { params });
      cacheService.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching tvs:', error);
      throw new Error('Failed to fetch tvs data');
    }
  }

  async trendingMovies(params: any, timeWindow: TimeWindow): Promise<RawMovieResponse> {
    const cacheKey = JSON.stringify({ function: "trendingMovies", params, timeWindow });
    const cachedData = cacheService.get<RawMovieResponse>(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response: AxiosResponse<RawMovieResponse> = await this.axiosInstance.get<RawMovieResponse>(`/trending/movie/${timeWindow}`, { params });
      cacheService.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching Trending Movies:', error);
      throw new Error('Failed to fetch Trending Movies data');
    }
  }

  async trendingTVs(params: any, timeWindow: TimeWindow): Promise<RawTVResponseTrending> {
    const cacheKey = JSON.stringify({ function: "trendingTVs", params, timeWindow });
    const cachedData = cacheService.get<RawTVResponseTrending>(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response: AxiosResponse<RawTVResponseTrending> = await this.axiosInstance.get<RawTVResponseTrending>(`/trending/tv/${timeWindow}`, { params });
      cacheService.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching Trending Movies:', error);
      throw new Error('Failed to fetch Trending Movies data');
    }
  }

  async fetchTVGenres(): Promise<GenreApiResponse> {
    const params = {
      language: config.defaultLanguage
    }
    const cacheKey = JSON.stringify({ function: "fetchTVGenres", params });
    const cachedData = cacheService.get<GenreApiResponse>(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response: AxiosResponse<GenreApiResponse> = await this.axiosInstance.get<GenreApiResponse>('/genre/tv/list', { params });
      cacheService.set(cacheKey, response.data, 3600);
      return response.data;
    } catch (error) {
      console.error('Error tv genres:', error);
      throw new Error('Failed to fetch tv genres data');
    }
  }

  async fetchMovieGenres(): Promise<GenreApiResponse> {
    const params = {
      language: config.defaultLanguage
    }
    const cacheKey = JSON.stringify({ function: "fetchMovieGenres" });
    const cachedData = cacheService.get<GenreApiResponse>(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response: AxiosResponse<GenreApiResponse> = await this.axiosInstance.get('/genre/movie/list', { params });
      cacheService.set(cacheKey, response.data, 3600);
      return response.data;
    } catch (error) {
      console.error('Error movie genres:', error);
      throw new Error('Failed to fetch movie genres data');
    }
  }
}


const filmApiService = new FilmApiService(process.env.ACCESS_TOKEN_MOVIES);

export default filmApiService;