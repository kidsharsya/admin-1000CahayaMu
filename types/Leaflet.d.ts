import 'leaflet';

declare module 'leaflet' {
  export namespace Icon {
    interface Default {
      _getIconUrl?: string;
    }
  }
}
