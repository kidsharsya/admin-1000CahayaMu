'use client';

export function AboutsSection() {
  // 🔰 Intro Section
  const intro = {
    title: 'Jaring Cahaya untuk Bumi Berkeadilan',
    desc: `cahayamu.id adalah platform digital yang lahir dari Ekosistem 1000 Cahaya Muhammadiyah. 
Kami adalah gerakan dakwah ekologis dan energi bersih yang memadukan nilai Islam rahmatan lil 'alamin 
dengan sains dan aksi komunitas.`,

    points: [
      {
        title: 'Transisi Energi Berkeadilan',
        text: 'Mendorong adopsi energi bersih yang inklusif—bisa diakses semua lapisan masyarakat.',
      },
      {
        title: 'Efisiensi dan Audit Energi',
        text: 'Alat untuk individu dan lembaga seperti sekolah, pesantren, dan masjid dalam mengaudit konsumsi energi.',
      },
      {
        title: 'Pengurangan Emisi Karbon',
        text: 'Membantu komunitas di seluruh Indonesia melacak dan mengurangi jejak karbon melalui aplikasi cahayamu.id.',
      },
      {
        title: 'Pelibatan Perempuan & Komunitas',
        text: 'Mendukung dan mendigitalkan "Aksi Perempuan Jaga Bumi" agar dampaknya lebih terukur dan luas.',
      },
    ],
  };

  return (
    <section id="tentang" className="py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header dengan accent line */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <div className="h-1 w-20 bg-emerald-600 mx-auto mb-4 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{intro.title}</h2>
          </div>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed">{intro.desc}</p>
        </div>

        {/* Mission Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {intro.points.map((p, i) => (
            <div
              key={i}
              className="group relative bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md 
                hover:shadow-xl transition-all duration-300 border border-gray-100
                hover:border-emerald-300 hover:-translate-y-1"
            >
              {/* Number badge */}
              <div
                className="absolute -top-3 -left-3 w-10 h-10 bg-emerald-600 text-white 
                rounded-full flex items-center justify-center font-bold text-lg shadow-lg
                group-hover:scale-110 transition-transform"
              >
                {i + 1}
              </div>

              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-emerald-600 to-emerald-300 
                rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>

              <div className="ml-4">
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">{p.title}</h4>
                <p className="text-gray-600 leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
