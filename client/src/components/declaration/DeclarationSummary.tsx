import type { Declaration } from "../../types";
import Badge from "../common/Badge";
import { formatDate } from "../../utils/formatDate";

interface DeclarationSummaryProps {
  declaration: Declaration;
}

export default function DeclarationSummary({ declaration }: DeclarationSummaryProps) {
  const isSubmitted = declaration.status === "SUBMITTED";

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
      <div>
        <p className="font-medium text-sm">{declaration.title}</p>
        <p className="text-xs text-gray-400">{formatDate(declaration.createdAt)}</p>
      </div>
      <Badge
        className={isSubmitted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
      >
        {declaration.status}
      </Badge>
    </div>
  );
}
