import { prisma } from "../lib/prisma";
import { AppError } from "../types";
import { ensureProjectNotSubmitted } from "./declaration.service";

async function verifyLogOwnership(logId: string, userId: string) {
  const log = await prisma.aiUsageLog.findUnique({
    where: { id: logId },
    include: { project: { select: { userId: true } } },
  });
  if (!log) throw new AppError(404, "Log not found");
  if (log.project.userId !== userId) throw new AppError(403, "Forbidden");
  return log;
}

export async function upsertReflection(logId: string, content: string, userId: string) {
  const log = await verifyLogOwnership(logId, userId);
  await ensureProjectNotSubmitted(log.projectId);

  return prisma.reflectionNote.upsert({
    where: { aiUsageLogId: logId },
    update: { content },
    create: { content, aiUsageLogId: logId },
  });
}

export async function deleteReflection(logId: string, userId: string) {
  const log = await verifyLogOwnership(logId, userId);
  await ensureProjectNotSubmitted(log.projectId);

  const existing = await prisma.reflectionNote.findUnique({
    where: { aiUsageLogId: logId },
  });
  if (!existing) throw new AppError(404, "Reflection not found");

  return prisma.reflectionNote.delete({ where: { aiUsageLogId: logId } });
}
