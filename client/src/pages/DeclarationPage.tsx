import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";
import LoadingSpinner from "../components/common/LoadingSpinner";
import DeclarationView from "../components/declaration/DeclarationView";
import * as declarationService from "../services/declaration.service";
import type { Declaration } from "../types";

export default function DeclarationPage() {
  const { id, projectId } = useParams<{ id: string; projectId: string }>();
  const [declaration, setDeclaration] = useState<Declaration | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      declarationService.getDeclaration(projectId!, id!),
      declarationService.getDeclarations(projectId!),
    ]).then(([decl, all]) => {
      setDeclaration(decl);
      setHasSubmitted(all.some((d: Declaration) => d.status === "SUBMITTED"));
      setLoading(false);
    });
  }, [id, projectId]);

  async function handleSubmit(declId: string) {
    const updated = await declarationService.submitDeclaration(projectId!, declId);
    setDeclaration(updated);
  }

  if (loading) return <PageLayout><LoadingSpinner /></PageLayout>;

  return (
    <PageLayout>
      <Link to={`/projects/${projectId}`} className="text-sm text-blue-600 hover:underline">
        &larr; Back to Project
      </Link>
      <div className="mt-4">
        {declaration && (
          <DeclarationView
            declaration={declaration}
            onSubmit={hasSubmitted ? undefined : handleSubmit}
          />
        )}
      </div>
    </PageLayout>
  );
}
