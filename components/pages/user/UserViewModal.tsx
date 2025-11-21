'use client';
import { useEffect, useState } from 'react';
import { X, User, Building2, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { getUserById } from '@/lib/api/user';
import { getProvinceName, getRegencyName, getDistrictName, getVillageName } from '@/lib/api/region';
import type { UserDetailResponse } from '@/types/userType';

interface UserViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export function UserViewModal({ isOpen, onClose, userId }: UserViewModalProps) {
  const [userData, setUserData] = useState<UserDetailResponse | null>(null);
  const [locationNames, setLocationNames] = useState({
    province: '',
    city: '',
    district: '',
    village: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !userId) return;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserById(userId);
        setUserData(data);

        // ✅ Fetch location names
        if (data.province) {
          const provName = await getProvinceName(data.province);
          setLocationNames((prev) => ({ ...prev, province: provName }));
        }
        if (data.city && data.province) {
          const cityName = await getRegencyName(data.city, data.province);
          setLocationNames((prev) => ({ ...prev, city: cityName }));
        }
        if (data.district && data.city) {
          const distName = await getDistrictName(data.district, data.city);
          setLocationNames((prev) => ({ ...prev, district: distName }));
        }
        if (data.sub_district && data.district) {
          const villName = await getVillageName(data.sub_district, data.district);
          setLocationNames((prev) => ({ ...prev, village: villName }));
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Gagal memuat data user';
        setError(message);
      } finally {
        setLoading(false);
      }
    })();
  }, [isOpen, userId]);

  if (!isOpen) return null;

  // ✅ Get name from profile
  const displayName = userData?.individual_profile?.full_name || userData?.institution_profile?.institution_name || userData?.email || 'User';

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-6">Detail Pengguna</h2>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Memuat data...</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        ) : userData ? (
          <div className="space-y-6">
            {/* Header Info */}
            <div className="flex items-center gap-4 pb-4 border-b">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${userData.user_type === 'individu' ? 'bg-emerald-100' : 'bg-indigo-100'}`}>
                {userData.user_type === 'individu' ? <User className="w-8 h-8 text-emerald-600" /> : <Building2 className="w-8 h-8 text-indigo-600" />}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{displayName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-3 py-1 text-xs rounded-full ${userData.user_type === 'individu' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                    {userData.user_type === 'individu' ? 'Individu' : 'Lembaga'}
                  </span>
                  <span className={`px-3 py-1 text-xs rounded-full ${userData.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{userData.active ? 'Aktif' : 'Non-Aktif'}</span>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            {userData.individual_profile && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">Profil Individu</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Nama Lengkap</p>
                    <p className="text-gray-900 font-medium">{userData.individual_profile.full_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Jenis Kelamin</p>
                    <p className="text-gray-900 font-medium">{userData.individual_profile.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</p>
                  </div>
                </div>
              </div>
            )}

            {userData.institution_profile && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">Profil Lembaga</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Nama Lembaga</p>
                    <p className="text-gray-900 font-medium">{userData.institution_profile.institution_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tipe Lembaga</p>
                    <p className="text-gray-900 font-medium">{userData.institution_profile.institution_type}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">No. Telepon</p>
                  <p className="text-gray-900">{userData.phone_number}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            {(userData.province || userData.city || userData.district || userData.sub_district) && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">Lokasi</p>
                  <div className="space-y-1 text-sm">
                    {locationNames.province && (
                      <div className="flex">
                        <span className="text-gray-500 w-24">Provinsi:</span>
                        <span className="text-gray-900 font-medium">{locationNames.province}</span>
                      </div>
                    )}
                    {locationNames.city && (
                      <div className="flex">
                        <span className="text-gray-500 w-24">Kota:</span>
                        <span className="text-gray-900 font-medium">{locationNames.city}</span>
                      </div>
                    )}
                    {locationNames.district && (
                      <div className="flex">
                        <span className="text-gray-500 w-24">Kecamatan:</span>
                        <span className="text-gray-900 font-medium">{locationNames.district}</span>
                      </div>
                    )}
                    {locationNames.village && (
                      <div className="flex">
                        <span className="text-gray-500 w-24">Kelurahan:</span>
                        <span className="text-gray-900 font-medium">{locationNames.village}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Created Date */}
            {userData.created_at && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Terdaftar sejak: {new Date(userData.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            )}

            {/* Footer */}
            <div className="pt-4 border-t">
              <button onClick={onClose} className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                Tutup
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
