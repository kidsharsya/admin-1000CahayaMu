'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function EmissionPagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        <ChevronLeft className="w-4 h-4 mr-1" /> Sebelumnya
      </Button>

      <span className="text-sm text-gray-600">
        Halaman {currentPage} dari {totalPages}
      </span>

      <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Berikutnya <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}
