'use client';
import { useState } from 'react';
import type { UserEmissionFilters } from '@/types/userEmissionType';

interface SummaryFilterProps {
  onFilterChange?: (filters: UserEmissionFilters) => void;
  initialFilters?: UserEmissionFilters;
}

export function SummaryFilter({ onFilterChange, initialFilters }: SummaryFilterProps) {
  const now = new Date();
  const currentYear = now.getFullYear();

  // ✅ Langsung gunakan initialFilters sebagai initial state
  const [userType, setUserType] = useState<'semua' | 'individu' | 'lembaga'>((initialFilters?.user_type as 'semua' | 'individu' | 'lembaga') || 'semua');
  const [month, setMonth] = useState<number | 'semua'>(initialFilters?.month ?? 'semua');
  const [year, setYear] = useState<number | 'semua'>(initialFilters?.year ?? currentYear);

  const handleApply = () => {
    const filters: UserEmissionFilters = {
      user_type: userType,
      month: month,
      year: year,
    };
    onFilterChange?.(filters);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
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
        <option value="semua">Semua Tahun</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
      </select>

      {/* Tombol Terapkan Filter */}
      <button onClick={handleApply} className="ml-auto bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-md transition-colors">
        Terapkan Filter
      </button>
    </div>
  );
}
