import express, { Router } from "express";
import { getPopularMovies, getTrendingMovies, getUpcomingMovies } from "../controller/movies.controller.js";
import { validatePopularMoviesQuery } from "../middleware/validatePopularQuery.middleware.js";
import { trendingTimeWindow } from "../middleware/trendingTimeWindow.middleware.js";

const router: Router = express.Router();

router.get('/popular', validatePopularMoviesQuery, getPopularMovies);
router.get('/trending', validatePopularMoviesQuery, trendingTimeWindow, getTrendingMovies);
router.get('/upcoming', validatePopularMoviesQuery, getUpcomingMovies);

export default router;