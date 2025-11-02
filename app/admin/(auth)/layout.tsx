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
};

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const title = pathTitles[pathname] || 'Dashboard';

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={title} />
        <main className="p-4 flex-1">{children}</main>
      </div>
    </div>
  );
}
