import express, { Router } from "express";
import { searchQueryParams } from "../middleware/searchQueryParams.middleware.js";
import { searchMovies, searchTVs } from "../controller/search.controller.js";

const router: Router = express.Router();

router.get('/movies', searchQueryParams, searchMovies);
router.get('/tvs', searchQueryParams, searchTVs);

export default router;