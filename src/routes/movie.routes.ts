import express, { Router } from "express";
import { getPopularMovies } from "../controller/movies.controller.js";

const router: Router = express.Router();

router.get('/popular', getPopularMovies);

export default router;