export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  courseName: string;
  assignmentName: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    aiUsageLogs: number;
    declarations: number;
  };
}

export type AiCategory =
  | "BRAINSTORMING"
  | "WRITING_ASSISTANCE"
  | "RESEARCH"
  | "CODE_GENERATION"
  | "DEBUGGING"
  | "DATA_ANALYSIS"
  | "TRANSLATION"
  | "SUMMARIZATION"
  | "OTHER";

export type AiExtent = "MINIMAL" | "MODERATE" | "EXTENSIVE";

export type DeclarationStatus = "DRAFT" | "SUBMITTED";

export interface AiUsageLog {
  id: string;
  toolName: string;
  timestamp: string;
  category: AiCategory;
  extent: AiExtent;
  purpose: string;
  projectId: string;
  createdAt: string;
  reflectionNote?: ReflectionNote;
}

export interface ReflectionNote {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Declaration {
  id: string;
  title: string;
  summary: string;
  status: DeclarationStatus;
  submittedAt?: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardSummary {
  totalProjects: number;
  totalLogs: number;
  totalDeclarations: number;
}

export interface UsageOverTimeItem {
  date: string;
  count: number;
}

export interface CategoryBreakdownItem {
  category: AiCategory;
  count: number;
}

export interface ExtentDistributionItem {
  extent: AiExtent;
  count: number;
}
