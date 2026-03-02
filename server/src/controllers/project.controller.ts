import { Request, Response, NextFunction } from "express";
import * as projectService from "../services/project.service";

export async function getProjects(req: Request, res: Response, next: NextFunction) {
  try {
    const projects = await projectService.getProjects(req.userId!);
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

export async function getProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await projectService.getProject(String(req.params.id), req.userId!);
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function createProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await projectService.createProject(req.userId!, req.body);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await projectService.updateProject(String(req.params.id), req.userId!, req.body);
    res.json(project);
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req: Request, res: Response, next: NextFunction) {
  try {
    await projectService.deleteProject(String(req.params.id), req.userId!);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
