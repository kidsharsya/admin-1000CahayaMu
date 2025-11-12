'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { DashboardFilters } from '@/types/dashboardType';

interface DashboardFilterProps {
  onFilterChange?: (filters: DashboardFilters) => void;
}

export function DashboardFilter({ onFilterChange }: DashboardFilterProps) {
  const now = new Date();
  const currentYear = now.getFullYear();

  const [userType, setUserType] = useState<'semua' | 'individu' | 'lembaga'>('semua');
  const [month, setMonth] = useState<number | 'semua'>('semua');
  const [year, setYear] = useState<number | 'semua'>(currentYear);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [isProvinceOpen, setIsProvinceOpen] = useState(false);

  const provinces = [
    { id: 'id31', name: 'DKI Jakarta' },
    { id: 'id32', name: 'Jawa Barat' },
    { id: 'id33', name: 'Jawa Tengah' },
    { id: 'id34', name: 'Daerah Istimewa Yogyakarta' },
    { id: 'id35', name: 'Jawa Timur' },
  ];

  const toggleProvince = (provinceId: string) => {
    setSelectedProvinces((prev) => (prev.includes(provinceId) ? prev.filter((p) => p !== provinceId) : [...prev, provinceId]));
  };

  const handleApply = () => {
    const filters: DashboardFilters = {
      user_type: userType,
      month: month,
      year: year,
      provinces: selectedProvinces,
    };
    onFilterChange?.(filters);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 w-full relative">
      {/* Jenis Pengguna */}
      <select
        value={userType}
        onChange={(e) => setUserType(e.target.value as 'semua' | 'individu' | 'lembaga')}
        className="w-[180px] border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
      >
        <option value="semua">Semua Pengguna</option>
        <option value="individu">Individu</option>
        <option value="lembaga">Lembaga</option>
      </select>

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

      {/* Provinsi multi-select custom */}
      <div className="relative w-[300px]">
        <button type="button" onClick={() => setIsProvinceOpen((p) => !p)} className="w-full flex justify-between items-center border border-gray-300 rounded-md py-2 px-3 text-sm bg-white focus:ring-2 focus:ring-emerald-500">
          <span className="truncate">{selectedProvinces.length > 0 ? `${selectedProvinces.length} provinsi dipilih` : 'Pilih Provinsi'}</span>
          <ChevronDown className={`w-4 h-4 text-black transition-transform ${isProvinceOpen ? 'rotate-180' : ''}`} />
        </button>

        {isProvinceOpen && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {provinces.map((province) => (
              <label key={province.id} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                <input type="checkbox" checked={selectedProvinces.includes(province.id)} onChange={() => toggleProvince(province.id)} className="mr-2 rounded text-emerald-600 focus:ring-emerald-500" />
                {province.name}
              </label>
            ))}
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
