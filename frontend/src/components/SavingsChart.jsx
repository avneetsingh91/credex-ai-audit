import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SavingsChart({ result }) {
  const data = [
    {
      name: "Monthly",
      value: result.totalMonthlySavings,
    },
    {
      name: "Annual",
      value: result.totalAnnualSavings,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl mt-8 shadow">
      <h3 className="text-xl font-bold mb-4">
        Savings Projection
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SavingsChart;