import { Router } from "express";
import { validate } from "../middleware/validate";
import { upsertReflectionSchema } from "../validators/reflection.validator";
import * as reflectionController from "../controllers/reflection.controller";

const router = Router();

router.put("/:logId/reflection", validate(upsertReflectionSchema), reflectionController.upsertReflection);
router.delete("/:logId/reflection", reflectionController.deleteReflection);

export default router;
