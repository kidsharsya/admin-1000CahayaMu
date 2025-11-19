import type {
  FAQCategory,
  CreateFAQCategoryPayload,
  UpdateFAQCategoryPayload,
  FAQCategoryResponse,
  SingleFAQCategoryResponse,
  FAQItem,
  CreateFAQItemPayload,
  UpdateFAQItemPayload,
  SingleFAQItemResponse,
  FAQItemListResponse,
} from '@/types/faqType';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getAuthHeader(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ========== FAQ CATEGORY ==========

/**
 * ✅ GET all FAQ categories
 */
export async function getFAQCategories(): Promise<FAQCategory[]> {
  const res = await fetch(`${API_URL}/admin/faq-categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const json: FAQCategoryResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to fetch FAQ categories');
  }

  return json.data;
}

/**
 * ✅ CREATE new FAQ category
 */
export async function createFAQCategory(payload: CreateFAQCategoryPayload): Promise<FAQCategory> {
  const res = await fetch(`${API_URL}/admin/faq-categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  const json: SingleFAQCategoryResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to create FAQ category');
  }

  return json.data;
}

/**
 * ✅ UPDATE FAQ category
 */
export async function updateFAQCategory(id: string, payload: UpdateFAQCategoryPayload): Promise<FAQCategory> {
  const res = await fetch(`${API_URL}/admin/faq-categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  const json: SingleFAQCategoryResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to update FAQ category');
  }

  return json.data;
}

/**
 * ✅ DELETE FAQ category
 */
export async function deleteFAQCategory(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/admin/faq-categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const json = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to delete FAQ category');
  }
}

// ========== FAQ ITEM ==========

/**
 * ✅ CREATE new FAQ item
 */
export async function createFAQItem(payload: CreateFAQItemPayload): Promise<FAQItem> {
  const res = await fetch(`${API_URL}/admin/faq-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  const json: SingleFAQItemResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to create FAQ item');
  }

  return json.data;
}

/**
 * ✅ UPDATE FAQ item
 */
export async function updateFAQItem(id: string, payload: UpdateFAQItemPayload): Promise<FAQItem> {
  const res = await fetch(`${API_URL}/admin/faq-items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  const json: SingleFAQItemResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to update FAQ item');
  }

  return json.data;
}

/**
 * ✅ DELETE FAQ item
 */
export async function deleteFAQItem(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/admin/faq-items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const json = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to delete FAQ item');
  }
}

/**
 * ✅ GET all FAQ items (Admin - with ID)
 */
export async function getFAQItems(): Promise<FAQItem[]> {
  const res = await fetch(`${API_URL}/admin/faq-items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const json: FAQItemListResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to fetch FAQ items');
  }

  return json.data;
}

/**
 * ✅ GET FAQ items by category ID
 */
export async function getFAQItemsByCategory(categoryId: string): Promise<FAQItem[]> {
  const items = await getFAQItems();
  return items.filter((item) => item.categoryID === categoryId);
}
