import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  const user = await prisma.user.upsert({
    where: { email: "student@example.com" },
    update: {},
    create: {
      name: "Test Student",
      email: "student@example.com",
      password,
    },
  });

  const project = await prisma.project.create({
    data: {
      name: "TDT4242 Assignment 1",
      description: "Software requirements and testing project",
      courseName: "TDT4242",
      assignmentName: "Assignment 1",
      userId: user.id,
    },
  });

  await prisma.aiUsageLog.create({
    data: {
      toolName: "ChatGPT",
      category: "BRAINSTORMING",
      extent: "MODERATE",
      purpose: "Generated initial ideas for project architecture",
      projectId: project.id,
    },
  });

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
