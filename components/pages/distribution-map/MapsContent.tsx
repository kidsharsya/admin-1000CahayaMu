'use client';
import dynamic from 'next/dynamic';
import MapSkeleton from '@/components/skeleton/MapSkeleton';
const MapContainer = dynamic(() => import('./MapContainer'), {
  ssr: false,
  loading: () => <MapSkeleton />,
});
import MapFilter from './MapFilter';

export function MapsContent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6">
        <MapContainer />
        <MapFilter />
      </div>
    </div>
  );
}
