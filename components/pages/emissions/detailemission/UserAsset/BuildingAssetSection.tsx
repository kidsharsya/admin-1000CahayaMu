'use client';
import { useEffect, useMemo, useState } from 'react';
import { Building2 } from 'lucide-react';
import { BuildingAssetCard } from './BuildingAssetCard';
import type { BuildingAsset } from '@/types/buildingAssetType';
import type { ElectricityEmissionTarifWithCategoryName } from '@/types/electricityEmissionTarif';
import { getBuildingAssetsByUserId } from '@/lib/api/userAsset';
import { getElectricityEmissionTariffsWithCategoryName } from '@/lib/api/electricityEmissionTarif';
import { getProvinceName, getRegencyName, getDistrictName, getVillageName } from '@/lib/api/region';

interface BuildingAssetSectionProps {
  userId: string;
}

type EnrichedBuildingAsset = BuildingAsset & {
  __long_address: string;
};

interface CardData {
  key: string;
  name: string;
  electricityType: string;
  electricityPower: string;
  area: string;
  address: string;
  equipments: { name: string; unit: string }[];
}

export function BuildingAssetSection({ userId }: BuildingAssetSectionProps) {
  const [assets, setAssets] = useState<EnrichedBuildingAsset[]>([]);
  const [tariffMap, setTariffMap] = useState<Map<string, ElectricityEmissionTarifWithCategoryName>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    if (!userId) {
      setError('User ID tidak valid');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ Cukup fetch 2 saja (bukan 3), tariffs sudah include category_name
        const [assetList, tariffsResponse] = await Promise.all([
          getBuildingAssetsByUserId(userId),
          getElectricityEmissionTariffsWithCategoryName(1, 1000), // ✅ Fetch semua tariff sekaligus
        ]);

        if (!mounted) return;

        // ✅ Build tariff map (sudah ada category_name dari API)
        const tariffMapLocal = new Map<string, ElectricityEmissionTarifWithCategoryName>();
        (tariffsResponse?.data ?? []).forEach((t) => {
          tariffMapLocal.set(t.id, t); // ✅ Langsung set, sudah ada category_name
        });

        // ✅ Enrich building assets dengan alamat lengkap
        const enriched: EnrichedBuildingAsset[] = await Promise.all(
          assetList.map(async (a) => {
            const addressCore = a.full_address || a.address_label || '-';
            try {
              const provinceCode = a.province_code.startsWith('id') ? a.province_code : `id${a.province_code}`;
              const regencyCode = a.regency_code.startsWith('id') ? a.regency_code : `id${a.regency_code}`;
              const districtCode = a.district_code.startsWith('id') ? a.district_code : `id${a.district_code}`;
              const villageCode = a.village_code.startsWith('id') ? a.village_code : `id${a.village_code}`;

              const [provinceName, regencyName, districtName, villageName] = await Promise.all([
                getProvinceName(provinceCode),
                getRegencyName(regencyCode, provinceCode),
                getDistrictName(districtCode, regencyCode),
                getVillageName(villageCode, districtCode),
              ]);

              const postal = a.postal_code ? ` ${a.postal_code}` : '';
              const longAddress = [addressCore, villageName, districtName, regencyName, provinceName].filter(Boolean).join(', ') + postal;

              return { ...a, __long_address: longAddress };
            } catch {
              return { ...a, __long_address: addressCore };
            }
          })
        );

        setAssets(enriched);
        setTariffMap(tariffMapLocal);
      } catch (e) {
        if (mounted) setError(e instanceof Error ? e.message : 'Gagal memuat aset bangunan');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [userId]);

  const cards: CardData[] = useMemo(() => {
    return assets.map((a) => {
      const tariff = a.electricity_tariff_id ? tariffMap.get(a.electricity_tariff_id) : undefined;
      const area = typeof a.metadata?.area_sqm === 'number' ? `${a.metadata.area_sqm} m²` : '-';

      const equipments = a.metadata?.electronics_inventory
        ? Object.entries(a.metadata.electronics_inventory).map(([name, qty]) => ({
            name,
            unit: `${qty} unit`,
          }))
        : [];

      return {
        key: a.id,
        name: a.name,
        electricityType: tariff?.category_name ?? '—', // ✅ Sudah ada dari tariffMap
        electricityPower: a.power_capacity_label ?? '—',
        area,
        address: a.__long_address,
        equipments,
      };
    });
  }, [assets, tariffMap]);

  if (loading) {
    return (
      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-gray-700" />
          <h2 className="font-semibold text-gray-800">Aset Bangunan</h2>
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
        <Building2 className="w-5 h-5 text-gray-700" />
        <h2 className="font-semibold text-gray-800">Aset Bangunan ({assets.length})</h2>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {cards.map((c) => (
          <BuildingAssetCard key={c.key} name={c.name} electricityType={c.electricityType} electricityPower={c.electricityPower} area={c.area} address={c.address} equipments={c.equipments} />
        ))}
        {assets.length === 0 && <p className="text-sm text-gray-500">Tidak ada aset bangunan.</p>}
      </div>
    </div>
  );
}
