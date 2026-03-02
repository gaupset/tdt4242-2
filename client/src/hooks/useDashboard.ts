import { useState, useEffect, useCallback } from "react";
import type {
  DashboardSummary,
  UsageOverTimeItem,
  CategoryBreakdownItem,
  ExtentDistributionItem,
} from "../types";
import * as dashboardService from "../services/dashboard.service";

export function useDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [usageOverTime, setUsageOverTime] = useState<UsageOverTimeItem[]>([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryBreakdownItem[]>([]);
  const [extentDistribution, setExtentDistribution] = useState<ExtentDistributionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const [s, u, c, e] = await Promise.all([
        dashboardService.getSummary(),
        dashboardService.getUsageOverTime(),
        dashboardService.getCategoryBreakdown(),
        dashboardService.getExtentDistribution(),
      ]);
      setSummary(s);
      setUsageOverTime(u);
      setCategoryBreakdown(c);
      setExtentDistribution(e);
      setError(null);
    } catch {
      setError("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { summary, usageOverTime, categoryBreakdown, extentDistribution, loading, error };
}
