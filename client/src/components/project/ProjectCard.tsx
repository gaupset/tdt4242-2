import { Link } from "react-router-dom";
import type { Project } from "../../types";
import Card from "../common/Card";
import Badge from "../common/Badge";
import { formatDate } from "../../utils/formatDate";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <h3 className="font-semibold text-lg">{project.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {project.courseName} &mdash; {project.assignmentName}
        </p>
        {project.description && (
          <p className="text-sm text-gray-600 mt-2">{project.description}</p>
        )}
        <div className="flex gap-3 mt-4">
          <Badge className="bg-blue-100 text-blue-800">
            {project._count?.aiUsageLogs ?? 0} logs
          </Badge>
          <Badge className="bg-purple-100 text-purple-800">
            {project._count?.declarations ?? 0} declarations
          </Badge>
        </div>
        <p className="text-xs text-gray-400 mt-3">Created {formatDate(project.createdAt)}</p>
      </Card>
    </Link>
  );
}
