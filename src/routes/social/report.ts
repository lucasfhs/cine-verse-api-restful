import { Router } from "express";
import {
  findOneReport,
  findAllReports,
  createOneReport,
  updateOneReport,
  deleteOneReport,
} from "../../controllers/social/report";
import {
  findOneReportValidation,
  reportCreateValidation,
  updateReportValidation,
  deleteOneReportValidation,
} from "../../middleware/validators/social/reportValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/report", findAllReports);
router.get("/report/:id", findOneReportValidation(), validate, findOneReport);
router.post("/report", reportCreateValidation(), validate, createOneReport);
router.put("/report/:id", updateReportValidation(), validate, updateOneReport);
router.delete(
  "/report/:id",
  deleteOneReportValidation(),
  validate,
  deleteOneReport
);
/**
 * @swagger
 * tags:
 *   name: Report
 *   description: Operações relacionadas a denúncias de reviews
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único do denúncia
 *         user_id:
 *           type: string
 *           description: ID do usuário que fez o denúncia (referência ao modelo User)
 *         review_id:
 *           type: string
 *           description: ID da review que está sendo reportada (referência ao modelo Review)
 *         reason:
 *           type: string
 *           description: Motivo pelo qual o denúncia foi feito
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /report:
 *   get:
 *     summary: Lista todos os denúncias
 *     tags: [Report]
 *     responses:
 *       200:
 *         description: Lista de denúncias retornada com sucesso
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
 *                     $ref: '#/components/schemas/Report'
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /report/{id}:
 *   get:
 *     summary: Busca um denúncia específico por ID
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do denúncia
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Denúncia encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Report'
 *       404:
 *         description: Denúncia não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /report:
 *   post:
 *     summary: Cria um novo denúncia
 *     tags: [Report]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - user_id
 *               - review_id
 *               - reason
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               review_id:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Denúncia criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Report'
 *       409:
 *         description: Erro na criação do denúncia (por exemplo, já existe um denúncia com o mesmo par de usuário e review)
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /report/{id}:
 *   put:
 *     summary: Atualiza um denúncia existente
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do denúncia
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               review_id:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Denúncia atualizado com sucesso
 *       404:
 *         description: Denúncia não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /report/{id}:
 *   delete:
 *     summary: Remove um denúncia
 *     tags: [Report]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do denúncia
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Denúncia removido com sucesso
 *       404:
 *         description: Denúncia não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

export default router;
