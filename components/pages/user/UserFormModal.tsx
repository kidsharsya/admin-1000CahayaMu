'use client';
import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { createUser } from '@/lib/api/user';
import type { MinimalCreateUserPayload } from '@/types/userType';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UserFormModal({ isOpen, onClose, onSuccess }: UserFormModalProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // ✅ State untuk show/hide password

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPhone('');
    setPassword('');
    setIsAdmin(false);
    setError(null);
    setShowPassword(false); // ✅ Reset show password state
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // ✅ Type-safe minimal payload
    const payload: MinimalCreateUserPayload = {
      email,
      phone_number: phone,
      password,
      is_admin: isAdmin,
    };

    try {
      console.log('📤 Creating user with minimal payload:', payload);
      await createUser(payload);
      console.log('✅ User created successfully');
      setShowSuccess(true);

      // Reset form setelah 1.5 detik
      setTimeout(() => {
        resetForm();
      }, 1500);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal membuat user';
      console.error('❌ Create user error:', err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    setShowSuccess(false);
    onClose();
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onSuccess(); // Refresh table
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative">
        <button onClick={handleClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tambah Pengguna Baru</h2>

        {showSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">Berhasil!</h3>
            <p className="text-gray-700 mb-2">Pengguna berhasil ditambahkan.</p>
            <p className="text-sm text-gray-500 mb-4">Silakan edit pengguna untuk melengkapi profil.</p>
            <button onClick={handleSuccessClose} className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
              Tutup
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
              ℹ️ <strong>Info:</strong> Anda hanya perlu mengisi data dasar. Profil lengkap dapat ditambahkan melalui menu Edit setelah pengguna dibuat.
            </p>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="user@example.com"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No. Telepon <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="081234567890"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Format: 08xxxxxxxxxx</p>
            </div>

            {/* ✅ Password with Eye Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Min. 8 karakter"
                  required
                  minLength={8}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none" tabIndex={-1}>
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimal 8 karakter</p>
            </div>

            {/* ✅ Admin Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
              <label htmlFor="isAdmin" className="text-sm text-gray-700">
                Set sebagai Admin
              </label>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-6">
              <button type="button" onClick={handleClose} className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100" disabled={loading}>
                Batal
              </button>
              <button type="submit" disabled={loading} className="px-4 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-70">
                {loading ? 'Menyimpan...' : 'Tambah Pengguna'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
