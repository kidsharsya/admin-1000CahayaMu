'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Database, Map, Users, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard Overview',
    icon: BarChart3,
    path: '/admin/dashboard',
  },
  {
    id: 'emissions',
    label: 'Data Emisi',
    icon: Database,
    path: '/admin/emissions',
  },
  {
    id: 'map',
    label: 'Peta Persebaran',
    icon: Map,
    path: '/admin/distribution-map',
  },
  {
    id: 'users',
    label: 'Data Pengguna',
    icon: Users,
    path: '/admin/users',
  },
  {
    id: 'settings',
    label: 'Pengaturan',
    icon: Settings,
    path: '/admin/settings',
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <Image src="/asset/logo/logo.png" alt="logo" width={100} height={100} className="rounded-lg" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">1000CahayaMu</h1>
            <p className="text-sm text-slate-400">Carbon Tracker</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                    'hover:bg-slate-800 hover:text-emerald-400',
                    isActive ? 'bg-emerald-500/10 text-emerald-400 border-r-2 border-emerald-400' : 'text-slate-300'
                  )}
                >
                  <Icon className={cn('w-5 h-5', isActive ? 'text-emerald-400' : 'text-slate-400')} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className="text-center text-xs text-slate-500">© 2024 1000CahayaMu</div>
      </div>
    </div>
  );
};

export default Sidebar;
