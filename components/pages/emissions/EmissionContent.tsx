'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EmissionFilter } from './EmissionFilter';
import { EmissionTable } from './EmissionTable';
import { StatCardEmission } from './StatCard';
import { SummaryFilter } from './SummaryFilter';
import { getDashboardOverview } from '@/lib/api/dashboardOverview';
import type { DashboardOverview } from '@/types/dashboardOverview';
import type { UserEmissionFilters } from '@/types/userEmissionType';

export function EmissionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const now = new Date();
  const currentYear = now.getFullYear();

  const [filters, setFilters] = useState<UserEmissionFilters>({
    year: currentYear,
    month: 'semua',
    user_type: 'semua',
  });
  const [stats, setStats] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const userType = searchParams.get('user_type');
    const search = searchParams.get('search');

    setFilters({
      year: year ? (year === 'semua' ? 'semua' : Number(year)) : currentYear,
      month: month ? (month === 'semua' ? 'semua' : Number(month)) : 'semua',
      user_type: (userType as 'individu' | 'lembaga' | 'semua') || 'semua',
      search: search || undefined,
    });
  }, [searchParams, currentYear]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getDashboardOverview();
        if (mounted) setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard overview:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleFilterChange = (newFilters: UserEmissionFilters) => {
    const updatedFilters = { ...filters, ...newFilters };

    const params = new URLSearchParams();
    if (updatedFilters.year && updatedFilters.year !== 'semua') {
      params.set('year', String(updatedFilters.year));
    }
    if (updatedFilters.month && updatedFilters.month !== 'semua') {
      params.set('month', String(updatedFilters.month));
    }
    if (updatedFilters.user_type && updatedFilters.user_type !== 'semua') {
      params.set('user_type', updatedFilters.user_type);
    }
    if (updatedFilters.search) {
      params.set('search', updatedFilters.search);
    }

    const queryString = params.toString();
    router.replace(`/admin/emissions${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const handleSearchChange = (search: string) => {
    handleFilterChange({ search });
  };

  const totalEmissionsTons = stats?.total_emissions ?? 0;
  const formattedEmissions = totalEmissionsTons.toLocaleString('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="space-y-4">
      <SummaryFilter key={`${filters.year}-${filters.month}-${filters.user_type}`} onFilterChange={handleFilterChange} initialFilters={filters} />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCardEmission title="Total Emisi" value={loading ? '...' : formattedEmissions} unit="ton CO₂e" change="+12.3% dari bulan lalu" changeType="up" />
        <StatCardEmission title="Total Emisi Listrik" value="0" unit="ton CO₂e" change="+12.3% dari bulan lalu" changeType="up" />
        <StatCardEmission title="Total Emisi Transportasi" value="0" unit="ton CO₂e" change="-12.3% dari bulan lalu" changeType="down" />
        <StatCardEmission title="Total Emisi Makanan" value="0" unit="ton CO₂e" change="+12.3% dari bulan lalu" changeType="up" />
        <StatCardEmission title="Total Emisi Sampah" value="0" unit="ton CO₂e" change="-12.3% dari bulan lalu" changeType="down" />
      </div>

      <div className="bg-white border rounded-xl p-4 space-y-4 shadow-sm">
        {/* ✅ Tambahkan key untuk force re-mount saat search berubah */}
        <EmissionFilter key={filters.search || 'no-search'} onSearchChange={handleSearchChange} initialSearch={filters.search} />
        <EmissionTable filters={filters} />
      </div>
    </div>
  );
}
