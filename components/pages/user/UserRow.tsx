import { User, Building2, Pen, TrashIcon, Eye } from 'lucide-react';
import { UserTypes } from '@/types/user';

export function UserRow({ name, user_type, email, no_hp, address, is_active }: UserTypes) {
  const isIndividu = user_type === 'Individu';
  const isActive = !!is_active;

  return (
    <tr className="border-b last:border-none">
      {/* Nama */}
      <td className="py-3 flex items-center gap-3">
        {isIndividu ? <User className="bg-emerald-100 text-emerald-600 p-2 rounded-full w-8 h-8" /> : <Building2 className="bg-indigo-100 text-indigo-600 p-2 rounded-full w-8 h-8" />}
        <span className="font-medium text-gray-700">{name}</span>
      </td>

      {/* Jenis */}
      <td>
        <span className={`px-3 py-2 text-xs rounded-md ${isIndividu ? 'bg-gray-100 text-gray-800' : 'bg-black text-white'}`}>{user_type}</span>
      </td>

      {/* Email */}
      <td className="text-gray-700">{email}</td>

      {/* No HP */}
      <td className="text-gray-700">{no_hp}</td>

      {/* Alamat */}
      <td className="text-gray-700">{address}</td>

      {/* Status */}
      <td>
        <span className={`px-3 py-2 text-xs rounded-md ${isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>{isActive ? 'Aktif' : 'Non-Aktif'}</span>
      </td>

      {/* Aksi */}
      <td>
        <div className="flex gap-2">
          <button type="button" className="bg-white hover:bg-blue-600 text-blue-600 hover:text-white rounded-md p-2 transition">
            <Eye className="w-4 h-4" />
          </button>
          <button type="button" className="bg-white hover:bg-emerald-600 text-emerald-600 hover:text-white rounded-md p-2 transition">
            <Pen className="w-4 h-4" />
          </button>
          <button type="button" className="bg-white hover:bg-red-600 text-red-600 hover:text-white rounded-md p-2 transition">
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
