import { useParams, Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import Card from "../components/common/Card";
import LoadingSpinner from "../components/common/LoadingSpinner";
import AiUsageLogForm from "../components/aiUsageLog/AiUsageLogForm";
import AiUsageLogList from "../components/aiUsageLog/AiUsageLogList";
import { useAiUsageLogs } from "../hooks/useAiUsageLogs";
import { useDeclarations } from "../hooks/useDeclarations";
import * as logService from "../services/aiUsageLog.service";
import type { AiCategory, AiExtent } from "../types";

export default function AiUsageLogPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { logs, loading, error, refetch } = useAiUsageLogs(projectId!);
  const { declarations } = useDeclarations(projectId!);
  const isSubmitted = declarations.some((d) => d.status === "SUBMITTED");

  async function handleCreate(data: {
    toolName: string;
    category: AiCategory;
    extent: AiExtent;
    purpose: string;
  }) {
    await logService.createLog(projectId!, data);
    refetch();
  }

  async function handleDelete(logId: string) {
    if (!window.confirm("Delete this log entry?")) return;
    await logService.deleteLog(projectId!, logId);
    refetch();
  }

  return (
    <PageLayout>
      <Link to={`/projects/${projectId}`} className="text-sm text-blue-600 hover:underline">
        &larr; Back to Project
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-6">AI Usage Logs</h1>

      {!isSubmitted && (
        <Card className="mb-6">
          <h2 className="font-semibold mb-3">Log New AI Usage</h2>
          <AiUsageLogForm onSubmit={handleCreate} />
        </Card>
      )}

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && <AiUsageLogList logs={logs} onReflectionSaved={refetch} onDelete={handleDelete} readOnly={isSubmitted} />}
    </PageLayout>
  );
}
