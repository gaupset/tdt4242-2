import { Link } from "react-router-dom";
import PageLayout from "../components/layout/PageLayout";

export default function NotFoundPage() {
  return (
    <PageLayout>
      <div className="text-center py-20">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <p className="text-gray-500 mt-4 mb-6">Page not found</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Go to Dashboard
        </Link>
      </div>
    </PageLayout>
  );
}
