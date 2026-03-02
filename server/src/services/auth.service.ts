import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { env } from "../config/env";
import { AppError } from "../types";

export async function register(name: string, email: string, password: string) {
  const normalizedEmail = email.toLowerCase().trim();
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) throw new AppError(409, "Email already in use");

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email: normalizedEmail, password: hashed },
  });

  const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return { user: { id: user.id, name: user.name, email: user.email }, token };
}

export async function login(email: string, password: string) {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) throw new AppError(401, "Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new AppError(401, "Invalid credentials");

  const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return { user: { id: user.id, name: user.name, email: user.email }, token };
}

export function verifyToken(token: string): { userId: string } {
  try {
    return jwt.verify(token, env.JWT_SECRET) as { userId: string };
  } catch {
    throw new AppError(401, "Invalid or expired token");
  }
}
