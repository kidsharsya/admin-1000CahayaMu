'use client';

export default function MapFilter() {
  return (
    <div className="w-72 bg-white rounded-xl shadow p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-4">Filter Data</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Tahun</label>
            <select className="w-full border rounded-lg px-2 py-1 mt-1">
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Bulan</label>
            <select className="w-full border rounded-lg px-2 py-1 mt-1">
              <option>Desember</option>
              <option>November</option>
              <option>Oktober</option>
              <option>September</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Jenis Pengguna</label>
            <select className="w-full border rounded-lg px-2 py-1 mt-1">
              <option>Individu</option>
              <option>Lembaga</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Kategori Emisi</label>
            <div className="flex flex-col gap-1 mt-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Transportasi</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Listrik</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Sampah</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                <span>Makanan</span>
              </label>
            </div>
          </div>

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg mt-3">Terapkan Filter</button>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 border-t pt-3">
        <h3 className="text-sm font-semibold mb-2">Keterangan Intensitas</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <span className="inline-block w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: '#FF0000' }}></span>Sangat Tinggi (&gt;400k)
          </li>
          <li>
            <span className="inline-block w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: '#F97316' }}></span>Tinggi (300k–400k)
          </li>
          <li>
            <span className="inline-block w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: '#FBBF24' }}></span>Sedang (200k–300k)
          </li>
          <li>
            <span className="inline-block w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: '#04BF68' }}></span>Rendah (100k–200k)
          </li>
          <li>
            <span className="inline-block w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: '#BBEED6' }}></span>Sangat Rendah (&lt;100k)
          </li>
        </ul>
      </div>
    </div>
  );
}
