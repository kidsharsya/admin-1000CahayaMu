'use client';
import { X, Trash2 } from 'lucide-react';
import { deleteFAQItem } from '@/lib/api/faq';
import { useState } from 'react';

interface FAQItemDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  item: {
    id: string;
    question: string;
  };
}

export function FAQItemDeleteModal({ isOpen, onClose, onSuccess, item }: FAQItemDeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteFAQItem(item.id);
      setShowSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal menghapus FAQ item';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        {/* Modal Konfirmasi */}
        {!showSuccess && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="text-red-600 w-5 h-5" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Hapus FAQ Item</h2>
            </div>

            <p className="text-gray-700 mb-4">
              Apakah kamu yakin ingin menghapus FAQ: <span className="font-semibold text-gray-900">&quot;{item.question}&quot;</span>?
            </p>

            <p className="text-sm text-gray-600 mb-6">Tindakan ini tidak dapat dibatalkan.</p>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition" disabled={loading}>
                Batal
              </button>
              <button onClick={handleDelete} disabled={loading} className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Menghapus...
                  </span>
                ) : (
                  'Hapus FAQ'
                )}
              </button>
            </div>
          </>
        )}

        {/* Modal Sukses */}
        {showSuccess && (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Berhasil Dihapus!</h3>
            <p className="text-gray-600 mb-6">FAQ Item berhasil dihapus dari sistem.</p>
            <button
              onClick={() => {
                setShowSuccess(false);
                onSuccess();
                onClose();
              }}
              className="px-6 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
