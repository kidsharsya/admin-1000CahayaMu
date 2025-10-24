'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';

const data = [
  { name: 'Jan', total: 2833.4 },
  { name: 'Feb', total: 3381.7 },
  { name: 'Mar', total: 4229.0 },
  { name: 'Apr', total: 2590.8 },
  { name: 'Mei', total: 3121.3 },
  { name: 'Jun', total: 2193.3 },
  { name: 'Jul', total: 1114.0 },
  { name: 'Agu', total: 5316.5 },
  { name: 'Sep', total: 1377.2 },
  { name: 'Okt', total: 242.25 },
  { name: 'Nov', total: 187.6 },
  { name: 'Des', total: 150.4 },
];

export const TrendEmisiBarChart = () => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <h3 className="font-semibold text-gray-700 mb-2">Tren Emisi Karbon Nasional</h3>
      <p className="text-sm text-gray-500 mb-4">Total Per bulan (2025)</p>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => [`${value.toLocaleString()} ton CO₂e`, 'Total Emisi']} labelFormatter={(label) => `Bulan: ${label}`} />
          <Bar dataKey="total" fill="#8979FF" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="total" position="top" className="text-xs fill-gray-700" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
