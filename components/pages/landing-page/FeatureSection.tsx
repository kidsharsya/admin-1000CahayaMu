'use client';

import Image from 'next/image';
import { Car, Zap, Utensils, Trash2 } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Car,
      title: 'Transportasi',
      desc: 'Hitung emisi dari perjalanan harian, pilihan kendaraan, dan pola mobilitas Anda.',
    },
    {
      icon: Zap,
      title: 'Energi Listrik',
      desc: 'Monitor konsumsi listrik dan temukan cara beralih ke energi terbarukan.',
    },
    {
      icon: Utensils,
      title: 'Makanan',
      desc: 'Pahami jejak karbon dari pilihan makanan dan pola konsumsi Anda.',
    },
    {
      icon: Trash2,
      title: 'Sampah',
      desc: 'Lacak produksi sampah dan tingkatkan praktik daur ulang Anda.',
    },
  ];

  return (
    <section id="fitur" className="py-24 bg-linear-to-b from-green-200 to-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ukur, Pahami, dan Kurangi Jejak Karbon Anda</h2>

        {/* Description */}
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Platform komprehensif untuk menghitung dan mengelola emisi karbon dari berbagai aspek kehidupan sehari-hari.</p>

        {/* Features Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="group p-6 border border-gray-200 rounded-xl shadow-sm 
            hover:shadow-md hover:border-gray-300 transition bg-white"
            >
              <div className="flex justify-center mb-4">
                <item.icon className="w-10 h-10 text-emerald-600 group-hover:text-emerald-700 transition" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>

              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECOND FEATURE BLOCK */}
      <div className="max-w-7xl mx-auto mt-24 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* IMAGE SIDE */}
          <div className="w-full aspect-square relative overflow-hidden">
            <Image src="/asset/images/feature.webp" alt="Fitur Jejak Karbon" fill priority className="object-cover" />
          </div>

          {/* TEXT SIDE */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Untuk Siapa Aplikasi Ini Dibuat?</h3>

            {/* INDIVIDU */}
            <div className="mb-10">
              <h4 className="text-xl font-semibold text-emerald-700">Individu</h4>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li>• Melacak emisi karbon dari aktivitas harian</li>
                <li>• Goal-based reduction tracking</li>
                <li>• Tantangan & badge gamifikasi</li>
              </ul>
            </div>

            {/* LEMBAGA */}
            <div>
              <h4 className="text-xl font-semibold text-emerald-700">Lembaga Muhammadiyah</h4>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li>• Pemantauan emisi gedung dan kendaraan</li>
                <li>• Audit energi terpusat</li>
                <li>• Laporan karbon untuk akreditasi & audit ESG</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
