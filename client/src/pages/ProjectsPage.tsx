import { useState } from "react";
import PageLayout from "../components/layout/PageLayout";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProjectCard from "../components/project/ProjectCard";
import ProjectForm from "../components/project/ProjectForm";
import { useProjects } from "../hooks/useProjects";
import * as projectService from "../services/project.service";

export default function ProjectsPage() {
  const { projects, loading, error, refetch } = useProjects();
  const [showCreate, setShowCreate] = useState(false);

  async function handleCreate(data: {
    name: string;
    description?: string;
    courseName: string;
    assignmentName: string;
  }) {
    await projectService.createProject(data);
    setShowCreate(false);
    refetch();
  }

  return (
    <PageLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={() => setShowCreate(true)}>New Project</Button>
      </div>

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {!loading && projects.length === 0 && (
        <p className="text-gray-500 text-center py-12">
          No projects yet. Create your first project to start logging AI usage.
        </p>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Project">
        <ProjectForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} />
      </Modal>
    </PageLayout>
  );
}
