'use client';
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { UserRow } from './UserRow';
import { getUserList, enrichUserWithRegion } from '@/lib/api/user';
import { UserWithRegion, UserFilters } from '@/types/userType';
import { Pagination } from '@/components/layout/Pagination';

interface UserTableProps {
  filters?: UserFilters;
}

export function UserTable({ filters = {} }: UserTableProps) {
  const [users, setUsers] = useState<UserWithRegion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const { data, pagination } = await getUserList({
        ...filters,
        page,
        per_page: 10,
      });
      const enrichedUsers = await Promise.all(data.map(enrichUserWithRegion));
      setUsers(enrichedUsers);
      setTotalPages(pagination.total_pages);
      setTotalItems(pagination.total_items);
      setCurrentPage(pagination.current_page);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters]);

  // Reset ke halaman 1 saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <User className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-700">Data Pengguna</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">{loading ? 'Memuat data...' : `Menampilkan ${users.length} dari ${totalItems} pengguna`}</p>

      <div className="w-full overflow-x-auto">
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
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Memuat data...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((row) => <UserRow key={row.id} {...row} onView={(id) => console.log('view', id)} onEdit={(id) => console.log('edit', id)} onDelete={(id) => console.log('delete', id)} />)
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  Tidak ada data pengguna.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />}
    </div>
  );
}
