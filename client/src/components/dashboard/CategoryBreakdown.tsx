import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import type { CategoryBreakdownItem } from "../../types";
import { AI_CATEGORIES } from "../../utils/constants";
import Card from "../common/Card";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#6b7280",
];

export default function CategoryBreakdown({ data }: { data: CategoryBreakdownItem[] }) {
  const chartData = data.map((item) => ({
    name: AI_CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category,
    value: item.count,
  }));

  return (
    <Card>
      <h3 className="font-semibold mb-4">Category Breakdown</h3>
      {chartData.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
