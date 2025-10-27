'use client';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export function UserFilter() {
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

      {/* Tombol Ekspor */}
      <Button className="ml-auto bg-emerald-500 hover:bg-emerald-600 text-white">Tambah User</Button>
    </div>
  );
}
