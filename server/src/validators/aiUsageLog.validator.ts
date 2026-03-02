import { z } from "zod";

const aiCategories = [
  "BRAINSTORMING",
  "WRITING_ASSISTANCE",
  "RESEARCH",
  "CODE_GENERATION",
  "DEBUGGING",
  "DATA_ANALYSIS",
  "TRANSLATION",
  "SUMMARIZATION",
  "OTHER",
] as const;

const aiExtents = ["MINIMAL", "MODERATE", "EXTENSIVE"] as const;

export const createAiUsageLogSchema = z.object({
  toolName: z.string().min(1, "Tool name is required"),
  category: z.enum(aiCategories),
  extent: z.enum(aiExtents),
  purpose: z.string().min(1, "Purpose is required"),
  timestamp: z.string().datetime().optional(),
});

export const updateAiUsageLogSchema = createAiUsageLogSchema.partial();
