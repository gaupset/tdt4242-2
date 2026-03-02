import { FormEvent, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

interface ProjectFormProps {
  onSubmit: (data: {
    name: string;
    description?: string;
    courseName: string;
    assignmentName: string;
  }) => Promise<void>;
  onCancel: () => void;
}

export default function ProjectForm({ onSubmit, onCancel }: ProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [courseName, setCourseName] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        name,
        description: description || undefined,
        courseName,
        assignmentName,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Project Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input
        label="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        required
      />
      <Input
        label="Assignment Name"
        value={assignmentName}
        onChange={(e) => setAssignmentName(e.target.value)}
        required
      />
      <Input
        label="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-3 justify-end">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
