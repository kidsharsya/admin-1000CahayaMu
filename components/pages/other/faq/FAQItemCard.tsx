'use client';
import { useState } from 'react';
import { Pencil, Trash2, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import type { FAQItem } from '@/types/faqType';
import { FAQItemDeleteModal } from './FAQItemDeleteModal';

interface FAQItemCardProps {
  item: FAQItem;
  onEdit: (item: FAQItem) => void;
  onRefresh: () => void;
}

export function FAQItemCard({ item, onEdit, onRefresh }: FAQItemCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // ✅ State untuk modal

  return (
    <>
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">{item.question}</h4>
              <span className={`px-2 py-0.5 text-xs rounded-full ${item.isVisible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {item.isVisible ? <Eye className="w-3 h-3 inline" /> : <EyeOff className="w-3 h-3 inline" />}
              </span>
              {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </div>

            {expanded && <div className="mt-3 prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: item.answer }} />}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={() => onEdit(item)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded transition" title="Edit">
              <Pencil className="w-4 h-4" />
            </button>
            {/* ✅ Ganti onClick langsung jadi buka modal */}
            <button onClick={() => setDeleteModalOpen(true)} className="text-red-600 hover:bg-red-50 p-1.5 rounded transition" title="Hapus">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Delete Modal */}
      <FAQItemDeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onSuccess={onRefresh} item={item} />
    </>
  );
}
