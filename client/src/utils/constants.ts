export const AI_CATEGORIES = [
  { value: "BRAINSTORMING", label: "Brainstorming" },
  { value: "WRITING_ASSISTANCE", label: "Writing Assistance" },
  { value: "RESEARCH", label: "Research" },
  { value: "CODE_GENERATION", label: "Code Generation" },
  { value: "DEBUGGING", label: "Debugging" },
  { value: "DATA_ANALYSIS", label: "Data Analysis" },
  { value: "TRANSLATION", label: "Translation" },
  { value: "SUMMARIZATION", label: "Summarization" },
  { value: "OTHER", label: "Other" },
] as const;

export const AI_EXTENT_LEVELS = [
  { value: "MINIMAL", label: "Minimal", color: "bg-green-100 text-green-800" },
  { value: "MODERATE", label: "Moderate", color: "bg-yellow-100 text-yellow-800" },
  { value: "EXTENSIVE", label: "Extensive", color: "bg-red-100 text-red-800" },
] as const;
