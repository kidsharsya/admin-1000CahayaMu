'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function DashboardFilter() {
  const [userType, setUserType] = useState('semua');
  const [month, setMonth] = useState('semua');
  const [year, setYear] = useState('semua');
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [isProvinceOpen, setIsProvinceOpen] = useState(false);

  const provinces = ['Daerah Istimewa Yogyakarta', 'DKI Jakarta', 'Jawa Tengah', 'Jawa Barat', 'Sumatra Barat'];

  const toggleProvince = (province: string) => {
    setSelectedProvinces((prev) => (prev.includes(province) ? prev.filter((p) => p !== province) : [...prev, province]));
  };

  const handleApply = () => {
    console.log({
      userType,
      month,
      year,
      provinces: selectedProvinces,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 w-full relative">
      {/* Jenis Pengguna */}
      <select value={userType} onChange={(e) => setUserType(e.target.value)} className="w-[180px] border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
        <option value="semua">Semua Pengguna</option>
        <option value="individu">Individu</option>
        <option value="lembaga">Lembaga</option>
      </select>

      {/* Bulan */}
      <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-[150px] border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
        <option value="semua">Semua Bulan</option>
        <option value="januari">Januari</option>
        <option value="februari">Februari</option>
        <option value="maret">Maret</option>
        <option value="april">April</option>
        <option value="mei">Mei</option>
        <option value="juni">Juni</option>
        <option value="juli">Juli</option>
        <option value="agustus">Agustus</option>
        <option value="september">September</option>
        <option value="oktober">Oktober</option>
        <option value="november">November</option>
        <option value="desember">Desember</option>
      </select>

      {/* Tahun */}
      <select value={year} onChange={(e) => setYear(e.target.value)} className="w-[150px] border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white ">
        <option value="semua">Semua Tahun</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
      </select>

      {/* Provinsi multi-select custom */}
      <div className="relative w-[300px]">
        <button type="button" onClick={() => setIsProvinceOpen((p) => !p)} className="w-full flex justify-between items-center border border-gray-300 rounded-md py-2 px-3 text-sm bg-white focus:ring-2 focus:ring-emerald-500">
          <span className="truncate">{selectedProvinces.length > 0 ? selectedProvinces.join(', ') : 'Pilih Provinsi'}</span>
          <ChevronDown className={`w-4 h-4 text-black transition-transform ${isProvinceOpen ? 'rotate-180' : ''}`} />
        </button>

        {isProvinceOpen && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {provinces.map((province) => (
              <label key={province} className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                <input type="checkbox" checked={selectedProvinces.includes(province)} onChange={() => toggleProvince(province)} className="mr-2 rounded text-emerald-600 focus:ring-emerald-500" />
                {province}
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
