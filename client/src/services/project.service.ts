import api from "./api";

export async function getProjects() {
  const { data } = await api.get("/projects");
  return data;
}

export async function getProject(id: string) {
  const { data } = await api.get(`/projects/${id}`);
  return data;
}

export async function createProject(body: {
  name: string;
  description?: string;
  courseName: string;
  assignmentName: string;
}) {
  const { data } = await api.post("/projects", body);
  return data;
}

export async function updateProject(
  id: string,
  body: { name?: string; description?: string; courseName?: string; assignmentName?: string }
) {
  const { data } = await api.put(`/projects/${id}`, body);
  return data;
}

export async function deleteProject(id: string) {
  await api.delete(`/projects/${id}`);
}
