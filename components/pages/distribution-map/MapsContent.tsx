'use client';
import dynamic from 'next/dynamic';
const MapContainer = dynamic(() => import('./MapContainer'), {
  ssr: false,
  loading: () => <p>Memuat peta...</p>,
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
