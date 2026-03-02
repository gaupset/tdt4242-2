import { FormEvent, useState } from "react";
import Button from "../common/Button";
import * as reflectionService from "../../services/reflection.service";

interface ReflectionFormProps {
  logId: string;
  initialContent: string;
  onSaved: () => void;
}

export default function ReflectionForm({ logId, initialContent, onSaved }: ReflectionFormProps) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await reflectionService.upsertReflection(logId, content);
      onSaved();
    } catch {
      setError("Failed to save reflection. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
        placeholder="Write your reflection on this AI usage..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={loading} className="self-end">
        {loading ? "Saving..." : "Save Reflection"}
      </Button>
    </form>
  );
}
