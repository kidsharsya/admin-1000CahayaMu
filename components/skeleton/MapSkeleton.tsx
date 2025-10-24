'use client';

export default function MapSkeleton() {
  return (
    <div className="flex-1 bg-white rounded-xl shadow p-4 animate-pulse">
      <div className="space-y-3 mb-4">
        <div className="h-5 w-64 bg-gray-200 rounded" />
        <div className="h-4 w-48 bg-gray-200 rounded" />
      </div>
      <div className="w-full h-[500px] bg-gray-200 rounded-lg" />
    </div>
  );
}
