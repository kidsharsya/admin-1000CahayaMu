'use client';

export function TermsConditionsContent() {
  return (
    <div>
      {/* Content */}
      <div className="prose prose-sm max-w-none">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-purple-700 mb-0">
            <strong>Terakhir diperbarui:</strong>{' '}
            {new Date().toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Ketentuan Umum</h3>
            <p className="text-gray-600 leading-relaxed">
              Selamat datang di platform <strong>1000 Cahayamu</strong>. Dengan mengakses dan menggunakan layanan kami, Anda setuju untuk terikat dengan syarat dan ketentuan berikut. Harap membaca dengan seksama sebelum menggunakan platform
              ini.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Penggunaan Layanan</h3>
            <p className="text-gray-600 leading-relaxed">Platform ini dirancang untuk membantu individu dan lembaga dalam:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Menghitung jejak karbon dari berbagai aktivitas</li>
              <li>Melacak konsumsi energi listrik dan transportasi</li>
              <li>Memantau produksi sampah dan pola konsumsi makanan</li>
              <li>Mengaudit penggunaan energi untuk lembaga</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi Anda.</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Hak dan Kewajiban Pengguna</h3>
            <p className="text-gray-600 font-semibold mb-2">Hak Pengguna:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4 mb-4">
              <li>Mengakses data emisi karbon pribadi atau lembaga</li>
              <li>Mengunduh laporan dalam format PDF</li>
              <li>Menghapus akun dan data terkait kapan saja</li>
            </ul>

            <p className="text-gray-600 font-semibold mb-2">Kewajiban Pengguna:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Memberikan informasi yang akurat dan valid</li>
              <li>Tidak menyalahgunakan platform untuk tujuan ilegal</li>
              <li>Mematuhi semua peraturan yang berlaku</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Batasan Tanggung Jawab</h3>
            <p className="text-gray-600 leading-relaxed">
              Platform <strong>1000 Cahayamu</strong> menyediakan layanan sebagaimana adanya. Kami tidak bertanggung jawab atas:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Kerugian akibat kesalahan input data oleh pengguna</li>
              <li>Gangguan layanan di luar kendali kami</li>
              <li>Keputusan yang diambil berdasarkan data dari platform ini</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Perubahan Ketentuan</h3>
            <p className="text-gray-600 leading-relaxed">Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan diberitahukan melalui email atau notifikasi di platform.</p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 italic">
            Jika Anda memiliki pertanyaan tentang dokumen ini, silakan hubungi kami di{' '}
            <a href="mailto:legal@cahayamu.id" className="text-purple-600 hover:underline">
              legal@cahayamu.id
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
