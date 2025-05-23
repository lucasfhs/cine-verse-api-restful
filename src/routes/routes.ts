import { Router } from "express";
import actorRoutes from "./core/actor";
import movieRoutes from "./core/movie";
import userRoutes from "./core/user";
import directorRoutes from "./core/director";
import followRoutes from "./social/follow";
import messageRoutes from "./social/message";
import reportRoutes from "./social/report";
import commentRoutes from "./content/comment";
import likeRoutes from "./content/like";
import listRoutes from "./content/list";
import reviewRoutes from "./content/review";
import morganMiddleware from "@/middleware/morgan";

const router = Router();
router.use(morganMiddleware);
router.use(userRoutes);
router.use(movieRoutes);
router.use(actorRoutes);
router.use(directorRoutes);
router.use(followRoutes);
router.use(messageRoutes);
router.use(reportRoutes);
router.use(commentRoutes);
router.use(likeRoutes);
router.use(listRoutes);
router.use(reviewRoutes);
export default router;
