import { z } from "zod";

export const createDeclarationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
});

export const updateDeclarationSchema = createDeclarationSchema.partial();
