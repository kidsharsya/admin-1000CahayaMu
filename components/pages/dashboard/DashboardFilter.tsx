'use client';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { getProvinces } from '@/lib/api/region';
import type { DashboardFilters } from '@/types/dashboardType';

interface DashboardFilterProps {
  onFilterChange?: (filters: DashboardFilters) => void;
}

export function DashboardFilter({ onFilterChange }: DashboardFilterProps) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const MAX_PROVINCES = 5;

  // ✅ Tetap ada state tapi tidak tampilkan di UI
  // const [userType, setUserType] = useState<'semua' | 'individu' | 'lembaga'>('semua');
  const [month, setMonth] = useState<number | 'semua'>('semua');
  const [year, setYear] = useState<number | 'semua'>(currentYear);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [isProvinceOpen, setIsProvinceOpen] = useState(false);

  const [provinces, setProvinces] = useState<Array<{ id: string; name: string }>>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoadingProvinces(true);
        const provincesData = await getProvinces();
        const provinceList = Object.entries(provincesData).map(([code, name]) => ({
          id: code,
          name: name,
        }));
        setProvinces(provinceList);
      } catch (error) {
        console.error('Failed to fetch provinces:', error);
      } finally {
        setLoadingProvinces(false);
      }
    })();
  }, []);

  const toggleProvince = (provinceId: string) => {
    setSelectedProvinces((prev) => {
      const isSelected = prev.includes(provinceId);

      // ✅ Jika sudah dipilih, uncheck (remove dari array)
      if (isSelected) {
        return prev.filter((p) => p !== provinceId);
      }

      // ✅ Jika belum dipilih, cek apakah sudah mencapai limit
      if (prev.length >= MAX_PROVINCES) {
        alert(`Maksimal ${MAX_PROVINCES} provinsi yang dapat dipilih`);
        return prev; // Tidak tambah
      }

      // ✅ Tambah ke array
      return [...prev, provinceId];
    });
  };

  const handleApply = () => {
    const filters: DashboardFilters = {
      // ✅ Tidak kirim user_type ke API (atau kirim undefined)
      // user_type: userType,
      month: month,
      year: year,
      provinces: selectedProvinces.length > 0 ? selectedProvinces : undefined,
    };
    onFilterChange?.(filters);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 w-full relative">
      {/* ✅ HIDE filter Jenis Pengguna */}
      {/* <select value={userType} onChange={(e) => setUserType(e.target.value as 'semua' | 'individu' | 'lembaga')} className="w-[180px] border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
        <option value="semua">Semua Pengguna</option>
        <option value="individu">Individu</option>
        <option value="lembaga">Lembaga</option>
      </select> */}

      {/* Bulan */}
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value === 'semua' ? 'semua' : Number(e.target.value))}
        className="w-[150px] border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
      >
        <option value="semua">Semua Bulan</option>
        <option value="1">Januari</option>
        <option value="2">Februari</option>
        <option value="3">Maret</option>
        <option value="4">April</option>
        <option value="5">Mei</option>
        <option value="6">Juni</option>
        <option value="7">Juli</option>
        <option value="8">Agustus</option>
        <option value="9">September</option>
        <option value="10">Oktober</option>
        <option value="11">November</option>
        <option value="12">Desember</option>
      </select>

      {/* Tahun */}
      <select
        value={year}
        onChange={(e) => setYear(e.target.value === 'semua' ? 'semua' : Number(e.target.value))}
        className="w-[150px] border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
      >
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
      </select>

      {/* Provinsi multi-select - ✅ Max 5 */}
      <div className="relative w-[300px]">
        <button type="button" onClick={() => setIsProvinceOpen((p) => !p)} className="w-full flex justify-between items-center border border-gray-300 rounded-md py-2 px-3 text-sm bg-white focus:ring-2 focus:ring-emerald-500">
          <span className="truncate">{selectedProvinces.length > 0 ? `${selectedProvinces.length}/${MAX_PROVINCES} provinsi dipilih` : loadingProvinces ? 'Memuat provinsi...' : `Pilih Provinsi (Max ${MAX_PROVINCES})`}</span>
          <ChevronDown className={`w-4 h-4 text-black transition-transform ${isProvinceOpen ? 'rotate-180' : ''}`} />
        </button>

        {isProvinceOpen && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {loadingProvinces ? (
              <div className="px-3 py-2 text-sm text-gray-500">Memuat provinsi...</div>
            ) : provinces.length > 0 ? (
              <>
                {/* ✅ Info helper text */}
                <div className="sticky top-0 bg-gray-50 px-3 py-2 text-xs text-gray-600 border-b">
                  Maksimal {MAX_PROVINCES} provinsi ({selectedProvinces.length} dipilih)
                </div>

                {provinces.map((province) => {
                  const isSelected = selectedProvinces.includes(province.id);
                  const isDisabled = !isSelected && selectedProvinces.length >= MAX_PROVINCES;
                  return (
                    <label key={province.id} className={`flex items-center px-3 py-2 text-sm ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}`}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleProvince(province.id)}
                        disabled={isDisabled}
                        className="mr-2 rounded text-emerald-600 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      {province.name}
                    </label>
                  );
                })}
              </>
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">Tidak ada data provinsi</div>
            )}
          </div>
        )}
      </div>

      {/* Tombol Terapkan Filter */}
      <button onClick={handleApply} className="ml-auto bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-md transition-colors">
        Terapkan Filter
      </button>
    </div>
  );
}
