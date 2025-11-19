'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createFAQItem, updateFAQItem } from '@/lib/api/faq';
import type { FAQCategory, FAQItem } from '@/types/faqType';
import { TiptapEditor } from '@/components/editor/TiptapEditor';

interface FAQItemModalProps {
  categoryId?: string;
  editItem?: FAQItem | null;
  categories: FAQCategory[];
  onClose: () => void;
}

export function FAQItemModal({ categoryId, editItem, categories, onClose }: FAQItemModalProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId || '');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // ✅ State success modal
  const [error, setError] = useState<string | null>(null); // ✅ State error

  useEffect(() => {
    setEditorReady(false);

    if (editItem) {
      setSelectedCategoryId(editItem.categoryID);
      setQuestion(editItem.question);
      setAnswer(editItem.answer);
      setDisplayOrder(editItem.displayOrder);
      setIsVisible(editItem.isVisible);

      setTimeout(() => setEditorReady(true), 100);
    } else {
      setSelectedCategoryId(categoryId || '');
      setQuestion('');
      setAnswer('');
      setDisplayOrder(1);
      setIsVisible(true);
      setEditorReady(true);
    }

    setError(null);
    setShowSuccess(false);
  }, [editItem, categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editItem) {
        await updateFAQItem(editItem.id, {
          category_id: selectedCategoryId,
          question,
          answer,
          display_order: displayOrder,
          is_visible: isVisible,
        });
      } else {
        await createFAQItem({
          category_id: selectedCategoryId,
          question,
          answer,
          display_order: displayOrder,
          is_visible: isVisible,
        });
      }
      setShowSuccess(true); // ✅ Tampilkan success modal
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal menyimpan FAQ item';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{editItem ? 'Edit FAQ Item' : 'Tambah FAQ Item'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ✅ Conditional Content: Success atau Form */}
        {showSuccess ? (
          // Success State
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Berhasil!</h3>
            <p className="text-gray-600 mb-6">FAQ Item berhasil {editItem ? 'diperbarui' : 'ditambahkan'}.</p>
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
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                disabled={!!categoryId}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                required
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.ID} value={cat.ID}>
                    {cat.Name}
                  </option>
                ))}
              </select>
              {editItem && <p className="text-xs text-gray-500 mt-1">💡 Anda bisa memindahkan FAQ ini ke kategori lain</p>}
            </div>

            {/* Question */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pertanyaan *</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="contoh: Bagaimana cara mengganti password?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Answer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jawaban *</label>
              {editorReady ? (
                <TiptapEditor key={editItem?.id || 'new'} content={answer} onChange={setAnswer} placeholder="Tulis jawaban untuk pertanyaan ini..." />
              ) : (
                <div className="w-full h-[300px] border border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Memuat editor...</p>
                </div>
              )}
            </div>

            {/* Display Order */}
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

            {/* Visibility */}
            <div className="flex items-center gap-3">
              <input type="checkbox" id="itemVisible" checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
              <label htmlFor="itemVisible" className="text-sm font-medium text-gray-700">
                Tampilkan FAQ item ini
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
                {loading ? 'Menyimpan...' : editItem ? 'Update' : 'Simpan'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
