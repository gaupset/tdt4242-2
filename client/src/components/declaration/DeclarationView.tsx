import type { Declaration } from "../../types";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { formatDateTime } from "../../utils/formatDate";

interface DeclarationViewProps {
  declaration: Declaration;
  onSubmit?: (id: string) => void;
}

export default function DeclarationView({ declaration, onSubmit }: DeclarationViewProps) {
  const isSubmitted = declaration.status === "SUBMITTED";

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">{declaration.title}</h3>
        <Badge
          className={isSubmitted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
        >
          {declaration.status}
        </Badge>
      </div>
      <p className="text-sm text-gray-600 whitespace-pre-wrap">{declaration.summary}</p>
      {declaration.submittedAt && (
        <p className="text-xs text-gray-400 mt-3">
          Submitted {formatDateTime(declaration.submittedAt)}
        </p>
      )}
      {!isSubmitted && onSubmit && (
        <div className="mt-4">
          <Button
            variant="primary"
            onClick={() => {
              if (window.confirm("Submit this declaration? This action cannot be undone.")) {
                onSubmit(declaration.id);
              }
            }}
          >
            Submit Declaration
          </Button>
        </div>
      )}
    </Card>
  );
}
