"use client";

import { useEffect, useState } from "react";
import { defaultMapConfig, mapContainerStyle } from "@/config/google-maps";

export default function Map() {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = new Promise<void>((resolve) => {
        if (typeof google !== "undefined") {
          resolve();
        } else {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
          script.async = true;
          script.defer = true;
          script.onload = () => resolve();
          document.head.appendChild(script);
        }
      });

      loader.then(() => {
        if (!map) {
          const newMap = new google.maps.Map(
            document.getElementById("map-container") as HTMLElement,
            {
              ...defaultMapConfig,
              center: new google.maps.LatLng(
                defaultMapConfig.center.lat,
                defaultMapConfig.center.lng
              ),
            }
          );

          const marker = new google.maps.Marker({
            position: defaultMapConfig.center,
            map: newMap,
          });

          setMap(newMap);
        }
      });
    }

    return () => {
      if (map) {
        // Cleanup if needed
      }
    };
  }, [map]);

  return <div id="map-container" style={mapContainerStyle} />;
}
