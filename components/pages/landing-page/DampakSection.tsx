'use client';

import { Leaf, Building2, Users, Sparkles } from 'lucide-react';

export function DampakSection() {
  const impacts = [
    {
      icon: Sparkles,
      number: '01',
      label: 'Edukasi & Kesadaran',
      desc: 'Memberikan pemahaman berbasis sains dan nilai tentang pentingnya efisiensi energi dan jejak karbon.',
    },
    {
      icon: Leaf,
      number: '02',
      label: 'Aksi Individu Terukur',
      desc: 'Mengubah kesadaran menjadi kebiasaan baru lewat pelacakan emisi harian dan gamifikasi yang memotivasi.',
    },
    {
      icon: Building2,
      number: '03',
      label: 'Audit & Efisiensi Lembaga',
      desc: 'Membantu sekolah, masjid, dan pesantren mengaudit penggunaan energi untuk menemukan potensi penghematan.',
    },
    {
      icon: Users,
      number: '04',
      label: 'Gerakan Komunitas Kolektif',
      desc: 'Menyatukan aksi individu dan lembaga dalam satu data kolektif untuk mendorong perubahan kebijakan yang lebih besar.',
    },
  ];

  return (
    <section className="py-24" id="dampak">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header dengan accent line */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="h-1 w-20 bg-emerald-600 mx-auto mb-4 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Dampak Nyata dari Aksi Kolektif</h2>
          </div>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Kami percaya perubahan sistematis dimulai dari sini. Inilah pilar gerakan kami untuk masa depan energi bersih.</p>
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((item, i) => (
            <div
              key={i}
              className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md 
                hover:shadow-xl transition-all duration-300 border border-gray-100
                hover:border-emerald-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

              {/* Number badge */}
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-500 group-hover:text-emerald-400 transition-colors">{item.number}</span>
              </div>

              {/* Icon dengan gradient border */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-emerald-600 group-hover:text-emerald-700 transition" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">{item.label}</h3>

              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">Bergabunglah dengan gerakan 1000 Cahaya dan jadilah bagian dari perubahan untuk masa depan yang lebih bersih dan berkelanjutan.</p>
          <a
            href="/login-admin"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-emerald-600 to-teal-600 text-white 
              font-semibold rounded-full hover:from-emerald-700 hover:to-teal-700 transition-all duration-300
              shadow-lg hover:shadow-xl hover:scale-105"
          >
            Mulai Aksi Sekarang
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
