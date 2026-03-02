import PageLayout from "../components/layout/PageLayout";
import Card from "../components/common/Card";
import LoadingSpinner from "../components/common/LoadingSpinner";
import UsageOverTimeChart from "../components/dashboard/UsageOverTimeChart";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown";
import ExtentSummary from "../components/dashboard/ExtentSummary";
import { useDashboard } from "../hooks/useDashboard";

export default function DashboardPage() {
  const { summary, usageOverTime, categoryBreakdown, extentDistribution, loading, error } =
    useDashboard();

  return (
    <PageLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500">{error}</p>}

      {summary && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <p className="text-sm text-gray-500">Projects</p>
              <p className="text-3xl font-bold">{summary.totalProjects}</p>
            </Card>
            <Card>
              <p className="text-sm text-gray-500">AI Usage Logs</p>
              <p className="text-3xl font-bold">{summary.totalLogs}</p>
            </Card>
            <Card>
              <p className="text-sm text-gray-500">Declarations</p>
              <p className="text-3xl font-bold">{summary.totalDeclarations}</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UsageOverTimeChart data={usageOverTime} />
            <CategoryBreakdown data={categoryBreakdown} />
          </div>

          <div className="mt-6 max-w-md">
            <ExtentSummary data={extentDistribution} />
          </div>
        </>
      )}
    </PageLayout>
  );
}
