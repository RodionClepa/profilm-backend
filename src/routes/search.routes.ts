import express, { Router } from "express";
import { searchQueryParams } from "../middleware/searchQueryParams.middleware.js";
import { searchMovies, searchTVs } from "../controller/search.controller.js";
import { verifyRequestJWT } from "../middleware/validateToken.middleware.js";

const router: Router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     SearchQueryParams:
 *       type: object
 *       properties:
 *         searchName:
 *           type: string
 *           description: Name or keyword to search for
 *           example: "Inception"
 *         page:
 *           type: integer
 *           default: 1
 *           description: Page number for pagination
 *         includeAdult:
 *           type: boolean
 *           default: false
 *           description: Include adult content in search results
 *         imageSize:
 *           type: integer
 *           default: 500
 *           description: Size of images in response
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 123
 *         title:
 *           type: string
 *           example: "Inception"
 *         poster:
 *           type: string
 *           example: "https://image.tmdb.org/t/p/w500/poster.jpg"
 *     TV:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 456
 *         name:
 *           type: string
 *           example: "Stranger Things"
 *         poster:
 *           type: string
 *           example: "https://image.tmdb.org/t/p/w500/poster.jpg"
 */

/**
 * @swagger
 * /api/search/movies:
 *   get:
 *     summary: Search for movies
 *     description: Searches for movies based on query parameters, requiring a valid JWT token.
 *     tags: [Search]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchName
 *         schema:
 *           type: string
 *         description: Name or keyword to search for movies
 *         example: "Inception"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: includeAdult
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Include adult content in search results
 *       - in: query
 *         name: imageSize
 *         schema:
 *           type: integer
 *           default: 500
 *         description: Size of images in response
 *     responses:
 *       200:
 *         description: List of movies matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid page number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pages should start at 1 and max at 500
 *       401:
 *         description: Invalid or missing JWT token
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
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/movies', verifyRequestJWT, searchQueryParams, searchMovies);

/**
 * @swagger
 * /api/search/tvs:
 *   get:
 *     summary: Search for TV shows
 *     description: Searches for TV shows based on query parameters, requiring a valid JWT token.
 *     tags: [Search]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchName
 *         schema:
 *           type: string
 *         description: Name or keyword to search for TV shows
 *         example: "Stranger Things"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: includeAdult
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Include adult content in search results
 *       - in: query
 *         name: imageSize
 *         schema:
 *           type: integer
 *           default: 500
 *         description: Size of images in response
 *     responses:
 *       200:
 *         description: List of TV shows matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TV'
 *       400:
 *         description: Invalid page number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pages should start at 1 and max at 500
 *       401:
 *         description: Invalid or missing JWT token
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
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/tvs', verifyRequestJWT, searchQueryParams, searchTVs);

export default router;