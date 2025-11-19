'use client';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import type { FAQCategory, FAQItem } from '@/types/faqType';
import { FAQItemCard } from './FAQItemCard';
import { FAQCategoryDeleteModal } from './FAQCategoryModalDelete';
import Image from 'next/image';

interface FAQCategoryCardProps {
  category: FAQCategory;
  items: FAQItem[];
  onEdit: (cat: FAQCategory) => void;
  onEditItem: (item: FAQItem) => void;
  onAddItem: (categoryId: string) => void;
  onRefresh: () => void;
}

export function FAQCategoryCard({ category, items, onEdit, onEditItem, onAddItem, onRefresh }: FAQCategoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // ✅ State untuk modal

  return (
    <>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Category Header */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {/* Icon */}
            {category.IconURL && (
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <Image src={category.IconURL} width={50} height={50} alt={category.Name} className="w-6 h-6 object-contain" />
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{category.Name}</h3>
                <span className={`px-2 py-0.5 text-xs rounded-full ${category.IsVisible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {category.IsVisible ? <Eye className="w-3 h-3 inline mr-1" /> : <EyeOff className="w-3 h-3 inline mr-1" />}
                  {category.IsVisible ? 'Visible' : 'Hidden'}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {items.length} pertanyaan • Order: {category.DisplayOrder}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={() => onAddItem(category.ID)} className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition" title="Tambah FAQ Item">
              <Plus className="w-4 h-4" />
            </button>

            <button onClick={() => onEdit(category)} className="text-emerald-600 hover:bg-emerald-100 p-2 rounded-lg transition" title="Edit Kategori">
              <Pencil className="w-4 h-4" />
            </button>

            {/* ✅ Ganti onClick langsung jadi buka modal */}
            <button onClick={() => setDeleteModalOpen(true)} className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition" title="Hapus Kategori">
              <Trash2 className="w-4 h-4" />
            </button>

            <button onClick={() => setExpanded(!expanded)} className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition ml-2" title={expanded ? 'Collapse' : 'Expand'}>
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* FAQ Items */}
        {expanded && (
          <div className="p-4 bg-white space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>Belum ada FAQ item</p>
              </div>
            ) : (
              items.map((item) => <FAQItemCard key={item.id} item={item} onEdit={onEditItem} onRefresh={onRefresh} />)
            )}
          </div>
        )}
      </div>

      {/* ✅ Delete Modal */}
      <FAQCategoryDeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onSuccess={onRefresh} category={category} itemCount={items.length} />
    </>
  );
}
