'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { label: 'Tentang Kami', href: '#tentang' },
    { label: 'Fitur Platform', href: '#fitur' },
    { label: 'Dampak & Kontribusi', href: '#dampak' },
  ];

  const socialMedia = [
    { icon: Facebook, href: '', label: 'Facebook' },
    { icon: Twitter, href: '', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/1000cahayamu', label: 'Instagram' },
    { icon: Linkedin, href: '', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/asset/logo/logo.png" alt="1000 Cahayamu Logo" width={50} height={50} className="object-contain rounded" />
              <span className="text-xl font-bold">1000 Cahayamu</span>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">Platform digital untuk gerakan dakwah ekologis dan energi bersih. Bergabunglah dalam membangun masa depan yang berkelanjutan.</p>

            {/* Social Media */}
            <div className="flex gap-3">
              {socialMedia.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center 
                    hover:bg-emerald-600 transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Navigasi Cepat</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-0.5 bg-emerald-400 group-hover:w-4 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Kontak Kami</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:info@cahayamu.id" className="hover:text-emerald-400 transition">
                    info@cahayamu.id
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Telepon</p>
                  <a href="tel:+6281234567890" className="hover:text-emerald-400 transition">
                    +62 812-3456-7890
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Alamat</p>
                  <p>Yogyakarta, Indonesia</p>
                </div>
              </li>
            </ul>
          </div>

          {/* CTA Box */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Mulai Aksi Sekarang</h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">Bergabunglah dengan ribuan individu dan lembaga dalam gerakan energi bersih.</p>
            <Link
              href="/login-admin"
              className="block text-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 
                rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} <span className="text-emerald-400 font-semibold">1000 Cahayamu</span>. All rights reserved.
            </p>

            <div className="flex gap-6">
              <a href="#" className="hover:text-emerald-400 transition">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-emerald-400 transition">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
