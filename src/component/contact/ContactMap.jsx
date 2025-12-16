"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import styles from "./contact.module.css";

// Locations
const locations = [
  { id: 1, name: "Tallinn, EE", lat: 59.437, lng: 24.7536 },
  { id: 2, name: "Espoo, FI", lat: 60.2055, lng: 24.6559 },
  { id: 3, name: "Colorado, US", lat: 39.5501, lng: -105.7821 },
  { id: 4, name: "Chitwan, NP", lat: 27.5345, lng: 84.4326 },
];

// Dynamic import (client-only)
const MapWithNoSSR = dynamic(
  async () => {
    const L = (await import("leaflet")).default;
    const { MapContainer, TileLayer, Marker, Popup } = await import("react-leaflet");

    // Fix default icon
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    return function MapComponent() {
      return (
        <MapContainer
          center={[30, 10]}
          zoom={2}
          className={styles.map}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map(loc => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]}>
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      );
    };
  },
  { ssr: false } // important
);

export default function ContactMap() {
  return <div className={styles.mapBox}><MapWithNoSSR /></div>;
}
