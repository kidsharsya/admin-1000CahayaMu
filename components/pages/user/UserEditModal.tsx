'use client';
import { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { getUserById, updateUser, updateUserAdminStatus } from '@/lib/api/user';
import { getProvinces, getRegenciesByProvince, getDistrictsByRegency, getVillagesByDistrict } from '@/lib/api/region';
import type { UserDetailResponse, UpdateUserPayload, Gender, UserType } from '@/types/userType';

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}

export function UserEditModal({ isOpen, onClose, onSuccess, userId }: UserEditModalProps) {
  const [userData, setUserData] = useState<UserDetailResponse | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ✅ State untuk show/hide password
  const [userType, setUserType] = useState<UserType>('individu'); // ✅ Add user_type state
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [institutionName, setInstitutionName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [initialIsAdmin, setInitialIsAdmin] = useState(false);

  // Location states
  const [provinces, setProvinces] = useState<Record<string, string>>({});
  const [regencies, setRegencies] = useState<Record<string, string>>({});
  const [districts, setDistricts] = useState<Record<string, string>>({});
  const [villages, setVillages] = useState<Record<string, string>>({});

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedRegency, setSelectedRegency] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data
  useEffect(() => {
    if (!isOpen || !userId) return;

    (async () => {
      try {
        setFetching(true);
        setError(null);
        const data = await getUserById(userId);
        setUserData(data);

        // ✅ Set data dari UserDetailResponse
        setEmail(data.email);
        setPhone(data.phone_number);
        setIsActive(data.active);
        setUserType(data.user_type || 'individu'); // ✅ Set user_type, default individu jika null
        setSelectedProvince(data.province || '');
        setSelectedRegency(data.city || '');
        setSelectedDistrict(data.district || '');
        setSelectedVillage(data.sub_district || '');
        const adminStatus = false; // Sesuaikan jika backend mengembalikan is_admin
        setIsAdmin(adminStatus);
        setInitialIsAdmin(adminStatus);

        // ✅ Set profile data
        if (data.individual_profile) {
          setFullName(data.individual_profile.full_name);
          setGender(data.individual_profile.gender);
        } else if (data.institution_profile) {
          setInstitutionName(data.institution_profile.name);
        }

        // Load provinces
        const prov = await getProvinces();
        setProvinces(prov);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Gagal memuat data user';
        setError(message);
      } finally {
        setFetching(false);
      }
    })();
  }, [isOpen, userId]);

  // Load regencies when province changes
  useEffect(() => {
    if (!selectedProvince) {
      setRegencies({});
      return;
    }
    (async () => {
      try {
        const regs = await getRegenciesByProvince(selectedProvince);
        setRegencies(regs);
      } catch (err) {
        console.error('Failed to load regencies:', err);
      }
    })();
  }, [selectedProvince]);

  // Load districts when regency changes
  useEffect(() => {
    if (!selectedRegency) {
      setDistricts({});
      return;
    }
    (async () => {
      try {
        const dists = await getDistrictsByRegency(selectedRegency);
        setDistricts(dists);
      } catch (err) {
        console.error('Failed to load districts:', err);
      }
    })();
  }, [selectedRegency]);

  // Load villages when district changes
  useEffect(() => {
    if (!selectedDistrict) {
      setVillages({});
      return;
    }
    (async () => {
      try {
        const vills = await getVillagesByDistrict(selectedDistrict);
        setVillages(vills);
      } catch (err) {
        console.error('Failed to load villages:', err);
      }
    })();
  }, [selectedDistrict]);

  if (!isOpen) return null;

  if (fetching) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 text-gray-700">Memuat data...</div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: UpdateUserPayload = {
        email,
        phone_number: phone,
        active: isActive,
        user_type: userType,
        province: selectedProvince,
        city: selectedRegency,
        district: selectedDistrict,
        sub_district: selectedVillage,
        address: detailAddress,
      };

      if (password) {
        payload.password = password;
      }

      if (userData?.user_type === 'individu') {
        payload.individual_profile = {
          full_name: fullName,
          gender,
        };
      } else {
        payload.institution_profile = {
          name: institutionName,
        };
      }

      await updateUser(userId, payload);

      if (isAdmin !== initialIsAdmin) {
        await updateUserAdminStatus(userId, isAdmin);
      }

      setShowSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal update user';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Pengguna</h2>

        {showSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-emerald-600 mb-2">Berhasil!</h3>
            <p className="text-gray-700 mb-4">Data pengguna berhasil diperbarui.</p>
            <button
              onClick={() => {
                setShowSuccess(false);
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
            {/* User Type Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Pengguna *</label>
              <select value={userType} onChange={(e) => setUserType(e.target.value as UserType)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500">
                <option value="individu">Individu</option>
                <option value="lembaga">Lembaga</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500" required />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon *</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500" required />
            </div>

            {/* ✅ Password with Eye Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru (Opsional)</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="Kosongkan jika tidak ingin mengubah"
                  minLength={8}
                />
                {password && (
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none" tabIndex={-1}>
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimal 8 karakter</p>
            </div>

            {/* Profile Fields - Conditional based on userType */}
            {userType === 'individu' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin *</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value as Gender)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500">
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lembaga *</label>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
            )}

            {/* Location Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi</label>
                <select
                  value={selectedProvince}
                  onChange={(e) => {
                    setSelectedProvince(e.target.value);
                    setSelectedRegency('');
                    setSelectedDistrict('');
                    setSelectedVillage('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Pilih Provinsi</option>
                  {Object.entries(provinces).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kota/Kabupaten</label>
                <select
                  value={selectedRegency}
                  onChange={(e) => {
                    setSelectedRegency(e.target.value);
                    setSelectedDistrict('');
                    setSelectedVillage('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  disabled={!selectedProvince}
                >
                  <option value="">Pilih Kota/Kabupaten</option>
                  {Object.entries(regencies).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kecamatan</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedVillage('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  disabled={!selectedRegency}
                >
                  <option value="">Pilih Kecamatan</option>
                  {Object.entries(districts).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kelurahan/Desa</label>
                <select
                  value={selectedVillage}
                  onChange={(e) => setSelectedVillage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  disabled={!selectedDistrict}
                >
                  <option value="">Pilih Kelurahan/Desa</option>
                  {Object.entries(villages).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Detail</label>
              <textarea
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                rows={3}
                placeholder="Jl. Example No. 123, RT/RW 01/02"
              />
            </div>

            {/* Checkboxes: Admin & Active Status */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                <label htmlFor="isAdmin" className="text-sm text-gray-700">
                  Admin
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                <label htmlFor="isActive" className="text-sm text-gray-700">
                  Aktif
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100" disabled={loading}>
                Batal
              </button>
              <button type="submit" disabled={loading} className="px-4 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-70">
                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
