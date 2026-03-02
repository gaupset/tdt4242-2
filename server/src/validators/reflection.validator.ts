import { z } from "zod";

export const upsertReflectionSchema = z.object({
  content: z.string().min(1, "Reflection content is required"),
});
