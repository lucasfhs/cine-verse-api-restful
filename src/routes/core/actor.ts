import { Router } from "express";
import { actorController } from "../../controllers/core/actor";
import {
  findOneActorValidation,
  actorCreateValidation,
  updateActorValidation,
  deleteOneActorValidation,
} from "../../middleware/validators/core/actorValidator";
import { validate } from "../../middleware/handleValidator";
const router = Router();
router.get("/actor", actorController.findAll);
router.get(
  "/actor/:id",
  findOneActorValidation(),
  validate,
  actorController.findOne
);
router.post(
  "/actor",
  actorCreateValidation(),
  validate,
  actorController.createOne
);
router.put(
  "/actor/:id",
  updateActorValidation(),
  validate,
  actorController.updateOne
);
router.delete(
  "/actor/:id",
  deleteOneActorValidation(),
  validate,
  actorController.deleteOne
);

export default router;
