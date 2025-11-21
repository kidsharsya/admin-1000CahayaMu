import type { GridEmissionFactor, GridEmissionFactorResponse, GridEmissionFactorSingleResponse, GridEmissionFactorPayload, GridEmissionPagination } from '@/types/gridEmissionType';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getAuthHeader() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ✅ Get All grid emission factors dengan pagination
export async function getGridEmissionFactors(params?: { page?: number; per_page?: number }): Promise<{
  data: GridEmissionFactor[];
  pagination: GridEmissionPagination;
}> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.set('page', String(params.page));
  if (params?.per_page) queryParams.set('per_page', String(params.per_page));

  const url = `${API_URL}/grid-emission-factors${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    } as HeadersInit,
  });

  const json: GridEmissionFactorResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to fetch grid emission factors');
  }

  return {
    data: json.data,
    pagination: json.pagination,
  };
}

// ✅ Get by ID
export async function getGridEmissionFactorById(id: string): Promise<GridEmissionFactor> {
  const res = await fetch(`${API_URL}/grid-emission-factors/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    } as HeadersInit,
  });

  const json: GridEmissionFactorSingleResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to fetch grid emission factor by ID');
  }

  return json.data;
}

// ✅ Create
export async function createGridEmissionFactor(payload: GridEmissionFactorPayload): Promise<GridEmissionFactor> {
  const res = await fetch(`${API_URL}/grid-emission-factors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    } as HeadersInit,
    body: JSON.stringify(payload),
  });

  const json: GridEmissionFactorSingleResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to create grid emission factor');
  }

  return json.data;
}

// ✅ Update
export async function updateGridEmissionFactor(id: string, payload: Partial<GridEmissionFactorPayload>): Promise<GridEmissionFactor> {
  const res = await fetch(`${API_URL}/grid-emission-factors/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    } as HeadersInit,
    body: JSON.stringify(payload),
  });

  const json: GridEmissionFactorSingleResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to update grid emission factor');
  }

  return json.data;
}

// ✅ Delete
export async function deleteGridEmissionFactor(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/grid-emission-factors/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    } as HeadersInit,
  });

  const json = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to delete grid emission factor');
  }
}
