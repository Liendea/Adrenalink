import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export default function DiscoveryMap() {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Map
        initialViewState={{
          longitude: 18.06,
          latitude: 59.33,
          zoom: 12,
        }}
        // Här hämtas den snygga designen helt gratis
        mapStyle="https://config.openfreemap.org/style/bright.json"
      >
        {/* Här kan du mappa ut dina skolor/aktiviteter som Markers */}
      </Map>
    </div>
  );
}
