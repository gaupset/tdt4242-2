import api from "./api";

export async function getDeclarations(projectId: string) {
  const { data } = await api.get(`/projects/${projectId}/declarations`);
  return data;
}

export async function getDeclaration(projectId: string, id: string) {
  const { data } = await api.get(`/projects/${projectId}/declarations/${id}`);
  return data;
}

export async function createDeclaration(
  projectId: string,
  body: { title: string; summary: string }
) {
  const { data } = await api.post(`/projects/${projectId}/declarations`, body);
  return data;
}

export async function updateDeclaration(
  projectId: string,
  id: string,
  body: { title?: string; summary?: string }
) {
  const { data } = await api.put(`/projects/${projectId}/declarations/${id}`, body);
  return data;
}

export async function submitDeclaration(projectId: string, id: string) {
  const { data } = await api.post(`/projects/${projectId}/declarations/${id}/submit`);
  return data;
}
