'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { User, Building2 } from 'lucide-react';
import { getUserById, enrichUserWithRegion } from '@/lib/api/user';
import { getUserEmissionById } from '@/lib/api/userEmission';
import type { UserWithRegion } from '@/types/userType';
import type { UserEmission, UserEmissionFilters } from '@/types/userEmissionType';

interface UserEmissionInfoProps {
  id?: string;
  filters?: UserEmissionFilters;
}

function formatJoinDate(s?: string): string {
  if (!s) return '-';
  const d = new Date(s);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };

  if (!Number.isNaN(d.getTime())) return d.toLocaleDateString('id-ID', options);

  const cleaned = s.replace(' +0000 +0000', 'Z');
  const d2 = new Date(cleaned);
  return !Number.isNaN(d2.getTime()) ? d2.toLocaleDateString('id-ID', options) : s;
}

export function UserEmissionInfo({ id, filters = {} }: UserEmissionInfoProps) {
  const params = useParams<{ id: string }>();
  const effectiveId = useMemo(() => {
    const fromProp = (id ?? '').trim();
    const fromUrl = (params?.id ?? '').toString().trim();
    const candidate = fromProp || fromUrl;
    return candidate && candidate !== 'undefined' && candidate !== 'null' ? candidate : '';
  }, [id, params?.id]);

  const [user, setUser] = useState<UserWithRegion | null>(null);
  const [emission, setEmission] = useState<UserEmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    if (!effectiveId) {
      setError('ID pengguna tidak valid.');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user data dan emission data dengan filter
        const [baseUser, emissionData] = await Promise.all([getUserById(effectiveId), getUserEmissionById(effectiveId, filters).catch(() => null)]);

        const enriched = await enrichUserWithRegion(baseUser);

        if (mounted) {
          setUser(enriched);
          setEmission(emissionData);
        }
      } catch (e) {
        if (mounted) setError(e instanceof Error ? e.message : 'Gagal memuat data pengguna.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [effectiveId, filters]);

  if (loading) return <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">Memuat detail pengguna...</div>;

  if (error)
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-md p-4 text-sm">
        {error} — ID: {effectiveId || 'undefined'}
      </div>
    );

  if (!user) return null;

  const isIndividu = user.user_type === 'individu';
  const name = isIndividu ? user.individual_profile?.full_name || user.email : user.institution_profile?.name || user.email;
  const address = [user.sub_district_name, user.district_name, user.city_name, user.province_name].filter(Boolean).join(', ');
  const date_joined = formatJoinDate(user.created_at);

  // Format total emisi dalam TON dengan 2 desimal
  const totalEmissionTons = emission?.total_emisi_tons ?? 0;
  const formattedEmission = totalEmissionTons.toLocaleString('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Format periode filter untuk ditampilkan
  const getPeriodLabel = () => {
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const parts = [];

    if (filters.month && filters.month !== 'semua') {
      parts.push(monthNames[Number(filters.month) - 1]);
    }
    if (filters.year && filters.year !== 'semua') {
      parts.push(String(filters.year));
    }

    return parts.length > 0 ? ` (${parts.join(' ')})` : '';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {isIndividu ? <User className="bg-emerald-100 text-emerald-600 p-2 rounded-full w-10 h-10" /> : <Building2 className="bg-indigo-100 text-indigo-600 p-2 rounded-full w-10 h-10" />}

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isIndividu ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>{isIndividu ? 'Individu' : 'Lembaga'}</span>
            </div>

            <div className="mt-1">
              <p className="text-sm text-gray-500">Email: {user.email}</p>
              <p className="text-sm text-gray-500">Bergabung: {date_joined}</p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Total Emisi{getPeriodLabel()}</p>
          <p className="text-3xl font-bold text-red-600">{formattedEmission}</p>
          <p className="text-sm text-gray-500">ton CO₂e</p>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div>
        <h3 className="font-medium text-gray-800 mb-1">Alamat</h3>
        <p className="text-sm text-gray-600">{address || '-'}</p>
      </div>
    </div>
  );
}
