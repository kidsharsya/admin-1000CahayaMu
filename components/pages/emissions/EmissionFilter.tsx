'use client';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export function EmissionFilter() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative min-w-[200px]">
        <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
        <Input placeholder="Cari Nama Pengguna" className="pl-9 w-[330px]" />
      </div>

      {/* Jenis Pengguna */}
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Semua Pengguna" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="semua">Semua Pengguna</SelectItem>
          <SelectItem value="individu">Individu</SelectItem>
          <SelectItem value="lembaga">Lembaga</SelectItem>
        </SelectContent>
      </Select>

      {/* Bulan */}
      {/* <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Semua Bulan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="semua">Semua Bulan</SelectItem>
          <SelectItem value="januari">Januari</SelectItem>
          <SelectItem value="februari">Februari</SelectItem>
          <SelectItem value="maret">Maret</SelectItem>
        </SelectContent>
      </Select> */}

      {/* Tahun */}
      {/* <Select>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Semua Tahun" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="semua">Semua Tahun</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2025">2025</SelectItem>
        </SelectContent>
      </Select> */}

      {/* Tombol Ekspor */}
      <Button className="ml-auto bg-emerald-500 hover:bg-emerald-600 text-white">Ekspor XLSX</Button>
    </div>
  );
}
