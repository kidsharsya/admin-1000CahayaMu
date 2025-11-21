'use client';
import { useEffect, useState } from 'react';
import { UserFilter } from './UserFilter';
import { UserTable } from './UserTable';
import { StatCardUser } from './StatCard';
import { UserFormModal } from './UserFormModal';
import { getDashboardOverview } from '@/lib/api/dashboardOverview';
import type { DashboardOverview } from '@/types/dashboardOverview';
import type { UserFilters } from '@/types/userType';

export function UserContent() {
  const [stats, setStats] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [filters, setFilters] = useState<UserFilters>({
    user_type: 'semua',
    search: '',
  });

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const data = await getDashboardOverview();
        if (mounted) setStats(data);
      } catch (error) {
        console.error('Failed to fetch dashboard overview:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [refreshTrigger]);

  const handleFilterChange = (newFilters: Partial<UserFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCardUser title="Total Pengguna" value={loading ? '...' : stats?.total_user.toLocaleString('id-ID') || '0'} change="Pengguna" />
        <StatCardUser title="Lembaga" value={loading ? '...' : stats?.total_institution_user.toLocaleString('id-ID') || '0'} change="Pengguna" />
        <StatCardUser title="Individu" value={loading ? '...' : stats?.total_individual_user.toLocaleString('id-ID') || '0'} change="Pengguna" />
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-4 shadow-sm">
        <UserFilter onFilterChange={handleFilterChange} initialFilters={filters} onAddUser={() => setOpenModal(true)} />

        <UserTable filters={filters} refreshTrigger={refreshTrigger} onRefresh={handleSuccess} />
      </div>

      {/* Modal Tambah */}
      {openModal && <UserFormModal isOpen={openModal} onClose={() => setOpenModal(false)} onSuccess={handleSuccess} />}
    </div>
  );
}
