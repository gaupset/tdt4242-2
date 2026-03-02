import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";

const router = Router();

router.get("/summary", dashboardController.getSummary);
router.get("/usage-over-time", dashboardController.getUsageOverTime);
router.get("/category-breakdown", dashboardController.getCategoryBreakdown);
router.get("/extent-distribution", dashboardController.getExtentDistribution);

export default router;
