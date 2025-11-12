'use client';

import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BackButton } from './BackButton';
import { UserEmissionInfo } from './UserProfile/UserEmissionInfo';
import { EmissionStatsGrid } from './StatsCard/EmissionStatGrid';
import { BuildingAssetSection } from './UserAsset/BuildingAssetSection';
import { VehicleAssetSection } from './UserAsset/VehicleAssetSection';
import { EmissionMonthlyReport } from './MonthlyReport/EmissionMonthlyReport';
import { TrendEmisiLineChart } from './EmissionChart/LineChartEmisi';
import { getUserEmissionById } from '@/lib/api/userEmission';
import { getBuildingAssetsByUserId } from '@/lib/api/userAsset';
import type { UserEmission, UserEmissionFilters } from '@/types/userEmissionType';

interface DetailEmissionContentProps {
  id?: string;
}

export function DetailEmissionContent({ id }: DetailEmissionContentProps) {
  const params = useParams<{ id: string }>();

  const effectiveId = useMemo(() => {
    const candidate = (id ?? params?.id ?? '').toString().trim();
    return candidate && candidate !== 'undefined' && candidate !== 'null' ? candidate : '';
  }, [id, params]);

  const [emissionAllPeriod, setEmissionAllPeriod] = useState<UserEmission | null>(null);
  const [buildingCount, setBuildingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<UserEmissionFilters>({});

  // ✅ Baca filter dari URL saat component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const year = urlParams.get('year');
    const month = urlParams.get('month');
    const userType = urlParams.get('user_type');

    const parsedFilters: UserEmissionFilters = {
      year: year ? (year === 'semua' ? 'semua' : Number(year)) : undefined,
      month: month ? (month === 'semua' ? 'semua' : Number(month)) : undefined,
      user_type: userType as 'individu' | 'lembaga' | 'semua' | undefined,
    };

    setFilters(parsedFilters);
  }, []);

  useEffect(() => {
    let mounted = true;

    if (!effectiveId) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);

        const [emissionDataAllPeriod, buildingAssets] = await Promise.all([
          getUserEmissionById(effectiveId, {}).catch(() => null), // Tanpa filter
          getBuildingAssetsByUserId(effectiveId).catch(() => []),
        ]);

        if (mounted) {
          setEmissionAllPeriod(emissionDataAllPeriod);
          setBuildingCount(buildingAssets.length);
        }
      } catch (error) {
        console.error('Failed to fetch emission data:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [effectiveId, filters]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col gap-6">
      <BackButton />

      {/* Pass emission dengan filter ke UserEmissionInfo */}
      <UserEmissionInfo id={effectiveId} filters={filters} />

      {/* Pass emission tanpa filter ke StatsCard */}
      <EmissionStatsGrid total_emission={emissionAllPeriod?.total_emisi_tons ?? 0} avg_emission={emissionAllPeriod?.avg_monthly_emisi_tons ?? 0} report_count={0} building_count={buildingCount} loading={loading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BuildingAssetSection userId={effectiveId} />
        <VehicleAssetSection userId={effectiveId} />
      </div>

      <EmissionMonthlyReport />
      <TrendEmisiLineChart />
    </div>
  );
}
