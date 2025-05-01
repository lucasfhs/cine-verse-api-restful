import { Router } from "express";
import {
  findOneReviewValidation,
  reviewCreateValidation,
  updateReviewValidation,
  deleteOneReviewValidation,
} from "@/middleware/validators/content/reviewValidator";
import { validate } from "@/middleware/handleValidator";
import { reviewController } from "@/controllers/content/review";
const router = Router();
router.get("/review", reviewController.findAll);
router.get(
  "/review/:id",
  findOneReviewValidation(),
  validate,
  reviewController.findOne
);
router.post(
  "/review",
  reviewCreateValidation(),
  validate,
  reviewController.createOne
);
router.put(
  "/review/:id",
  updateReviewValidation(),
  validate,
  reviewController.updateOne
);
router.delete(
  "/review/:id",
  deleteOneReviewValidation(),
  validate,
  reviewController.deleteOne
);

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Operations for managing movie reviews
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Unique identifier of the review
 *         user_id:
 *           type: string
 *           description: ID of the user who made the review (references the User model)
 *         movie_id:
 *           type: string
 *           description: ID of the movie being reviewed (references the Movie model)
 *         rating:
 *           type: integer
 *           description: Movie rating (1-5 stars)
 *           example: 4
 *         content:
 *           type: string
 *           description: Review text
 *           example: "Great movie, highly recommended!"
 *         spoiler:
 *           type: boolean
 *           description: Flag indicating if the review contains spoilers
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Review creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date of last review update
 */

/**
 * @swagger
 * /review:
 *   get:
 *     summary: Returns all reviews
 *     tags: [Review]
 *     responses:
 *       200:
 *         description: Returns a list of all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *       404:
 *         description: No reviews found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /review/{id}:
 *   get:
 *     summary: Returns a specific review by ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the review with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /review:
 *   post:
 *     summary: Creates a new review
 *     tags: [Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user creating the review
 *               movie_id:
 *                 type: string
 *                 description: ID of the movie being reviewed
 *               rating:
 *                 type: integer
 *                 description: Rating given to the movie (1-5)
 *               content:
 *                 type: string
 *                 description: Review content
 *               spoiler:
 *                 type: boolean
 *                 description: Whether the review contains spoilers
 *                 default: false
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /review/{id}:
 *   put:
 *     summary: Updates an existing review by ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the review to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Updated rating (1-5)
 *               content:
 *                 type: string
 *                 description: Updated review text
 *               spoiler:
 *                 type: boolean
 *                 description: Whether the review contains spoilers
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *       400:
 *         description: Invalid ID format or invalid data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /review/{id}:
 *   delete:
 *     summary: Deletes a review by ID
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the review to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Internal server error
 */

export default router;
