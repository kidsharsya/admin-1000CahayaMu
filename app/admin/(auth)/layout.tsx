'use client';
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { User, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';

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
  const router = useRouter();
  const title = pathTitles[pathname];

  const userName = 'Super Admin';

  const handleLogout = () => {
    router.push('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
              <p className="text-sm text-slate-600 mt-1">Dashboard Admin - Sistem Jejak Karbon</p>
            </div>

            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-slate-100 focus:outline-none">
                    <Avatar>
                      <AvatarFallback className="bg-emerald-500 text-white">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="text-left">
                      <div className="text-sm font-medium text-slate-900">{userName}</div>
                    </div>

                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 flex-1">{children}</main>
      </div>
    </div>
  );
}
