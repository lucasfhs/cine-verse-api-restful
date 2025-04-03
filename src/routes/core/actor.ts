import { Router } from "express";
import {
  findOneActor,
  findAllActors,
  createOneActor,
  updateOneActor,
  deleteOneActor,
} from "../../controllers/core/actor";
import {
  findOneActorValidation,
  actorCreateValidation,
  updateActorValidation,
  deleteOneActorValidation,
} from "../../middleware/validators/core/actorValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/actor", findAllActors);
router.get("/actor/:id", findOneActorValidation(), validate, findOneActor);
router.post("/actor", actorCreateValidation(), validate, createOneActor);
router.put("/actor/:id", updateActorValidation(), validate, updateOneActor);
router.delete(
  "/actor/:id",
  deleteOneActorValidation(),
  validate,
  deleteOneActor
);

export default router;
