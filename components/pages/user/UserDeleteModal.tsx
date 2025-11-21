'use client';
import { X, Trash2 } from 'lucide-react';
import { deleteUser } from '@/lib/api/user';
import { useState } from 'react';

interface UserDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (id: string) => void;
  userId: string;
  userName: string;
}

export function UserDeleteModal({ isOpen, onClose, onSuccess, userId, userName }: UserDeleteModalProps) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteUser(userId);
      setShowSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal menghapus pengguna';
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
              <h2 className="text-lg font-semibold text-gray-800">Hapus Pengguna</h2>
            </div>

            <p className="text-gray-700 mb-6">
              Apakah kamu yakin ingin menghapus pengguna <span className="font-semibold text-gray-900">&quot;{userName}&quot;</span>? Tindakan ini tidak dapat dibatalkan.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100" disabled={loading}>
                Batal
              </button>
              <button onClick={handleDelete} disabled={loading} className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-70">
                {loading ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </>
        )}

        {/* Modal Sukses */}
        {showSuccess && (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Berhasil Dihapus!</h3>
            <p className="text-gray-600 mb-6">Pengguna berhasil dihapus dari sistem.</p>
            <button
              onClick={() => {
                setShowSuccess(false);
                onSuccess(userId);
                onClose();
              }}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
