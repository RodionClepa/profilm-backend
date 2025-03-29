import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from '../config.js';


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
        try {
            const response: AxiosResponse = await this.axiosInstance.get('/discover/movie', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching movies:', error);
            throw new Error('Failed to fetch movie data');
        }
    }
}

export default MovieApiService;