import express, { Router } from "express";
import { validatePopularMoviesQuery } from "../middleware/validatePopularQuery.middleware.js";
import { getPopularTV } from "../controller/tv.controller.js";

const router: Router = express.Router();

router.get('/popular', validatePopularMoviesQuery, getPopularTV);

export default router;