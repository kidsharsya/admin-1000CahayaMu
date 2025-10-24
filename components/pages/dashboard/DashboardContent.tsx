'use client';

import { StatCard } from './StatCard';
import { TrendEmisiLineChart } from './LineChartEmisi';
import { DistribusiDonutChart } from './DonutChartEmisi';
import { TopProvinsiCard } from './TopProvinsiChart';
import { TrendEmisiBarChart } from './BarChartEmisi';

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Emisi Karbon" value="2.847.593" unit="CO2e (ton)" change="+12.3% dari bulan lalu" changeType="up" />
        <StatCard title="Total Pengguna" value="5.710" unit="pengguna" change="+12.3% dari bulan lalu" changeType="up" />
        <StatCard title="Rata-rata emisi provinsi" value="184.6" unit="CO2e/bulan" change="+12.3% dari bulan lalu" changeType="down" />
        <StatCard title="Kategori Dominan" value="Transportasi" unit="60% kontribusi" note="Tertinggi Nasional" />
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-2xl shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2">Tren Emisi Karbon Nasional</h3>
          <p className="text-sm text-gray-500 mb-4">Per bulan Per Kategori (2025)</p>
          <TrendEmisiLineChart />
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2">Distribusi per Kategori</h3>
          <p className="text-sm text-gray-500 mb-4">Persentase Kontribusi</p>
          <DistribusiDonutChart />
        </div>
      </div>

      {/* Row 3: Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProvinsiCard />
        <TrendEmisiBarChart />
      </div>
    </div>
  );
}
