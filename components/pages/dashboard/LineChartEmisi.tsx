'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', Transportasi: 250, Listrik: 180, Sampah: 100, Makanan: 80 },
  { name: 'Feb', Transportasi: 280, Listrik: 200, Sampah: 110, Makanan: 90 },
  { name: 'Mar', Transportasi: 350, Listrik: 250, Sampah: 150, Makanan: 120 },
  { name: 'Apr', Transportasi: 400, Listrik: 270, Sampah: 180, Makanan: 150 },
  { name: 'Mei', Transportasi: 310, Listrik: 220, Sampah: 130, Makanan: 100 },
  { name: 'Jun', Transportasi: 450, Listrik: 280, Sampah: 200, Makanan: 150 },
  { name: 'Jul', Transportasi: 390, Listrik: 240, Sampah: 150, Makanan: 110 },
  { name: 'Agu', Transportasi: 410, Listrik: 250, Sampah: 180, Makanan: 120 },
  { name: 'Sep', Transportasi: 370, Listrik: 230, Sampah: 140, Makanan: 100 },
  { name: 'Okt', Transportasi: 420, Listrik: 260, Sampah: 180, Makanan: 130 },
  { name: 'Nov', Transportasi: 350, Listrik: 210, Sampah: 130, Makanan: 90 },
  { name: 'Des', Transportasi: 300, Listrik: 200, Sampah: 110, Makanan: 70 },
];

export const TrendEmisiLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value, name) => [`${value} ton CO2e`, name]} />
        <Legend />
        <Line type="monotone" dataKey="Transportasi" stroke="#6366f1" strokeWidth={2} />
        <Line type="monotone" dataKey="Listrik" stroke="#f43f5e" strokeWidth={2} />
        <Line type="monotone" dataKey="Sampah" stroke="#10b981" strokeWidth={2} />
        <Line type="monotone" dataKey="Makanan" stroke="#f59e0b" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};
