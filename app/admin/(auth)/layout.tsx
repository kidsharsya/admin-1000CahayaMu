'use client';
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const pathTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard Overview',
  '/admin/emissions': 'Data Emisi',
  '/admin/distribution-map': 'Peta Persebaran Emisi',
  '/admin/users': 'Manajemen Pengguna',
  '/admin/settings': 'Pengaturan',
  '/admin/settings/transportation': 'Pengaturan Transportasi',
  '/admin/settings/electricity': 'Pengaturan Listrik',
  '/admin/settings/waste': 'Pengaturan Sampah',
  '/admin/settings/food': 'Pengaturan Makanan',
  '/admin/settings/gamification': 'Pengaturan Gamifikasi',
  '/admin/settings/other': 'Pengaturan Lainnya',
};

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const title = pathTitles[pathname] || 'Dashboard';

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      {/* Area konten utama */}
      <div className="flex-1 flex flex-col ml-64">
        <Header title={title} />
        <main className="flex-1 p-6 mt-20 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
