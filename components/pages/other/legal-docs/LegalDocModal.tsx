'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createLegalDoc, updateLegalDoc } from '@/lib/api/legalDoc';
import type { LegalDocument } from '@/types/legalDocType';
import { TiptapEditor } from '@/components/editor/TiptapEditor';

interface LegalDocModalProps {
  editDoc?: LegalDocument | null;
  onClose: () => void;
}

export function LegalDocModal({ editDoc, onClose }: LegalDocModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [version, setVersion] = useState('1.0');
  const [loading, setLoading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // ✅ State success modal
  const [error, setError] = useState<string | null>(null); // ✅ State error

  useEffect(() => {
    setEditorReady(false);
    setError(null);
    setShowSuccess(false);

    if (editDoc) {
      setTitle(editDoc.title);
      setContent(editDoc.content);
      setVersion(editDoc.version);
      setTimeout(() => setEditorReady(true), 100);
    } else {
      setTitle('');
      setContent('');
      setVersion('1.0');
      setEditorReady(true);
    }
  }, [editDoc]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editDoc) {
        await updateLegalDoc(editDoc.id, { title, content, version });
      } else {
        await createLegalDoc({
          doc_type: 'TERMS_CONDITIONS',
          title,
          content,
          version,
        });
      }
      setShowSuccess(true); // ✅ Tampilkan success modal
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal menyimpan dokumen';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{editDoc ? 'Edit Syarat & Ketentuan' : 'Tambah Syarat & Ketentuan'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ✅ Conditional Content: Success atau Form */}
        {showSuccess ? (
          // Success State
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Berhasil!</h3>
            <p className="text-gray-600 mb-6">Dokumen berhasil {editDoc ? 'diperbarui' : 'ditambahkan'}.</p>
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
          <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul Dokumen *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="contoh: Syarat dan Ketentuan Pengguna"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Version */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Versi *</label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="contoh: 1.0 atau 2.1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Konten Dokumen *</label>
              {editorReady ? (
                <TiptapEditor key={editDoc?.id || 'new'} content={content} onChange={setContent} placeholder="Tulis konten syarat & ketentuan di sini..." />
              ) : (
                <div className="w-full h-[300px] border border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Memuat editor...</p>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">💡 Gunakan toolbar untuk formatting. HTML akan otomatis di-generate.</p>
            </div>

            {/* ✅ Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 bg-white">
              <button type="button" onClick={onClose} className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition" disabled={loading}>
                Batal
              </button>
              <button type="submit" className="px-6 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Menyimpan...
                  </span>
                ) : editDoc ? (
                  'Update Dokumen'
                ) : (
                  'Simpan Dokumen'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
