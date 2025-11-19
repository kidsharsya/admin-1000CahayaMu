'use client';
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { getFAQCategories, getFAQItems } from '@/lib/api/faq';
import type { FAQCategory, FAQItem } from '@/types/faqType';
import { FAQCategoryModal } from './FAQCategoryModal';
import { FAQItemModal } from './FAQItemModal';
import { FAQCategoryCard } from './FAQCategoryCard';

export function FAQManagement() {
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]); // ✅ Ganti helpCenter dengan faqItems
  const [loading, setLoading] = useState(true);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<FAQCategory | null>(null);
  const [editItem, setEditItem] = useState<FAQItem | null>(null); // ✅ Tambah state edit item
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const fetchData = async () => {
    try {
      const [cats, items] = await Promise.all([getFAQCategories(), getFAQItems()]);
      setCategories(cats);
      setFaqItems(items);
    } catch (error) {
      console.error('Failed to fetch FAQ data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditCategory = (cat: FAQCategory) => {
    setEditCategory(cat);
    setCategoryModalOpen(true);
  };

  const handleAddItem = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setEditItem(null); // ✅ Reset edit item
    setItemModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setCategoryModalOpen(false);
    setEditCategory(null);
    fetchData();
  };

  const handleEditItem = (item: FAQItem) => {
    setEditItem(item);
    setItemModalOpen(true);
  };

  const handleCloseItemModal = () => {
    setItemModalOpen(false);
    setSelectedCategoryId('');
    setEditItem(null); // ✅ Reset edit item
    fetchData();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-gray-700">FAQ Management</h2>
        </div>

        <button onClick={() => setCategoryModalOpen(true)} className="flex items-center gap-2 bg-emerald-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
          <Plus className="w-4 h-4" />
          Tambah Kategori
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Memuat data...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 text-gray-500">Belum ada kategori FAQ</div>
      ) : (
        <div className="space-y-4">
          {categories.map((cat) => {
            const items = faqItems.filter((item) => item.categoryID === cat.ID);
            return <FAQCategoryCard key={cat.ID} category={cat} items={items} onEdit={handleEditCategory} onEditItem={handleEditItem} onAddItem={handleAddItem} onRefresh={fetchData} />;
          })}
        </div>
      )}

      {/* Modals */}
      {categoryModalOpen && <FAQCategoryModal editCategory={editCategory} onClose={handleCloseCategoryModal} />}
      {itemModalOpen && <FAQItemModal categoryId={selectedCategoryId} editItem={editItem} categories={categories} onClose={handleCloseItemModal} />}
    </div>
  );
}
