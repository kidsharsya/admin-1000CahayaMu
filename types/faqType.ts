// ========== FAQ CATEGORY ==========
export interface FAQCategory {
  ID: string;
  Name: string;
  IconURL: string;
  DisplayOrder: number;
  IsVisible: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface CreateFAQCategoryPayload {
  name: string;
  icon_url: string;
  display_order: number;
  is_visible: boolean;
}

export interface UpdateFAQCategoryPayload {
  name?: string;
  icon_url?: string;
  display_order?: number;
  is_visible?: boolean;
}

export interface FAQCategoryResponse {
  reqId: string;
  meta: {
    success: boolean;
    message: string;
  };
  data: FAQCategory[];
}

export interface SingleFAQCategoryResponse {
  reqId: string;
  meta: {
    success: boolean;
    message: string;
  };
  data: FAQCategory;
}

// ========== FAQ ITEM ==========
export interface FAQItem {
  id: string;
  categoryID: string;
  question: string;
  answer: string; // HTML string
  displayOrder: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFAQItemPayload {
  category_id: string;
  question: string;
  answer: string;
  display_order: number;
  is_visible: boolean;
}

export interface UpdateFAQItemPayload {
  category_id?: string;
  question?: string;
  answer?: string;
  display_order?: number;
  is_visible?: boolean;
}

export interface SingleFAQItemResponse {
  reqId: string;
  meta: {
    success: boolean;
    message: string;
  };
  data: FAQItem;
}

// ✅ Tambahkan response type untuk list FAQ items
export interface FAQItemListResponse {
  reqId: string;
  meta: {
    success: boolean;
    message: string;
  };
  data: FAQItem[];
}
