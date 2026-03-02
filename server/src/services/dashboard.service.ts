import { prisma } from "../lib/prisma";

export async function getSummary(userId: string) {
  const [totalProjects, totalLogs, totalDeclarations] = await Promise.all([
    prisma.project.count({ where: { userId } }),
    prisma.aiUsageLog.count({
      where: { project: { userId } },
    }),
    prisma.declaration.count({ where: { userId } }),
  ]);
  return { totalProjects, totalLogs, totalDeclarations };
}

export async function getUsageOverTime(userId: string) {
  const logs = await prisma.aiUsageLog.findMany({
    where: { project: { userId } },
    select: { timestamp: true },
    orderBy: { timestamp: "asc" },
  });

  const grouped: Record<string, number> = {};
  for (const log of logs) {
    const date = log.timestamp.toISOString().split("T")[0];
    grouped[date] = (grouped[date] || 0) + 1;
  }

  return Object.entries(grouped).map(([date, count]) => ({ date, count }));
}

export async function getCategoryBreakdown(userId: string) {
  const result = await prisma.aiUsageLog.groupBy({
    by: ["category"],
    where: { project: { userId } },
    _count: { category: true },
  });
  return result.map((r) => ({ category: r.category, count: r._count.category }));
}

export async function getExtentDistribution(userId: string) {
  const result = await prisma.aiUsageLog.groupBy({
    by: ["extent"],
    where: { project: { userId } },
    _count: { extent: true },
  });
  return result.map((r) => ({ extent: r.extent, count: r._count.extent }));
}
