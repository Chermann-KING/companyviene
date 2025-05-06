export const defaultMapConfig = {
  center: {
    lat: 0.3486,
    lng: 9.5105,
  },
  zoom: 15,
  mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
  options: {
    disableDefaultUI: false,
    zoomControl: true,
    scrollwheel: true,
    styles: [],
  },
};

export const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
