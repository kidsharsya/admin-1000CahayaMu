'use client';
import { useState, useEffect } from 'react';
import { Plus, Pencil, Eye, EyeOff, FileText, Calendar, Tag, AlertTriangle } from 'lucide-react';
import { getLegalDocs, publishLegalDoc } from '@/lib/api/legalDoc';
import type { LegalDocument } from '@/types/legalDocType';
import { LegalDocModal } from './LegalDocModal';

export function LegalDocsTable() {
  const [docs, setDocs] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editDoc, setEditDoc] = useState<LegalDocument | null>(null);
  const [publishing, setPublishing] = useState<string | null>(null);

  // ✅ State untuk custom confirm modal
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean;
    docId: string;
    currentStatus: boolean;
    action: 'publish' | 'unpublish';
  } | null>(null);

  // ✅ State untuk success/error notification
  const [notification, setNotification] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const fetchDocs = async () => {
    try {
      const data = await getLegalDocs();
      setDocs(data);
    } catch (error) {
      console.error('Failed to fetch legal docs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handlePublishClick = (id: string, currentStatus: boolean) => {
    setConfirmModal({
      show: true,
      docId: id,
      currentStatus,
      action: currentStatus ? 'unpublish' : 'publish',
    });
  };

  const handleConfirmPublish = async () => {
    if (!confirmModal) return;

    const { docId, action } = confirmModal;
    setPublishing(docId);
    setConfirmModal(null);

    try {
      await publishLegalDoc(docId);
      await fetchDocs();

      // ✅ Show success notification
      setNotification({
        show: true,
        type: 'success',
        message: `Dokumen berhasil di${action === 'publish' ? 'publikasikan' : 'unpublish'}!`,
      });

      // Auto hide after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Failed to publish:', error);

      // ✅ Show error notification
      setNotification({
        show: true,
        type: 'error',
        message: `Gagal ${action} dokumen. Silakan coba lagi.`,
      });

      // Auto hide after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setPublishing(null);
    }
  };

  const handleEdit = (doc: LegalDocument) => {
    setEditDoc(doc);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditDoc(null);
    fetchDocs();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-md font-semibold text-gray-700">Syarat & Ketentuan</h3>
        </div>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-emerald-500 text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-emerald-700">
          <Plus className="w-4 h-4" />
          Tambah Dokumen
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-200 border-t-emerald-600"></div>
          <p className="text-gray-500 mt-3">Memuat data...</p>
        </div>
      ) : docs.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">Belum ada dokumen syarat & ketentuan</p>
          <button onClick={() => setModalOpen(true)} className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
            + Buat Dokumen Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {docs.map((doc) => (
            <div key={doc.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200">
              {/* Header Card */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${doc.isActive ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                      {doc.isActive ? (
                        <>
                          <Eye className="w-3 h-3 inline mr-1" /> Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 inline mr-1" /> Draft
                        </>
                      )}
                    </span>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4" />
                      <span>Version {doc.version}</span>
                    </div>
                    {doc.publishedAt && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Published:{' '}
                          {new Date(doc.publishedAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Updated:{' '}
                        {new Date(doc.updatedAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(doc)} className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" title="Edit Dokumen">
                    <Pencil className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>

                  <button
                    onClick={() => handlePublishClick(doc.id, doc.isActive)}
                    disabled={publishing === doc.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${doc.isActive ? 'text-orange-600 bg-orange-50 hover:bg-orange-100' : 'text-green-600 bg-green-50 hover:bg-green-100'} disabled:opacity-50`}
                    title={doc.isActive ? 'Unpublish' : 'Publish'}
                  >
                    {publishing === doc.id ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : doc.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span className="text-sm font-medium">{doc.isActive ? 'Unpublish' : 'Publish'}</span>
                  </button>
                </div>
              </div>

              {/* Content Preview */}
              <div className="prose prose-sm max-w-none text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: doc.content }} />
            </div>
          ))}
        </div>
      )}

      {/* Edit/Add Modal */}
      {modalOpen && <LegalDocModal editDoc={editDoc} onClose={handleCloseModal} />}

      {/* ✅ Custom Confirm Modal */}
      {confirmModal?.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Konfirmasi {confirmModal.action === 'publish' ? 'Publikasi' : 'Unpublish'}</h3>
                <p className="text-sm text-gray-600">Yakin ingin {confirmModal.action === 'publish' ? 'mempublikasikan' : 'meng-unpublish'} dokumen ini?</p>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => setConfirmModal(null)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                Batal
              </button>
              <button onClick={handleConfirmPublish} className={`px-4 py-2 text-white rounded-lg transition ${confirmModal.action === 'publish' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-600 hover:bg-orange-700'}`}>
                Ya, {confirmModal.action === 'publish' ? 'Publikasikan' : 'Unpublish'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Success/Error Notification Toast */}
      {notification?.show && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg ${notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            {notification.type === 'success' ? (
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            )}
            <p className={`font-medium ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{notification.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
