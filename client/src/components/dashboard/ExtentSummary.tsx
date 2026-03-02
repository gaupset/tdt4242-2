import type { ExtentDistributionItem } from "../../types";
import { AI_EXTENT_LEVELS } from "../../utils/constants";
import Card from "../common/Card";

export default function ExtentSummary({ data }: { data: ExtentDistributionItem[] }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card>
      <h3 className="font-semibold mb-4">Extent Distribution</h3>
      {data.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">No data yet</p>
      ) : (
        <div className="flex flex-col gap-3">
          {AI_EXTENT_LEVELS.map((level) => {
            const item = data.find((d) => d.extent === level.value);
            const count = item?.count ?? 0;
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={level.value}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{level.label}</span>
                  <span className="text-gray-500">
                    {count} ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      level.value === "MINIMAL"
                        ? "bg-green-500"
                        : level.value === "MODERATE"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
