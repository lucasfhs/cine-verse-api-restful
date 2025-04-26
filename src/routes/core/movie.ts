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
 *   description: Operações relacionadas a filmes
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
 *           description: ID único do filme
 *         title:
 *           type: string
 *           description: Título do filme
 *         description:
 *           type: string
 *           description: Descrição do filme
 *         year:
 *           type: integer
 *           description: Ano de lançamento
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: Gêneros do filme
 *         average_rating:
 *           type: number
 *           format: float
 *           description: Nota média do filme
 *           example: 4.5
 *         tmdb_id:
 *           type: string
 *           description: ID do filme no TMDb
 *         actors:
 *           type: array
 *           items:
 *             type: string
 *             description: Referência a um ator
 *         directors:
 *           type: array
 *           items:
 *             type: string
 *             description: Referência a um diretor
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
 *     summary: Retorna todos os filmes
 *     tags: [Movie]
 *     responses:
 *       200:
 *         description: Lista de filmes retornada com sucesso
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
 *         description: Nenhum filme encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     summary: Retorna um filme pelo ID
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filme encontrado
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
 *         description: Filme não encontrado
 *       400:
 *         description: ID inválido
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /movie:
 *   post:
 *     summary: Cria um novo filme
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
 *         description: Filme criado com sucesso
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
 *         description: Dados inválidos
 *       409:
 *         description: Filme já existente
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /movie/{id}:
 *   put:
 *     summary: Atualiza um filme existente
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme
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
 *         description: Filme atualizado com sucesso
 *       400:
 *         description: ID ou dados inválidos
 *       404:
 *         description: Filme não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /movie/{id}:
 *   delete:
 *     summary: Remove um filme pelo ID
 *     tags: [Movie]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filme removido com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Filme não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

export default router;
