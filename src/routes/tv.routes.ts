import express, { Router } from "express";
import { validatePopularMoviesQuery } from "../middleware/validatePopularQuery.middleware.js";
import { getPopularTV, getTrendingTVs } from "../controller/tv.controller.js";
import { getTrendingMovies } from "../controller/movies.controller.js";
import { trendingTimeWindow } from "../middleware/trendingTimeWindow.middleware.js";

const router: Router = express.Router();

router.get('/popular', validatePopularMoviesQuery, getPopularTV);
router.get('/trending', validatePopularMoviesQuery, trendingTimeWindow, getTrendingTVs);

export default router;