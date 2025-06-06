import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface ChartDataPoint {
  name: string;
  value: number;
}

export default function ChartCard({ data, title }: { data: ChartDataPoint[]; title: string }) {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 border border-yellow-800 mb-8">
      <h3 className="text-lg font-bold text-yellow-300 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eab30833" />
          <XAxis dataKey="name" stroke="#fde68a" />
          <YAxis stroke="#fde68a" />
          <Tooltip contentStyle={{ background: '#1f2937', color: '#fde68a' }} />
          <Line type="monotone" dataKey="value" stroke="#fde68a" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
