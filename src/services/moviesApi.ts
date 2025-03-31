import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '../config.js';
import cacheService from './cacheService.js';
import { GenreApiResponse } from '../types/genre.type.js';

class MovieApiService {
  private axiosInstance: AxiosInstance;
  private apiUrl: string;

  constructor(private apiKey: string) {
    this.apiUrl = config.MOVIE_API_URL;
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });
  }

  async fetchMovies(params: any): Promise<any> {
    const cacheKey = JSON.stringify({ function: "fetchMovies", params });
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) return cachedData;

    try {
      const response: AxiosResponse = await this.axiosInstance.get('/discover/movie', { params });

      cacheService.set(cacheKey, response.data);

      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new Error('Failed to fetch movie data');
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
      const response: AxiosResponse<GenreApiResponse> = await this.axiosInstance.get('/genre/tv/list', { params });
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


const movieApiService = new MovieApiService(process.env.ACCESS_TOKEN_MOVIES);

export default movieApiService;