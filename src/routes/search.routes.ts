import express, { Router } from "express";
import { searchQueryParams } from "../middleware/searchQueryParams.middleware.js";
import { searchMovies, searchTVs } from "../controller/search.controller.js";
import { verifyRequestJWT } from "../middleware/validateToken.middleware.js";

const router: Router = express.Router();

router.get('/movies', verifyRequestJWT, searchQueryParams, searchMovies);
router.get('/tvs', verifyRequestJWT, searchQueryParams, searchTVs);

export default router;