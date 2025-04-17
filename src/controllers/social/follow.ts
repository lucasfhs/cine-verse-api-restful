// controllers/FollowController.ts
import { FollowModel } from "../../models/social/Follow";
import { BaseController } from "../BaseController";

export const followController = new BaseController(FollowModel, "Follow");
