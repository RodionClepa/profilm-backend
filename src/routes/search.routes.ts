import express, { Router } from "express";
import { searchQueryParams } from "../middleware/searchQueryParams.middleware.js";
import { searchMedia } from "../controller/search.controller.js";

const router: Router = express.Router();

router.get('', searchQueryParams, searchMedia);

export default router;