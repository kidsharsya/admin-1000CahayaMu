export const indonesiaProvinces: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { id: 'ID-JK', name: 'DKI Jakarta' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [106.763, -6.383],
            [106.763, -6.187],
            [106.942, -6.187],
            [106.942, -6.383],
            [106.763, -6.383],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'ID-YO', name: 'DI Yogyakarta' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [110.2, -7.95],
            [110.6, -7.95],
            [110.6, -7.6],
            [110.2, -7.6],
            [110.2, -7.95],
          ],
        ],
      },
    },
  ],
};
