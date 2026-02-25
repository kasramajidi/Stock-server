"use client";

import dynamic from "next/dynamic";

const MapPickerInner = dynamic(
  () => import("./MapPickerInner"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-48 w-full items-center justify-center rounded-lg border border-border bg-muted/30 text-muted-foreground">
        در حال بارگذاری نقشه...
      </div>
    ),
  }
);

interface MapPickerProps {
  latitude?: number | null;
  longitude?: number | null;
  onLocationSelect: (lat: number, lng: number) => void;
}

export default function MapPicker(props: MapPickerProps) {
  return (
    <div className="h-48 w-full overflow-hidden rounded-lg border border-border">
      <MapPickerInner {...props} />
    </div>
  );
}
