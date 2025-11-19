'use client';
import { useState } from 'react';
import { Puzzle } from 'lucide-react';
import { GridEmissionTable } from './GridEmissionTable';
import { LegalDocsTable } from './legal-docs/LegalDocsTable';
import { FAQManagement } from './faq/FAQManagement';

export function OtherSettingContent() {
  const [activeTab, setActiveTab] = useState<'grid' | 'legal' | 'faq'>('grid');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Puzzle className="w-5 h-5 text-amber-500" />
        <h2 className="text-xl font-semibold text-gray-700">Pengaturan Lain</h2>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b mb-6">
        <button onClick={() => setActiveTab('grid')} className={`px-4 py-2 font-medium rounded-t-md transition ${activeTab === 'grid' ? 'bg-white border border-b-0 border-gray-200 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}>
          ⚡ Grid Emission Factor
        </button>

        <button onClick={() => setActiveTab('legal')} className={`px-4 py-2 font-medium rounded-t-md transition ${activeTab === 'legal' ? 'bg-white border border-b-0 border-gray-200 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}>
          📜 Syarat & Ketentuan
        </button>

        <button onClick={() => setActiveTab('faq')} className={`px-4 py-2 font-medium rounded-t-md transition ${activeTab === 'faq' ? 'bg-white border border-b-0 border-gray-200 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}>
          ❓ FAQ
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'grid' && <GridEmissionTable />}
        {activeTab === 'legal' && <LegalDocsTable />}
        {activeTab === 'faq' && <FAQManagement />}
      </div>
    </div>
  );
}
