import express, {Router} from "express";
import { getMovies } from "../controller/movieApi.controller.js";

const router: Router = express.Router();

router.get('/popular', getMovies);

export default router;