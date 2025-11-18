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
    <section id="fitur" className="py-24 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* ✅ FEATURES GRID - Dipindahkan dari AboutSection */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ukur, Pahami, dan Kurangi Jejak Karbon Anda</h2>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Platform komprehensif untuk menghitung dan mengelola emisi karbon dari berbagai aspek kehidupan sehari-hari.</p>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, i) => (
              <div
                key={i}
                className="group p-6 border border-gray-200 rounded-xl shadow-sm 
                  hover:shadow-md hover:border-emerald-300 transition bg-white/90 backdrop-blur-sm"
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

        {/* ✅ IMAGE + TEXT BLOCK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* IMAGE SIDE */}
          <div className="w-full aspect-square relative overflow-hidden">
            <Image src="/asset/images/feature.webp" alt="Fitur Jejak Karbon" fill priority className="object-cover" />
          </div>

          {/* TEXT SIDE */}
          <div className="p-8 rounded-2xl">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Kontrol Jejak Karbon di Tangan Anda</h3>

            {/* INDIVIDU */}
            <div className="mb-10">
              <h4 className="text-xl font-semibold text-emerald-700 mb-3">Individu</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Melacak emisi karbon dari aktivitas harian
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Memantau perubahan emisi setiap bulan
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Peringkat dan badge gamifikasi
                </li>
              </ul>
            </div>

            {/* LEMBAGA */}
            <div>
              <h4 className="text-xl font-semibold text-emerald-700 mb-3">Lembaga Muhammadiyah</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Pemantauan emisi gedung dan kendaraan
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Audit penggunaan energi dan bahan bakar
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Laporan karbon untuk akreditasi & audit ESG
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
