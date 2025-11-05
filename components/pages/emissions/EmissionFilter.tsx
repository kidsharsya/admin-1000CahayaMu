'use client';
import { Search } from 'lucide-react';
import { useState } from 'react';

export function EmissionFilter() {
  const [userType, setUserType] = useState('semua');

  return (
    <div className="flex flex-wrap items-center gap-3 w-full">
      {/* Search */}
      <div className="relative min-w-[200px]">
        <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
        <input type="text" placeholder="Cari Nama Pengguna" className="pl-9 w-[330px] border border-gray-300 rounded-md py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
      </div>

      {/* Jenis Pengguna */}
      <select value={userType} onChange={(e) => setUserType(e.target.value)} className="w-[180px] border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
        <option value="semua">Semua Pengguna</option>
        <option value="individu">Individu</option>
        <option value="lembaga">Lembaga</option>
      </select>

      {/* Tombol Ekspor */}
      <button type="button" className="ml-auto bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-md transition-colors">
        Ekspor XLSX
      </button>
    </div>
  );
}
