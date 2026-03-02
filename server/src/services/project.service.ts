import { prisma } from "../lib/prisma";
import { AppError } from "../types";

export async function getProjects(userId: string) {
  return prisma.project.findMany({
    where: { userId },
    include: {
      _count: { select: { aiUsageLogs: true, declarations: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProject(id: string, userId: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      _count: { select: { aiUsageLogs: true, declarations: true } },
    },
  });
  if (!project || project.userId !== userId) {
    throw new AppError(404, "Project not found");
  }
  return project;
}

export async function createProject(
  userId: string,
  data: { name: string; description?: string; courseName: string; assignmentName: string }
) {
  return prisma.project.create({ data: { ...data, userId } });
}

export async function updateProject(
  id: string,
  userId: string,
  data: { name?: string; description?: string; courseName?: string; assignmentName?: string }
) {
  await getProject(id, userId);
  return prisma.project.update({ where: { id }, data });
}

export async function deleteProject(id: string, userId: string) {
  await getProject(id, userId);
  return prisma.project.delete({ where: { id } });
}
