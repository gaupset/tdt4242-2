import api from "./api";

export async function upsertReflection(logId: string, content: string) {
  const { data } = await api.put(`/logs/${logId}/reflection`, { content });
  return data;
}

export async function deleteReflection(logId: string) {
  await api.delete(`/logs/${logId}/reflection`);
}
