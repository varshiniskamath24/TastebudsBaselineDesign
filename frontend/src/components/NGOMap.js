// src/components/NGOMap.js
import React from "react";
import "leaflet/dist/leaflet.css";

let LeafletMap = null;
try {
  // require only when available
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
  LeafletMap = ({ assignedNgo, pickup }) => {
    const center = pickup ? [pickup.lat, pickup.lng] : (assignedNgo?.location?.coordinates ? [assignedNgo.location.coordinates[1], assignedNgo.location.coordinates[0]] : [13.34, 74.74]);
    return (
      <div style={{ height: 280, width: "100%", borderRadius: 8, overflow: "hidden" }}>
        <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {pickup && <Marker position={[pickup.lat, pickup.lng]}>
            <Popup>Pickup location</Popup>
          </Marker>}
          {assignedNgo && assignedNgo.location && (
            <Marker position={[assignedNgo.location.coordinates[1], assignedNgo.location.coordinates[0]]}>
              <Popup>{assignedNgo.name}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    );
  };
} catch (e) {
  LeafletMap = ({ assignedNgo, pickup }) => (
    <div style={{ padding: 14, border: "1px dashed #ccc", borderRadius: 8 }}>
      <p style={{ margin: 0 }}>Install <code>react-leaflet</code> and <code>leaflet</code> to enable the map.</p>
    </div>
  );
}

export default LeafletMap;
