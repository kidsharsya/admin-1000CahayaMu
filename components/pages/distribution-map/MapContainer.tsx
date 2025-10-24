'use client';
import { Map as MapIcon } from 'lucide-react';
import { MapContainer as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useMemo } from 'react';
import L, { PathOptions } from 'leaflet';
import { emissionData } from '@/data/emissionData';
import { FeatureCollection, Feature, Geometry } from 'geojson';

interface CustomProperties {
  regency: string;
  district: string;
  village: string;
}

export default function MapContainer() {
  const [geoData, setGeoData] = useState<FeatureCollection<Geometry, CustomProperties> | null>(null);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });

    fetch('/geojson/regency/id34_daerah_istimewa_yogyakarta_district.geojson')
      .then((res) => res.json())
      .then((data) => {
        setGeoData(data as FeatureCollection<Geometry, CustomProperties>);
      })
      .catch((err) => console.error('Gagal memuat GeoJSON:', err));
  }, []);

  const getColor = (value: number): string => {
    if (value > 400000) return '#FF0000';
    if (value > 300000) return '#F97316';
    if (value > 200000) return '#FBBF24';
    if (value > 100000) return '#04BF68';
    return '#BBEED6';
  };

  const geoStyle = useMemo(
    () =>
      ({
        weight: 0.8,
        color: '#333',
        fillOpacity: 0.7,
      } satisfies PathOptions),
    []
  );

  const onEachFeature = (feature: Feature<Geometry, CustomProperties>, layer: L.Layer) => {
    const regency = feature.properties?.regency || 'Tidak diketahui';
    const district = feature.properties?.district || 'Tidak diketahui';
    const village = feature.properties?.village || 'Tidak diketahui';

    const formattedName = district.toLowerCase();
    const emission = emissionData[formattedName] ?? Math.floor(Math.random() * 500000);

    if (layer instanceof L.Path) {
      layer.setStyle({
        ...geoStyle,
        fillColor: getColor(emission),
      });
    }

    layer.bindTooltip(`<b>${village}</b><br/><b>${district}</b><br/><b>${regency}</b><br/>Total emisi: ${emission.toLocaleString()} kg CO₂`, { sticky: true });
  };

  return (
    <div className="flex-1 bg-white rounded-xl shadow p-4">
      <div className="mb-2 space-y-2">
        <h2 className="text-lg font-semibold flex items-center">
          <MapIcon className="w-5 h-5 mr-2" />
          Peta Persebaran Emisi Karbon
        </h2>
        <p className="text-sm text-gray-500 mb-4">Visualisasi intensitas emisi karbon</p>
      </div>

      <div className="w-full h-[500px] rounded-lg overflow-hidden">
        <LeafletMap center={[-7.7956, 110.3695]} zoom={10} style={{ width: '100%', height: '100%' }} zoomControl={false}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {geoData && <GeoJSON data={geoData} onEachFeature={onEachFeature} />}
        </LeafletMap>
      </div>
    </div>
  );
}
