import { Router } from "express";
import {
  findOneList,
  findAllLists,
  createOneList,
  updateOneList,
  deleteOneList,
} from "../../controllers/content/list";
import {
  findOneListValidation,
  listCreateValidation,
  updateListValidation,
  deleteOneListValidation,
} from "../../middleware/validators/content/listValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/list", findAllLists);
router.get("/list/:id", findOneListValidation(), validate, findOneList);
router.post("/list", listCreateValidation(), validate, createOneList);
router.put("/list/:id", updateListValidation(), validate, updateOneList);
router.delete("/list/:id", deleteOneListValidation(), validate, deleteOneList);

export default router;
