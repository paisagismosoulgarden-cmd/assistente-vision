import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface FinanceChartProps {
  type: "pie" | "line";
}

const pieData = [
  { name: "Alimentação", value: 850, color: "#10B981" },
  { name: "Transporte", value: 430, color: "#3B82F6" },
  { name: "Lazer", value: 280, color: "#8B5CF6" },
  { name: "Educação", value: 190, color: "#F59E0B" },
  { name: "Outros", value: 140, color: "#EF4444" },
];

const lineData = [
  { month: "Jan", receitas: 3200, despesas: 2400 },
  { month: "Fev", receitas: 3500, despesas: 2100 },
  { month: "Mar", receitas: 2800, despesas: 2800 },
  { month: "Abr", receitas: 4100, despesas: 2600 },
  { month: "Mai", receitas: 3900, despesas: 2900 },
  { month: "Jun", receitas: 4500, despesas: 3100 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const FinanceChart = ({ type }: FinanceChartProps) => {
  if (type === "pie") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: any) => `R$ ${value.toFixed(2)}`}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={lineData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="month" 
          stroke="#6b7280"
          style={{ fontSize: "12px" }}
        />
        <YAxis 
          stroke="#6b7280"
          style={{ fontSize: "12px" }}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip 
          formatter={(value: any) => `R$ ${value.toFixed(2)}`}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="receitas"
          stroke="#10B981"
          strokeWidth={3}
          dot={{ fill: "#10B981", r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="despesas"
          stroke="#EF4444"
          strokeWidth={3}
          dot={{ fill: "#EF4444", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};