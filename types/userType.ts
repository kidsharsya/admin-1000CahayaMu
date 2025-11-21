export type UserType = 'individu' | 'lembaga';
export type Gender = 'male' | 'female';

// ✅ Response dari API list
export interface UserTypes {
  user_id: string;
  name: string;
  user_type: UserType;
  email: string;
  phone_number: string;
  address: string;
  is_active: boolean;
  province?: string;
  city?: string;
  district?: string;
  sub_district?: string;
}

// ✅ Response dari API detail by ID
export interface UserDetailResponse {
  id: string;
  email: string;
  phone_number: string;
  user_type: UserType | null;
  province?: string | null;
  city?: string | null;
  district?: string | null;
  sub_district?: string | null;
  active: boolean;
  created_at: string;
  individual_profile?: {
    full_name: string;
    gender: Gender;
    active: boolean;
  };
  institution_profile?: {
    name: string;
    active: boolean;
  };
}

export interface IndividualProfile {
  full_name: string;
  gender: Gender;
  active: boolean;
}

export interface InstitutionProfile {
  name: string;
  active: boolean;
}

// ✅ Minimal payload untuk create user - hanya email, phone, password
export interface MinimalCreateUserPayload {
  email: string;
  phone_number: string;
  password: string;
  is_admin: boolean;
}

// ✅ Full payload untuk create user (jika butuh)
export interface CreateUserPayload extends MinimalCreateUserPayload {
  user_type?: UserType;
  is_admin?: boolean;
  active?: boolean;
  individual_profile?: IndividualProfile;
  institution_profile?: InstitutionProfile;
}

// ✅ Payload lengkap untuk update user
export interface UpdateUserPayload {
  email?: string;
  phone_number?: string;
  password?: string;
  user_type?: UserType;
  is_admin?: boolean;
  active?: boolean;
  province?: string;
  city?: string;
  district?: string;
  sub_district?: string;
  address?: string;
  individual_profile?: Partial<IndividualProfile>;
  institution_profile?: Partial<InstitutionProfile>;
}

export interface UserFilters {
  user_type?: 'individu' | 'lembaga' | 'semua';
  search?: string;
  page?: number;
  per_page?: number;
}

export interface UserPagination {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_items: number;
  has_previous: boolean;
  has_next: boolean;
  first_page: number;
  last_page: number;
}

export interface UserLinks {
  self: string;
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
}

export interface UserListResponse {
  reqId: string;
  meta: {
    success: boolean;
    message: string;
  };
  data: UserTypes[];
  pagination: UserPagination;
  links: UserLinks;
}

export interface SingleUserResponse {
  reqId: string;
  meta: {
    success: boolean;
    message: string;
  };
  data: UserDetailResponse;
}
