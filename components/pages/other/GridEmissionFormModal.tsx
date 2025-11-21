'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { GridEmissionFactorPayload } from '@/types/gridEmissionType';
import { createGridEmissionFactor } from '@/lib/api/gridEmissionFactor';
import { getProvinces } from '@/lib/api/region';

interface GridEmissionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function GridEmissionFormModal({ isOpen, onClose, onSuccess }: GridEmissionFormModalProps) {
  const [provinces, setProvinces] = useState<Record<string, string>>({});
  const [form, setForm] = useState<GridEmissionFactorPayload>({
    region_name: '',
    province_code: '',
    co2e_per_kwh: 0,
    active: true,
  });
  const [loading, setLoading] = useState(false);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ Fetch provinces saat modal dibuka
  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      try {
        setLoadingProvinces(true);
        const data = await getProvinces();
        setProvinces(data);
      } catch (err) {
        console.error('Failed to fetch provinces:', err);
        setError('Gagal memuat data provinsi');
      } finally {
        setLoadingProvinces(false);
      }
    })();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = e.target.value;
    const provinceName = provinces[provinceCode] || '';

    setForm((prev) => ({
      ...prev,
      province_code: provinceCode,
      region_name: provinceName, // ✅ Auto-fill region_name dengan Name provinsi
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createGridEmissionFactor(form);
      setShowSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      region_name: '',
      province_code: '',
      co2e_per_kwh: 0,
      active: true,
    });
    setError(null);
    setShowSuccess(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tambah Grid Emission Factor</h2>

        {showSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">Berhasil!</h3>
            <p className="text-gray-700 mb-4">Grid Emission Factor berhasil ditambahkan.</p>
            <button
              onClick={() => {
                resetForm();
                onSuccess();
                onClose();
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              Tutup
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ✅ Provinsi Dropdown */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Provinsi <span className="text-red-500">*</span>
              </label>
              {loadingProvinces ? (
                <div className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-400">Memuat provinsi...</div>
              ) : (
                <select value={form.province_code} onChange={handleProvinceChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500">
                  <option value="">Pilih Provinsi</option>
                  {Object.entries(provinces).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* ✅ Region Name (Read-only, auto-filled) */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nama Region</label>
              <input
                type="text"
                name="region_name"
                value={form.region_name}
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 text-gray-600 cursor-not-allowed"
                placeholder="Otomatis terisi dari provinsi"
              />
              <p className="text-xs text-gray-500 mt-1">Nama region akan otomatis terisi sesuai provinsi yang dipilih</p>
            </div>

            {/* CO2e per kWh */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                CO2e per kWh <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="co2e_per_kwh"
                value={form.co2e_per_kwh}
                onChange={handleChange}
                required
                min={0}
                step={0.01}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="contoh: 0.85"
              />
            </div>

            {/* Active */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="active" name="active" checked={form.active} onChange={handleChange} className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
              <label htmlFor="active" className="text-sm text-gray-700">
                Aktif
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
                Batal
              </button>
              <button type="submit" disabled={loading || loadingProvinces} className="px-4 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-70">
                {loading ? 'Menambahkan...' : 'Tambah'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
