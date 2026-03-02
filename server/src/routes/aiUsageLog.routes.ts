import { Router } from "express";
import { validate } from "../middleware/validate";
import {
  createAiUsageLogSchema,
  updateAiUsageLogSchema,
} from "../validators/aiUsageLog.validator";
import * as logController from "../controllers/aiUsageLog.controller";

const router = Router({ mergeParams: true });

router.get("/", logController.getLogs);
router.post("/", validate(createAiUsageLogSchema), logController.createLog);
router.get("/:logId", logController.getLog);
router.put("/:logId", validate(updateAiUsageLogSchema), logController.updateLog);
router.delete("/:logId", logController.deleteLog);

export default router;
