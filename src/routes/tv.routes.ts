import express, { Router } from "express";
import { validatePopularMoviesQuery } from "../middleware/validatePopularQuery.middleware.js";
import { getPopularTV, getTrendingTVs, getTVDetails } from "../controller/tv.controller.js";
import { trendingTimeWindow } from "../middleware/trendingTimeWindow.middleware.js";

const router: Router = express.Router();

router.get('/popular', validatePopularMoviesQuery, getPopularTV);
router.get('/trending', validatePopularMoviesQuery, trendingTimeWindow, getTrendingTVs);
router.get('/:id', getTVDetails);

export default router;