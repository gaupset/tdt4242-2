import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Modal from "../components/common/Modal";
import AiUsageLogForm from "../components/aiUsageLog/AiUsageLogForm";
import AiUsageLogList from "../components/aiUsageLog/AiUsageLogList";
import DeclarationForm from "../components/declaration/DeclarationForm";
import DeclarationSummary from "../components/declaration/DeclarationSummary";
import { useAiUsageLogs } from "../hooks/useAiUsageLogs";
import { useDeclarations } from "../hooks/useDeclarations";
import * as projectService from "../services/project.service";
import * as logService from "../services/aiUsageLog.service";
import * as declarationService from "../services/declaration.service";
import type { Project, AiCategory, AiExtent } from "../types";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [projectLoading, setProjectLoading] = useState(true);
  const { logs, loading: logsLoading, refetch: refetchLogs } = useAiUsageLogs(id!);
  const {
    declarations,
    loading: declLoading,
    refetch: refetchDeclarations,
  } = useDeclarations(id!);
  const [showLogForm, setShowLogForm] = useState(false);
  const [showDeclForm, setShowDeclForm] = useState(false);
  const isSubmitted = declarations.some((d) => d.status === "SUBMITTED");

  useEffect(() => {
    projectService.getProject(id!).then((data) => {
      setProject(data);
      setProjectLoading(false);
    });
  }, [id]);

  async function handleCreateLog(data: {
    toolName: string;
    category: AiCategory;
    extent: AiExtent;
    purpose: string;
  }) {
    await logService.createLog(id!, data);
    setShowLogForm(false);
    refetchLogs();
  }

  async function handleDeleteLog(logId: string) {
    if (!window.confirm("Delete this log entry?")) return;
    await logService.deleteLog(id!, logId);
    refetchLogs();
  }

  async function handleCreateDeclaration(data: { title: string; summary: string }) {
    await declarationService.createDeclaration(id!, data);
    setShowDeclForm(false);
    refetchDeclarations();
  }

  if (projectLoading) return <PageLayout><LoadingSpinner /></PageLayout>;

  return (
    <PageLayout>
      <Link to="/projects" className="text-sm text-blue-600 hover:underline">&larr; Back to Projects</Link>

      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold">{project?.name}</h1>
        <p className="text-gray-500">
          {project?.courseName} &mdash; {project?.assignmentName}
        </p>
        {project?.description && <p className="text-sm text-gray-600 mt-1">{project.description}</p>}
      </div>

      {/* AI Usage Logs Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">AI Usage Logs</h2>
          {!isSubmitted && (
            <Button onClick={() => setShowLogForm(!showLogForm)}>
              {showLogForm ? "Cancel" : "Log AI Usage"}
            </Button>
          )}
        </div>

        {showLogForm && !isSubmitted && (
          <Card className="mb-4">
            <AiUsageLogForm onSubmit={handleCreateLog} />
          </Card>
        )}

        {logsLoading ? (
          <LoadingSpinner />
        ) : (
          <AiUsageLogList logs={logs} onReflectionSaved={refetchLogs} onDelete={handleDeleteLog} readOnly={isSubmitted} />
        )}
      </div>

      {/* Declarations Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Declarations</h2>
          {!isSubmitted && (
            <Button onClick={() => setShowDeclForm(true)}>New Declaration</Button>
          )}
        </div>

        {declLoading ? (
          <LoadingSpinner />
        ) : declarations.length === 0 ? (
          <p className="text-gray-500 text-sm">No declarations yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {declarations.map((decl) => (
              <Link key={decl.id} to={`/projects/${id}/declarations/${decl.id}`}>
                <DeclarationSummary declaration={decl} />
              </Link>
            ))}
          </div>
        )}
      </div>

      <Modal open={showDeclForm} onClose={() => setShowDeclForm(false)} title="Create Declaration">
        <DeclarationForm
          onSubmit={handleCreateDeclaration}
          onCancel={() => setShowDeclForm(false)}
        />
      </Modal>
    </PageLayout>
  );
}
