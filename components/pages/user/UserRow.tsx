import { User, Building2, Pen, TrashIcon, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserTypes } from '@/types/user';

export function UserRow({ name, user_type, email, no_hp, address, created_at, is_active }: UserTypes) {
  const isIndividu = user_type === 'Individu';
  const isActive = !!is_active;

  return (
    <tr className="border-b last:border-none">
      <td className="py-3 flex items-center gap-3">
        {isIndividu ? <User className="bg-emerald-100 text-emerald-600 p-2 rounded-full w-8 h-8" /> : <Building2 className="bg-indigo-100 text-indigo-600 p-2 rounded-full w-8 h-8" />}
        <span className="font-medium text-gray-700">{name}</span>
      </td>
      <td>
        <span className={`px-3 py-2 text-xs rounded-md ${isIndividu ? 'bg-gray-100 text-gray-800' : 'bg-black text-white'}`}>{user_type}</span>
      </td>
      <td className="text-gray-700">{email}</td>
      <td className="text-gray-700">{no_hp}</td>
      <td className="text-gray-700">{address}</td>
      <td>
        <span className={`px-3 py-2 text-xs rounded-md ${isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>{isActive ? 'Aktif' : 'Non-Aktif'}</span>
      </td>
      <td>
        <div className="flex gap-2">
          <Button className="bg-white hover:bg-blue-600 text-blue-600 hover:text-white">
            <Eye className="w-4 h-4" />
          </Button>
          <Button className="bg-white hover:bg-emerald-600 text-emerald-600 hover:text-white">
            <Pen className="w-4 h-4" />
          </Button>
          <Button className="bg-white hover:bg-red-600 text-red-600 hover:text-white">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
