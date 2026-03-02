import { FormEvent, useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { AI_CATEGORIES, AI_EXTENT_LEVELS } from "../../utils/constants";
import type { AiCategory, AiExtent } from "../../types";

interface AiUsageLogFormProps {
  onSubmit: (data: {
    toolName: string;
    category: AiCategory;
    extent: AiExtent;
    purpose: string;
  }) => Promise<void>;
}

export default function AiUsageLogForm({ onSubmit }: AiUsageLogFormProps) {
  const [toolName, setToolName] = useState("");
  const [category, setCategory] = useState("");
  const [extent, setExtent] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!category || !extent) return;
    setLoading(true);
    setError(null);
    try {
      await onSubmit({
        toolName,
        category: category as AiCategory,
        extent: extent as AiExtent,
        purpose,
      });
      setToolName("");
      setCategory("");
      setExtent("");
      setPurpose("");
    } catch {
      setError("Failed to log AI usage. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="AI Tool Name"
          placeholder="e.g. ChatGPT, Copilot"
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
          required
        />
        <Select
          label="Category"
          options={AI_CATEGORIES}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-2">Extent of AI Use</label>
        <div className="flex gap-3">
          {AI_EXTENT_LEVELS.map((level) => (
            <label
              key={level.value}
              className={`flex-1 text-center py-2 px-3 rounded-lg border cursor-pointer text-sm font-medium transition-colors ${
                extent === level.value
                  ? level.color + " border-transparent"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="extent"
                value={level.value}
                checked={extent === level.value}
                onChange={(e) => setExtent(e.target.value)}
                className="sr-only"
                required
              />
              {level.label}
            </label>
          ))}
        </div>
      </div>
      <Input
        label="Purpose"
        placeholder="Briefly describe how you used the AI tool"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" disabled={loading} className="self-end">
        {loading ? "Logging..." : "Log AI Usage"}
      </Button>
    </form>
  );
}
