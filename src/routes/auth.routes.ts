import express, { Router } from "express";
import { exchangeUuidForToken, googleAuth, verifyToken } from "../controller/auth.controller.js";

const router: Router = express.Router();

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Handle Google OAuth callback
 *     description: Processes the Google OAuth authorization code and redirects to the frontend with a UUID or error.
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The authorization code from Google OAuth
 *     responses:
 *       302:
 *         description: Redirects to the frontend with a UUID or error
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: Redirect to frontend URI
 *       500:
 *         description: OAuth error occurred
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: Redirect to frontend with error=oauth
 */
router.get('/google/callback', googleAuth);

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verify a JWT token
 *     description: Validates a JWT token provided in the Authorization header.
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token signature is valid
 *       401:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token signature
 *       403:
 *         description: No token provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No token provided
 */
router.get('/verify', verifyToken);


/**
 * @swagger
 * /api/auth/exchange-uuid:
 *   get:
 *     summary: Exchange UUID for a JWT token
 *     description: Exchanges a valid UUID for a JWT token.
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID to exchange for a token
 *     responses:
 *       200:
 *         description: Successfully exchanged UUID for token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid or missing UUID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid or missing UUID
 *       404:
 *         description: UUID not found or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: UUID not found
 */
router.get('/exchange-uuid', exchangeUuidForToken);

export default router;