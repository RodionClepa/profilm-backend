import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '../config.js';
import cacheService from './cacheService.js';

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
}

export default MovieApiService;