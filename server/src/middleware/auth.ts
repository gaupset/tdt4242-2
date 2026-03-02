import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/auth.service";
import { AppError } from "../types";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new AppError(401, "Authentication required");
  }
  const token = header.slice(7);
  const { userId } = verifyToken(token);
  req.userId = userId;
  next();
}
