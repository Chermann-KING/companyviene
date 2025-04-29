"use client";

import { useEffect, useState, useCallback } from "react";
import { defaultMapConfig, mapContainerStyle } from "@/config/google-maps";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map() {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const initMap = useCallback(async () => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      version: "weekly",
      libraries: ["marker"],
    });

    try {
      const google = await loader.load();
      const { Map } = google.maps;
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      const newMap = new Map(
        document.getElementById("map-container") as HTMLElement,
        {
          ...defaultMapConfig,
          center: new google.maps.LatLng(
            defaultMapConfig.center.lat,
            defaultMapConfig.center.lng
          ),
        }
      );

      new AdvancedMarkerElement({
        map: newMap,
        position: defaultMapConfig.center,
        title: "CompanyViene",
      });

      setMap(newMap);
    } catch (error) {
      console.error("Error loading Google Maps:", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !map) {
      initMap();
    }

    return () => {
      if (map) {
        // Cleanup if needed
      }
    };
  }, [map, initMap]);

  return <div id="map-container" style={mapContainerStyle} />;
}
