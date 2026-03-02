import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  courseName: z.string().min(1, "Course name is required"),
  assignmentName: z.string().min(1, "Assignment name is required"),
});

export const updateProjectSchema = createProjectSchema.partial();
