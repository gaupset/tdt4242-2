import { Request, Response, NextFunction } from "express";
import * as dashboardService from "../services/dashboard.service";

export async function getSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const summary = await dashboardService.getSummary(req.userId!);
    res.json(summary);
  } catch (err) {
    next(err);
  }
}

export async function getUsageOverTime(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await dashboardService.getUsageOverTime(req.userId!);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getCategoryBreakdown(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await dashboardService.getCategoryBreakdown(req.userId!);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function getExtentDistribution(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await dashboardService.getExtentDistribution(req.userId!);
    res.json(data);
  } catch (err) {
    next(err);
  }
}
