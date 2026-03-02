import { Request, Response, NextFunction } from "express";
import * as declarationService from "../services/declaration.service";

export async function getDeclarations(req: Request, res: Response, next: NextFunction) {
  try {
    const declarations = await declarationService.getDeclarations(
      String(req.params.projectId),
      req.userId!
    );
    res.json(declarations);
  } catch (err) {
    next(err);
  }
}

export async function getDeclaration(req: Request, res: Response, next: NextFunction) {
  try {
    const declaration = await declarationService.getDeclaration(String(req.params.id), req.userId!);
    res.json(declaration);
  } catch (err) {
    next(err);
  }
}

export async function createDeclaration(req: Request, res: Response, next: NextFunction) {
  try {
    const declaration = await declarationService.createDeclaration(
      String(req.params.projectId),
      req.userId!,
      req.body
    );
    res.status(201).json(declaration);
  } catch (err) {
    next(err);
  }
}

export async function updateDeclaration(req: Request, res: Response, next: NextFunction) {
  try {
    const declaration = await declarationService.updateDeclaration(
      String(req.params.id),
      req.userId!,
      req.body
    );
    res.json(declaration);
  } catch (err) {
    next(err);
  }
}

export async function submitDeclaration(req: Request, res: Response, next: NextFunction) {
  try {
    const declaration = await declarationService.submitDeclaration(String(req.params.id), req.userId!);
    res.json(declaration);
  } catch (err) {
    next(err);
  }
}
