import { ScrollArea } from '@/components/ui/scroll-area';
import { UserRow } from './UserRow';
import { User } from 'lucide-react';
import { UserData } from '@/data/userData';

export function UserTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-2">
        <User className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-700">Data Pengguna</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">Menampilkan {UserData.length} dari seluruh data pengguna</p>

      <ScrollArea className="w-full">
        <table className="w-full text-sm">
          <thead className="text-gray-500 text-left border-b">
            <tr>
              <th className="pb-2">Nama</th>
              <th className="pb-2">Jenis</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">No Hp</th>
              <th className="pb-2">Alamat</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {UserData.map((row, i) => (
              <UserRow key={i} {...row} />
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}
