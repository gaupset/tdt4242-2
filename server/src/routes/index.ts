import { Router } from "express";
import { authenticate } from "../middleware/auth";
import authRoutes from "./auth.routes";
import projectRoutes from "./project.routes";
import aiUsageLogRoutes from "./aiUsageLog.routes";
import declarationRoutes from "./declaration.routes";
import reflectionRoutes from "./reflection.routes";
import dashboardRoutes from "./dashboard.routes";

const router = Router();

router.use("/auth", authRoutes);

// All routes below require authentication
router.use(authenticate);
router.use("/projects", projectRoutes);
router.use("/projects/:projectId/logs", aiUsageLogRoutes);
router.use("/projects/:projectId/declarations", declarationRoutes);
router.use("/logs", reflectionRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
