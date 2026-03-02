import type { AiUsageLog } from "../../types";
import AiUsageLogItem from "./AiUsageLogItem";

interface AiUsageLogListProps {
  logs: AiUsageLog[];
  onReflectionSaved: () => void;
  onDelete: (logId: string) => void;
  readOnly?: boolean;
}

export default function AiUsageLogList({ logs, onReflectionSaved, onDelete, readOnly }: AiUsageLogListProps) {
  if (logs.length === 0) {
    return <p className="text-gray-500 text-sm text-center py-8">No AI usage logs yet.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {logs.map((log) => (
        <AiUsageLogItem
          key={log.id}
          log={log}
          onReflectionSaved={onReflectionSaved}
          onDelete={onDelete}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
}
