'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createFAQCategory, updateFAQCategory } from '@/lib/api/faq';
import type { FAQCategory } from '@/types/faqType';
import Image from 'next/image';

interface FAQCategoryModalProps {
  editCategory?: FAQCategory | null;
  onClose: () => void;
}

export function FAQCategoryModal({ editCategory, onClose }: FAQCategoryModalProps) {
  const [name, setName] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // ✅ State success modal
  const [error, setError] = useState<string | null>(null); // ✅ State error

  useEffect(() => {
    if (editCategory) {
      setName(editCategory.Name);
      setIconUrl(editCategory.IconURL);
      setDisplayOrder(editCategory.DisplayOrder);
      setIsVisible(editCategory.IsVisible);
    } else {
      // Reset form saat create new
      setName('');
      setIconUrl('');
      setDisplayOrder(1);
      setIsVisible(true);
    }
    setError(null);
    setShowSuccess(false);
  }, [editCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editCategory) {
        await updateFAQCategory(editCategory.ID, {
          name,
          icon_url: iconUrl,
          display_order: displayOrder,
          is_visible: isVisible,
        });
      } else {
        await createFAQCategory({
          name,
          icon_url: iconUrl,
          display_order: displayOrder,
          is_visible: isVisible,
        });
      }
      setShowSuccess(true); // ✅ Tampilkan success modal
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal menyimpan kategori';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{editCategory ? 'Edit Kategori FAQ' : 'Tambah Kategori FAQ'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ✅ Conditional Content: Success atau Form */}
        {showSuccess ? (
          // Success State
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Berhasil!</h3>
            <p className="text-gray-600 mb-6">Kategori FAQ berhasil {editCategory ? 'diperbarui' : 'ditambahkan'}.</p>
            <button
              onClick={() => {
                setShowSuccess(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              Tutup
            </button>
          </div>
        ) : (
          // Form State
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kategori *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="contoh: Akun dan Profile"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon URL</label>
              <input
                type="url"
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
                placeholder="https://cdn.example.com/icons/account.svg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {iconUrl && (
                <div className="mt-2 p-2 border rounded-lg inline-block">
                  <Image src={iconUrl} width={50} height={50} alt="Preview" className="w-8 h-8 object-contain" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Urutan Tampil *</label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="isVisible" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
              <label htmlFor="isVisible" className="text-sm font-medium text-gray-700">
                Tampilkan kategori ini
              </label>
            </div>

            {/* ✅ Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t">
              <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition" disabled={loading}>
                Batal
              </button>
              <button type="submit" className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50" disabled={loading}>
                {loading ? 'Menyimpan...' : editCategory ? 'Update' : 'Simpan'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
