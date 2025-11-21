export interface GridEmissionFactor {
  id: string;
  region_name: string;
  province_code: string; // ✅ Tambah province_code
  co2e_per_kwh: number;
  active: boolean;
}

// ✅ Pagination structure
export interface GridEmissionPagination {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_items: number;
  has_previous: boolean;
  has_next: boolean;
  first_page: number;
  last_page: number;
}

// ✅ Links structure
export interface GridEmissionLinks {
  self: string | null;
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
}

// ✅ API Response wrapper
export interface GridEmissionFactorResponse {
  reqId: string;
  meta: {
    success: boolean;
    message: string;
  };
  data: GridEmissionFactor[];
  pagination: GridEmissionPagination;
  links: GridEmissionLinks;
}

// ✅ Single item response (untuk getById, create, update)
export interface GridEmissionFactorSingleResponse {
  reqId: string;
  meta: {
    success: boolean;
    message: string;
  };
  data: GridEmissionFactor;
}

// ✅ Payload untuk create/update
export interface GridEmissionFactorPayload {
  region_name: string;
  province_code: string;
  co2e_per_kwh: number;
  active: boolean;
}
