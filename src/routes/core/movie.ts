import { Router } from "express";
import { movieController } from "@/controllers/core/movie";
import {
  movieCreateValidation,
  findOneMovieValidation,
  updateMovieValidation,
  deleteOneMovieValidation,
} from "@/middleware/validators/core/movieValidator";
import { validate } from "@/middleware/handleValidator";
const router = Router();
router.post(
  "/movie",
  movieCreateValidation(),
  validate,
  movieController.createOne
);
router.get("/movie", validate, movieController.findAll);

router.get(
  "/movie/:id",
  findOneMovieValidation(),
  validate,
  movieController.findOne
);
router.put(
  "/movie/:id",
  updateMovieValidation(),
  validate,
  movieController.updateOne
);

router.delete(
  "/movie/:id",
  deleteOneMovieValidation(),
  validate,
  movieController.deleteOne
);

/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: Movie-related operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique movie ID
 *         title:
 *           type: string
 *           description: Movie title
 *         description:
 *           type: string
 *           description: Movie description
 *         year:
 *           type: integer
 *           description: Release year
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: Movie genres
 *         average_rating:
 *           type: number
 *           format: float
 *           description: Movie average rating
 *           example: 4.5
 *         tmdb_id:
 *           type: string
 *           description: Movie ID from TMDb
 *         actors:
 *           type: array
 *           items:
 *             type: string
 *             description: Reference to an actor
 *         directors:
 *           type: array
 *           items:
 *             type: string
 *             description: Reference to a director
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /movie:
 *   get:
 *     summary: Returns all movies
 *     tags: [Movie]
 *     responses:
 *       200:
 *         description: List of movies returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movie'
 *       404:
 *         description: No movies found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     summary: Returns a movie by ID
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Movie ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /movie:
 *   post:
 *     summary: Creates a new movie
 *     tags: [Movie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               year:
 *                 type: integer
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *               tmdb_id:
 *                 type: string
 *               actors:
 *                 type: array
 *                 items:
 *                   type: string
 *               directors:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid data
 *       409:
 *         description: Movie already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /movie/{id}:
 *   put:
 *     summary: Updates an existing movie
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Movie ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               year:
 *                 type: integer
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *               tmdb_id:
 *                 type: string
 *               actors:
 *                 type: array
 *                 items:
 *                   type: string
 *               directors:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       400:
 *         description: Invalid ID or data
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /movie/{id}:
 *   delete:
 *     summary: Deletes a movie by ID
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Movie ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */

export default router;
