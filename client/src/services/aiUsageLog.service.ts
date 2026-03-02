import api from "./api";
import type { AiCategory, AiExtent } from "../types";

export async function getLogs(projectId: string) {
  const { data } = await api.get(`/projects/${projectId}/logs`);
  return data;
}

export async function getLog(projectId: string, logId: string) {
  const { data } = await api.get(`/projects/${projectId}/logs/${logId}`);
  return data;
}

export async function createLog(
  projectId: string,
  body: {
    toolName: string;
    category: AiCategory;
    extent: AiExtent;
    purpose: string;
    timestamp?: string;
  }
) {
  const { data } = await api.post(`/projects/${projectId}/logs`, body);
  return data;
}

export async function updateLog(
  projectId: string,
  logId: string,
  body: {
    toolName?: string;
    category?: AiCategory;
    extent?: AiExtent;
    purpose?: string;
  }
) {
  const { data } = await api.put(`/projects/${projectId}/logs/${logId}`, body);
  return data;
}

export async function deleteLog(projectId: string, logId: string) {
  await api.delete(`/projects/${projectId}/logs/${logId}`);
}
