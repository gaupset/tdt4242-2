import { Router } from "express";
import { validate } from "../middleware/validate";
import { createProjectSchema, updateProjectSchema } from "../validators/project.validator";
import * as projectController from "../controllers/project.controller";

const router = Router();

router.get("/", projectController.getProjects);
router.post("/", validate(createProjectSchema), projectController.createProject);
router.get("/:id", projectController.getProject);
router.put("/:id", validate(updateProjectSchema), projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

export default router;
