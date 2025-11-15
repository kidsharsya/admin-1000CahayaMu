'use client';

import { useEffect, useState } from 'react';
import { Car } from 'lucide-react';
import { VehicleAssetCard } from './VehicleAssetCard';
import { getVehicleAssetsByUserId } from '@/lib/api/userAsset';
import type { VehicleAsset } from '@/types/vehicleAssetType';

interface VehicleAssetSectionProps {
  userId: string;
}

export function VehicleAssetSection({ userId }: VehicleAssetSectionProps) {
  const [assets, setAssets] = useState<VehicleAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    if (!userId) {
      setError('ID pengguna tidak valid.');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getVehicleAssetsByUserId(userId);
        if (mounted) setAssets(data);
      } catch (e) {
        if (mounted) setError(e instanceof Error ? e.message : 'Gagal memuat aset kendaraan.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Car className="w-5 h-5 text-gray-700" />
          <h2 className="font-semibold text-gray-800">Aset Kendaraan</h2>
        </div>
        <div className="h-24 bg-gray-100 animate-pulse rounded-md" />
      </div>
    );
  }

  if (error) {
    return <div className="border border-red-200 rounded-xl p-4 bg-red-50 text-red-700">{error}</div>;
  }

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Car className="w-5 h-5 text-gray-700" />
        <h2 className="font-semibold text-gray-800">Aset Kendaraan ({assets.length})</h2>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {assets.map((asset) => (
          <VehicleAssetCard key={asset.id} asset={asset} />
        ))}
        {assets.length === 0 && <p className="text-sm text-gray-500">Tidak ada aset kendaraan.</p>}
      </div>
    </div>
  );
}
