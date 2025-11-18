'use client';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: "url('/asset/images/background.webp')",
      }}
    >
      {/* LEFT SIDE OVERLAY ONLY */}
      <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow">
            Gerakan Kolektif Untuk
            <span className="text-green-600"> Energi Bersih</span>
          </h1>

          <p className="text-lg md:text-xl text-white leading-relaxed drop-shadow">Bersama mencegah krisis iklim melalui transisi energi. Hitung jejak karbon Anda, ambil aksi nyata, dan jadilah bagian dari 1000 cahaya perubahan.</p>

          <Link href="/hitung-jejak-karbon" className="inline-block px-6 py-3 bg-emerald-500 text-white text-lg rounded-md font-semibold hover:bg-emerald-700 transition">
            Hitung Jejak Karbon
          </Link>
        </div>
      </div>
    </section>
  );
}
