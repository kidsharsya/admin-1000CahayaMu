'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'Tentang', href: '#hero' },
    { label: 'Fitur', href: '#fitur' },
    { label: 'Dampak', href: '#dampak' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gray-500/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/asset/logo/logo.png" alt="1000 Cahayamu Logo" width={40} height={40} className="object-contain rounded" />
          <span className="text-lg font-semibold tracking-wide text-white drop-shadow">1000 Cahayamu</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-white hover:text-emerald-600 transition font-medium">
              {item.label}
            </a>
          ))}

          <Link href="/login-admin" className="px-4 py-2 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition">
            Mulai Sekarang
          </Link>
        </div>

        {/* Mobile Button */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20 py-4 px-6 space-y-4">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="block text-white/90 hover:text-white font-medium" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}

          <Link href="/login-admin" onClick={() => setOpen(false)} className="block w-full text-center px-4 py-2 bg-emerald-600 text-white rounded-md font-semibold hover:bg-white/90 transition">
            Mulai Sekarang
          </Link>
        </div>
      )}
    </nav>
  );
}
