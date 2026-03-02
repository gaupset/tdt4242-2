import { AiCategory, AiExtent } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { AppError } from "../types";
import { getProject } from "./project.service";
import { ensureProjectNotSubmitted } from "./declaration.service";

export async function getLogs(projectId: string, userId: string) {
  await getProject(projectId, userId);
  return prisma.aiUsageLog.findMany({
    where: { projectId },
    include: { reflectionNote: true },
    orderBy: { timestamp: "desc" },
  });
}

export async function getLog(logId: string, projectId: string, userId: string) {
  await getProject(projectId, userId);
  const log = await prisma.aiUsageLog.findUnique({
    where: { id: logId },
    include: { reflectionNote: true },
  });
  if (!log || log.projectId !== projectId) {
    throw new AppError(404, "Log not found");
  }
  return log;
}

export async function createLog(
  projectId: string,
  userId: string,
  data: {
    toolName: string;
    category: AiCategory;
    extent: AiExtent;
    purpose: string;
    timestamp?: string;
  }
) {
  await getProject(projectId, userId);
  await ensureProjectNotSubmitted(projectId);
  return prisma.aiUsageLog.create({
    data: {
      toolName: data.toolName,
      category: data.category,
      extent: data.extent,
      purpose: data.purpose,
      timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
      projectId,
    },
  });
}

export async function updateLog(
  logId: string,
  projectId: string,
  userId: string,
  data: {
    toolName?: string;
    category?: AiCategory;
    extent?: AiExtent;
    purpose?: string;
    timestamp?: string;
  }
) {
  await getLog(logId, projectId, userId);
  await ensureProjectNotSubmitted(projectId);
  const updateData: Record<string, unknown> = { ...data };
  if (data.timestamp) updateData.timestamp = new Date(data.timestamp);
  return prisma.aiUsageLog.update({ where: { id: logId }, data: updateData });
}

export async function deleteLog(logId: string, projectId: string, userId: string) {
  await getLog(logId, projectId, userId);
  await ensureProjectNotSubmitted(projectId);
  return prisma.aiUsageLog.delete({ where: { id: logId } });
}
