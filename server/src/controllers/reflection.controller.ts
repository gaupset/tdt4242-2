import { Request, Response, NextFunction } from "express";
import * as reflectionService from "../services/reflection.service";

export async function upsertReflection(req: Request, res: Response, next: NextFunction) {
  try {
    const reflection = await reflectionService.upsertReflection(
      String(req.params.logId),
      req.body.content,
      req.userId!
    );
    res.json(reflection);
  } catch (err) {
    next(err);
  }
}

export async function deleteReflection(req: Request, res: Response, next: NextFunction) {
  try {
    await reflectionService.deleteReflection(String(req.params.logId), req.userId!);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
