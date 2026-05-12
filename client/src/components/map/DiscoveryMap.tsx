import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Map, { Marker } from "react-map-gl/maplibre";
import type { MapRef } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./DiscoveryMap.scss";
import type { School, Lesson } from "@/types/types";
import Icon from "../Icon";
import pin from "@/assets/icons/Pin.svg";
import house from "@/assets/icons/House.svg";

type DiscoveryMapProps = (
  | { variant: "schools"; items: School[] }
  | { variant: "activities"; items: Lesson[] }
) & {
  country?: string;
};

const getCenter = (props: DiscoveryMapProps) => {
  const valid =
    props.variant === "schools"
      ? (props.items as School[]).filter((s) => s.lat && s.lng)
      : (props.items as Lesson[]).filter((l) => l.lat && l.lng);
  if (valid.length === 0) return { longitude: 10, latitude: 48, zoom: 4 };
  const lat = valid.reduce((sum, i) => sum + i.lat!, 0) / valid.length;
  const lng = valid.reduce((sum, i) => sum + i.lng!, 0) / valid.length;
  return { longitude: lng, latitude: lat, zoom: 6 };
};

async function geocodeCountry(country: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(country)}&format=json&limit=1&featuretype=country`,
    { headers: { "Accept-Language": "en" } },
  );
  const data = await res.json();
  if (!data.length) return null;
  return {
    longitude: parseFloat(data[0].lon),
    latitude: parseFloat(data[0].lat),
  };
}

export default function DiscoveryMap(props: DiscoveryMapProps) {
  const navigate = useNavigate();
  const mapRef = useRef<MapRef>(null);

  const mapReady = useRef(false);

  // Flyg till land när country-prop ändras
  useEffect(() => {
    console.log("country ändrades till:", props.country); // Debug

    if (!props.country || !mapReady.current) return;

    geocodeCountry(props.country).then((coords) => {
      if (!coords || !mapRef.current) return;
      mapRef.current.flyTo({
        center: [coords.longitude, coords.latitude],
        zoom: 5,
        duration: 1500,
      });
    });
  }, [props.country]); //  Lyssnar på country

  const renderMarkers = () => {
    if (props.variant === "schools") {
      return (props.items as School[])
        .filter((s) => s.lat && s.lng)
        .map((school) => (
          <Marker
            key={school.id}
            longitude={school.lng!}
            latitude={school.lat!}
            anchor="bottom"
          >
            <div
              className="map-marker map-marker--school"
              onClick={() => navigate(`/schools/${school.id}`)}
              title={school.name}
            >
              <Icon src={house} /> {school.name}
            </div>
          </Marker>
        ));
    }
    return (props.items as Lesson[])
      .filter((l) => l.lat && l.lng)
      .map((lesson) => (
        <Marker
          key={lesson.id}
          longitude={lesson.lng!}
          latitude={lesson.lat!}
          anchor="bottom"
        >
          <div
            className="map-marker map-marker--activity"
            onClick={() => navigate(`/booking/${lesson.id}`)}
            title={`${lesson.lessonType} ${lesson.sportType}`}
          >
            <Icon src={pin} /> {lesson.sportType} lesson
          </div>
        </Marker>
      ));
  };

  return (
    <div className="discovery-map">
      <Map
        ref={mapRef}
        onLoad={() => {
          mapReady.current = true;
        }}
        initialViewState={getCenter(props)}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
      >
        {renderMarkers()}
      </Map>
    </div>
  );
}
