import { User, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmissionRecord } from '@/types/emission';

export function EmissionRow({ name, type, emission, emission_avg, date }: EmissionRecord) {
  const isIndividu = type === 'Individu';

  return (
    <tr className="border-b last:border-none">
      <td className="py-3 flex items-center gap-3">
        {isIndividu ? <User className="bg-emerald-100 text-emerald-600 p-2 rounded-full w-8 h-8" /> : <Building2 className="bg-indigo-100 text-indigo-600 p-2 rounded-full w-8 h-8" />}
        <span className="font-medium text-gray-700">{name}</span>
      </td>
      <td>
        <span className={`px-3 py-2 text-xs rounded-md ${isIndividu ? 'bg-gray-100 text-gray-800' : 'bg-black text-white'}`}>{type}</span>
      </td>
      <td className="text-gray-700 font-medium">{emission}</td>
      <td className="text-gray-700 font-medium">{emission_avg}</td>
      <td>
        <Button className="bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white text-xs px-3 py-2">Lihat Detail</Button>
      </td>
    </tr>
  );
}
