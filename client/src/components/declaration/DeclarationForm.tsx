import { FormEvent, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

interface DeclarationFormProps {
  onSubmit: (data: { title: string; summary: string }) => Promise<void>;
  onCancel: () => void;
}

export default function DeclarationForm({ onSubmit, onCancel }: DeclarationFormProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ title, summary });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Summary of AI Usage</label>
        <textarea
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
          placeholder="Describe how you used AI tools in this project..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-3 justify-end">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Declaration"}
        </Button>
      </div>
    </form>
  );
}
