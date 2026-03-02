import { Request, Response, NextFunction } from "express";
import * as logService from "../services/aiUsageLog.service";

export async function getLogs(req: Request, res: Response, next: NextFunction) {
  try {
    const logs = await logService.getLogs(String(req.params.projectId), req.userId!);
    res.json(logs);
  } catch (err) {
    next(err);
  }
}

export async function getLog(req: Request, res: Response, next: NextFunction) {
  try {
    const log = await logService.getLog(String(req.params.logId), String(req.params.projectId), req.userId!);
    res.json(log);
  } catch (err) {
    next(err);
  }
}

export async function createLog(req: Request, res: Response, next: NextFunction) {
  try {
    const log = await logService.createLog(String(req.params.projectId), req.userId!, req.body);
    res.status(201).json(log);
  } catch (err) {
    next(err);
  }
}

export async function updateLog(req: Request, res: Response, next: NextFunction) {
  try {
    const log = await logService.updateLog(
      String(req.params.logId),
      String(req.params.projectId),
      req.userId!,
      req.body
    );
    res.json(log);
  } catch (err) {
    next(err);
  }
}

export async function deleteLog(req: Request, res: Response, next: NextFunction) {
  try {
    await logService.deleteLog(String(req.params.logId), String(req.params.projectId), req.userId!);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
