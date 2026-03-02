import api from "./api";

export async function getSummary() {
  const { data } = await api.get("/dashboard/summary");
  return data;
}

export async function getUsageOverTime() {
  const { data } = await api.get("/dashboard/usage-over-time");
  return data;
}

export async function getCategoryBreakdown() {
  const { data } = await api.get("/dashboard/category-breakdown");
  return data;
}

export async function getExtentDistribution() {
  const { data } = await api.get("/dashboard/extent-distribution");
  return data;
}
