import express, { Router } from "express";
import { getPopularMovies } from "../controller/movies.controller.js";
import { validatePopularMoviesQuery } from "../middleware/validatePopularQuery.middleware.js";

const router: Router = express.Router();

router.get('/popular', validatePopularMoviesQuery, getPopularMovies);

export default router;