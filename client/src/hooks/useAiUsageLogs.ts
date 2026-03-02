import { useState, useEffect, useCallback } from "react";
import type { AiUsageLog } from "../types";
import * as logService from "../services/aiUsageLog.service";

export function useAiUsageLogs(projectId: string) {
  const [logs, setLogs] = useState<AiUsageLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await logService.getLogs(projectId);
      setLogs(data);
      setError(null);
    } catch {
      setError("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, loading, error, refetch: fetchLogs };
}
