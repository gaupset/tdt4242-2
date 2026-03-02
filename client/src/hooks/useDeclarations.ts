import { useState, useEffect, useCallback } from "react";
import type { Declaration } from "../types";
import * as declarationService from "../services/declaration.service";

export function useDeclarations(projectId: string) {
  const [declarations, setDeclarations] = useState<Declaration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeclarations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await declarationService.getDeclarations(projectId);
      setDeclarations(data);
      setError(null);
    } catch {
      setError("Failed to fetch declarations");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchDeclarations();
  }, [fetchDeclarations]);

  return { declarations, loading, error, refetch: fetchDeclarations };
}
