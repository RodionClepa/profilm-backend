import express, { Router } from "express";
import { exchangeUuidForToken, googleAuth, verifyToken } from "../controller/auth.controller.js";

const router: Router = express.Router();

router.get('/google/callback', googleAuth);
router.get('/verify', verifyToken);
router.get('/exchange-uuid', exchangeUuidForToken);

export default router;