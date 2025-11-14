import type { BuildingAsset, BuildingAssetResponse } from '@/types/buildingAssetType';
import type { VehicleAsset, VehicleAssetResponse } from '@/types/vehicleAssetType';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

function getAuthHeader(): Record<string, string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function resolveNextUrl(next: string | null | undefined): string | null {
  if (!next) return null;
  if (/^https?:\/\//i.test(next)) return next; // absolute URL
  if (next.startsWith('/api/v1/')) return `${API_URL}${next.replace('/api/v1', '')}`; // ✅ Fix: remove /api/v1 prefix
  if (next.startsWith('/')) return `${API_URL}${next}`; // relative with slash
  return `${API_URL}/${next}`; // relative no slash
}

async function parseJsonSafe<T>(res: Response): Promise<T> {
  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`Non-JSON response (${res.status} ${res.statusText}): ${text.slice(0, 160)}`);
  }
}

async function fetchAllPages<TResp extends { meta: { success: boolean; message?: string }; data: TItem[]; links?: { next?: string | null } }, TItem>(firstUrl: string): Promise<TItem[]> {
  const all: TItem[] = [];
  let nextUrl: string | null = firstUrl;
  let iteration = 0;
  const maxIterations = 100; // ✅ Prevent infinite loop

  while (nextUrl && iteration < maxIterations) {
    console.log(`🔍 Fetching page ${iteration + 1}:`, nextUrl);

    const res = await fetch(nextUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      } as HeadersInit,
    });

    const json = await parseJsonSafe<TResp>(res);

    if (!res.ok || json.meta?.success === false) {
      throw new Error(json.meta?.message || `Failed fetching: ${nextUrl}`);
    }

    all.push(...(json.data ?? []));
    console.log(`📦 Fetched ${json.data?.length || 0} items, total: ${all.length}`);

    // ✅ Resolve next URL properly
    nextUrl = resolveNextUrl(json.links?.next);
    iteration++;
  }

  if (iteration >= maxIterations) {
    console.warn('⚠️ Max iterations reached, stopping pagination');
  }

  console.log(`✅ Total items fetched: ${all.length}`);
  return all;
}

/* =========================
   🏢 BUILDING ASSETS
   ========================= */

export async function getAllBuildingAssets(perPage = 100): Promise<BuildingAsset[]> {
  const url = `${API_URL}/building-assets?page=1&per_page=${perPage}`;
  return fetchAllPages<BuildingAssetResponse, BuildingAsset>(url);
}

export async function getBuildingAssetsByUserId(userId: string, perPage = 100): Promise<BuildingAsset[]> {
  // ✅ Filter di client-side setelah fetch semua data
  const all = await getAllBuildingAssets(perPage);
  const filtered = all.filter((a) => a.user_id === userId);
  console.log(`🏢 Building assets for user ${userId}:`, filtered.length);
  return filtered;
}

export async function getBuildingAssetById(id: string): Promise<BuildingAsset | null> {
  const all = await getAllBuildingAssets();
  return all.find((a) => a.id === id) ?? null;
}

/* =========================
   🚗 VEHICLE ASSETS
   ========================= */

export async function getAllVehicleAssets(perPage = 100): Promise<VehicleAsset[]> {
  const url = `${API_URL}/vehicle-assets?page=1&per_page=${perPage}`;
  return fetchAllPages<VehicleAssetResponse, VehicleAsset>(url);
}

export async function getVehicleAssetsByUserId(userId: string, perPage = 100): Promise<VehicleAsset[]> {
  // ✅ Filter di client-side setelah fetch semua data
  const all = await getAllVehicleAssets(perPage);
  const filtered = all.filter((a) => a.user_id === userId);
  console.log(`🚗 Vehicle assets for user ${userId}:`, filtered.length);
  return filtered;
}

export async function getVehicleAssetById(id: string): Promise<VehicleAsset | null> {
  const all = await getAllVehicleAssets();
  return all.find((a) => a.id === id) ?? null;
}
