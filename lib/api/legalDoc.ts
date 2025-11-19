import type { LegalDocument, CreateLegalDocPayload, UpdateLegalDocPayload, LegalDocResponse, SingleLegalDocResponse } from '@/types/legalDocType';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getAuthHeader(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * ✅ GET all legal documents
 */
export async function getLegalDocs(): Promise<LegalDocument[]> {
  const res = await fetch(`${API_URL}/admin/legal-docs/all-docs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const json: LegalDocResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to fetch legal documents');
  }

  return json.data;
}

/**
 * ✅ CREATE new legal document
 */
export async function createLegalDoc(payload: CreateLegalDocPayload): Promise<LegalDocument> {
  const res = await fetch(`${API_URL}/admin/legal-docs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  const json: SingleLegalDocResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to create legal document');
  }

  return json.data;
}

/**
 * ✅ UPDATE legal document
 */
export async function updateLegalDoc(id: string, payload: UpdateLegalDocPayload): Promise<LegalDocument> {
  const res = await fetch(`${API_URL}/admin/legal-docs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  const json: SingleLegalDocResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to update legal document');
  }

  return json.data;
}

/**
 * ✅ PUBLISH/UNPUBLISH legal document
 */
export async function publishLegalDoc(id: string): Promise<LegalDocument> {
  const res = await fetch(`${API_URL}/admin/legal-docs/${id}/publish`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const json: SingleLegalDocResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to publish legal document');
  }

  return json.data;
}
