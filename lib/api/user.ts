import type { UserTypes, UserFilters, UserListResponse, SingleUserResponse, CreateUserPayload, MinimalCreateUserPayload, UpdateUserPayload, UserDetailResponse } from '@/types/userType';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getAuthHeader(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * ✅ Fetch user list dengan pagination & filters
 */
export async function getUserList(filters: UserFilters = {}): Promise<{
  data: UserTypes[];
  pagination: UserListResponse['pagination'];
}> {
  const { page = 1, per_page = 10, user_type, search } = filters;

  const params = new URLSearchParams({
    page: String(page),
    per_page: String(per_page),
  });

  if (user_type && user_type !== 'semua') {
    params.set('user_type', user_type);
  }

  if (search && search.trim()) {
    params.set('search', search.trim());
  }

  const url = `${API_URL}/admin/users?${params.toString()}`;
  console.log('🔍 Fetching users:', url);

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const json: UserListResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to fetch user data');
  }

  return {
    data: json.data,
    pagination: json.pagination,
  };
}

/**
 * ✅ Fetch user by ID
 */
export async function getUserById(id: string): Promise<UserDetailResponse> {
  const res = await fetch(`${API_URL}/admin/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const json: SingleUserResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to fetch user detail');
  }

  return json.data;
}

/**
 * ✅ CREATE new user - Support both minimal and full payload
 */
export async function createUser(payload: MinimalCreateUserPayload | CreateUserPayload): Promise<UserDetailResponse> {
  const res = await fetch(`${API_URL}/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  const json: SingleUserResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to create user');
  }

  return json.data;
}

/**
 * ✅ UPDATE user by ID (PUT) - Tidak termasuk is_admin
 */
export async function updateUser(id: string, payload: UpdateUserPayload): Promise<UserDetailResponse> {
  const { ...updatePayload } = payload;

  const res = await fetch(`${API_URL}/admin/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(updatePayload),
  });

  const json: SingleUserResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to update user');
  }

  return json.data;
}

/**
 * ✅ UPDATE is_admin status (PATCH) - Khusus untuk is_admin
 */
export async function updateUserAdminStatus(id: string, isAdmin: boolean): Promise<UserDetailResponse> {
  const res = await fetch(`${API_URL}/admin/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ is_admin: isAdmin }),
  });

  const json: SingleUserResponse = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to update admin status');
  }

  return json.data;
}

/**
 * ✅ DELETE user by ID
 */
export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/admin/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  });

  const json: { meta: { success: boolean; message: string } } = await res.json();

  if (!res.ok || !json.meta?.success) {
    throw new Error(json.meta?.message || 'Failed to delete user');
  }
}
