"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const locations = [
  { id: 1, name: "Tallinn, EE", lat: 59.437, lng: 24.7536 },
  { id: 2, name: "Espoo, FI", lat: 60.2055, lng: 24.6559 },
  { id: 3, name: "CO, US", lat: 39.5501, lng: -105.7821 },
  { id: 4, name: "Chitwan, NP", lat: 27.5345, lng: 84.4326 },
];

export default function ContactMap() {
  return (
    <MapContainer center={[40, 20]} zoom={2} style={{ height: "400px", width: "100%", borderRadius: "12px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
