import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { UsageOverTimeItem } from "../../types";
import Card from "../common/Card";

export default function UsageOverTimeChart({ data }: { data: UsageOverTimeItem[] }) {
  return (
    <Card>
      <h3 className="font-semibold mb-4">AI Usage Over Time</h3>
      {data.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">No data yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
