import { useState } from "react";
import type { AiUsageLog } from "../../types";
import Badge from "../common/Badge";
import ReflectionForm from "../reflection/ReflectionForm";
import { AI_CATEGORIES, AI_EXTENT_LEVELS } from "../../utils/constants";
import { formatDateTime } from "../../utils/formatDate";

interface AiUsageLogItemProps {
  log: AiUsageLog;
  onReflectionSaved: () => void;
  onDelete: (logId: string) => void;
  readOnly?: boolean;
}

export default function AiUsageLogItem({ log, onReflectionSaved, onDelete, readOnly }: AiUsageLogItemProps) {
  const [showReflection, setShowReflection] = useState(false);

  const categoryLabel =
    AI_CATEGORIES.find((c) => c.value === log.category)?.label ?? log.category;
  const extentLevel = AI_EXTENT_LEVELS.find((e) => e.value === log.extent);

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <span className="font-medium">{log.toolName}</span>
          <span className="text-xs text-gray-400 ml-2">{formatDateTime(log.timestamp)}</span>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-blue-100 text-blue-800">{categoryLabel}</Badge>
          <Badge className={extentLevel?.color}>{extentLevel?.label}</Badge>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{log.purpose}</p>

      {log.reflectionNote && (
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs font-medium text-amber-800 mb-1">Reflection</p>
          <p className="text-sm text-amber-900">{log.reflectionNote.content}</p>
        </div>
      )}

      {!readOnly && (
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => setShowReflection(!showReflection)}
            className="text-xs text-blue-600 hover:underline"
          >
            {log.reflectionNote ? "Edit Reflection" : "Add Reflection"}
          </button>
          <button
            onClick={() => onDelete(log.id)}
            className="text-xs text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      )}

      {showReflection && (
        <div className="mt-3">
          <ReflectionForm
            logId={log.id}
            initialContent={log.reflectionNote?.content ?? ""}
            onSaved={() => {
              setShowReflection(false);
              onReflectionSaved();
            }}
          />
        </div>
      )}
    </div>
  );
}
