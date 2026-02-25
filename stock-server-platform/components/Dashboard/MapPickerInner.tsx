"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo } from "react";

const DEFAULT_CENTER: [number, number] = [35.6892, 51.389]; // Tehran

interface MapPickerInnerProps {
  latitude?: number | null;
  longitude?: number | null;
  onLocationSelect: (lat: number, lng: number) => void;
}

function MapClickHandler({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapPickerInner({
  latitude,
  longitude,
  onLocationSelect,
}: MapPickerInnerProps) {
  // Fix default marker icon 404 in Next.js
  useEffect(() => {
    delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });
  }, []);

  const position: [number, number] = useMemo(() => {
    if (latitude != null && longitude != null) {
      return [latitude, longitude];
    }
    return DEFAULT_CENTER;
  }, [latitude, longitude]);

  const hasMarker = latitude != null && longitude != null;

  return (
    <MapContainer
      center={position}
      zoom={13}
      className="h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hasMarker && <Marker position={position} />}
      <MapClickHandler onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
}
