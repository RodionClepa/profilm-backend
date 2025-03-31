import express, { Router } from "express";
import { getMovieGenres, getTvGenres } from "../controller/genre.controller.js";

const router: Router = express.Router();

router.get('/tv', getTvGenres);
router.get('/movie', getMovieGenres);

export default router;