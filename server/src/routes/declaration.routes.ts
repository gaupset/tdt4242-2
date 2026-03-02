import { Router } from "express";
import { validate } from "../middleware/validate";
import {
  createDeclarationSchema,
  updateDeclarationSchema,
} from "../validators/declaration.validator";
import * as declarationController from "../controllers/declaration.controller";

const router = Router({ mergeParams: true });

router.get("/", declarationController.getDeclarations);
router.post("/", validate(createDeclarationSchema), declarationController.createDeclaration);
router.get("/:id", declarationController.getDeclaration);
router.put("/:id", validate(updateDeclarationSchema), declarationController.updateDeclaration);
router.post("/:id/submit", declarationController.submitDeclaration);

export default router;
