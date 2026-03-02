import { prisma } from "../lib/prisma";
import { AppError } from "../types";
import { getProject } from "./project.service";

export async function ensureProjectNotSubmitted(projectId: string) {
  const submitted = await prisma.declaration.findFirst({
    where: { projectId, status: "SUBMITTED" },
    select: { id: true },
  });
  if (submitted) {
    throw new AppError(403, "Cannot modify project data after declaration submission");
  }
}

export async function getDeclarations(projectId: string, userId: string) {
  await getProject(projectId, userId);
  return prisma.declaration.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDeclaration(id: string, userId: string) {
  const declaration = await prisma.declaration.findUnique({ where: { id } });
  if (!declaration || declaration.userId !== userId) {
    throw new AppError(404, "Declaration not found");
  }
  return declaration;
}

export async function createDeclaration(
  projectId: string,
  userId: string,
  data: { title: string; summary: string }
) {
  await getProject(projectId, userId);
  return prisma.declaration.create({
    data: { ...data, projectId, userId },
  });
}

export async function updateDeclaration(
  id: string,
  userId: string,
  data: { title?: string; summary?: string }
) {
  const existing = await getDeclaration(id, userId);
  if (existing.status === "SUBMITTED") {
    throw new AppError(403, "Cannot modify a submitted declaration");
  }
  return prisma.declaration.update({ where: { id }, data });
}

export async function submitDeclaration(id: string, userId: string) {
  const existing = await getDeclaration(id, userId);
  if (existing.status === "SUBMITTED") {
    throw new AppError(400, "Declaration already submitted");
  }

  const alreadySubmitted = await prisma.declaration.findFirst({
    where: { projectId: existing.projectId, status: "SUBMITTED" },
  });
  if (alreadySubmitted) {
    throw new AppError(403, "A declaration has already been submitted for this project");
  }

  return prisma.declaration.update({
    where: { id },
    data: { status: "SUBMITTED", submittedAt: new Date() },
  });
}
