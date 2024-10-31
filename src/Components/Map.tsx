import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { MapPin } from "lucide-react";
import { Hospital } from "../Redux/HospitalsData";
import { getCurrentLocation } from "./getCurrentLocation";

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: import.meta.env.VITE_markerIcon2x,
  iconUrl: import.meta.env.VITE_markerIcon,
  shadowUrl: import.meta.env.VITE_markerShadow,
});

const hospitalIcon = Leaflet.icon({
  iconUrl: import.meta.env.VITE_markerIcon,
  iconRetinaUrl: import.meta.env.VITE_markerIcon2x,
  shadowUrl: import.meta.env.VITE_markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = Leaflet.icon({
  iconUrl: import.meta.env.VITE_markerIcon,
  iconRetinaUrl: import.meta.env.VITE_markerIcon2x,
  shadowUrl: import.meta.env.VITE_markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface RoutingProps {
  userLocation: [number, number];
  hospitalLocation: [number, number];
}

interface CustomRoutingControlOptions
  extends Leaflet.Routing.RoutingControlOptions {
  createMarker?: (
    i: number,
    waypoint: Leaflet.Routing.Waypoint,
    n: number
  ) => Leaflet.Marker;
}

const Routing: React.FC<RoutingProps> = ({
  userLocation,
  hospitalLocation,
}) => {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !hospitalLocation) return;

    const routingControl = Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(userLocation),
        Leaflet.latLng(hospitalLocation),
      ],
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance: 2,
      },
      createMarker: (i, waypoint, n) => {
        const markerOptions: Leaflet.MarkerOptions = {};
        if (i === 0) {
          markerOptions.icon = userIcon;
        } else if (i === n - 1) {
          markerOptions.icon = hospitalIcon;
        }
        return Leaflet.marker(waypoint.latLng, markerOptions);
      },
      routeWhileDragging: true,
    } as CustomRoutingControlOptions).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, userLocation, hospitalLocation]);

  return null;
};

const Map = ({ hospital }: { hospital: Hospital }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const hospitalLocation: [number, number] = [
    hospital?.latitude as number,
    hospital?.longitude as number,
  ];

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     setUserLocation([position.coords.latitude, position.coords.longitude]);
    //   },
    //   (error) => {
    //     console.error("Error getting user location:", error);
    //   }
    // );
    const getLocation = async () => {
      const [lat, lon] = await getCurrentLocation();
      setUserLocation([lat,lon]);
    }
    getLocation();
  }, []);

  const openGoogleMaps = () => {
    if (userLocation) {
      const [userLat, userLng] = userLocation;
      const [hospitalLat, hospitalLng] = hospitalLocation;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${hospitalLat},${hospitalLng}&travelmode=driving`;
      window.open(url, "_blank");
    } else {
      alert(
        "Unable to get your current location. Please enable location services and try again."
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="h-96 rounded-lg overflow-hidden">
        <MapContainer
          center={hospitalLocation}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={hospitalLocation} icon={hospitalIcon}>
            <Popup>{hospital.name}</Popup>
          </Marker>
          {userLocation && (
            <Marker position={userLocation} icon={userIcon}>
              <Popup>Your Location</Popup>
            </Marker>
          )}

          {userLocation && hospitalLocation && (
            <Routing
              userLocation={userLocation}
              hospitalLocation={hospitalLocation}
            />
          )}
        </MapContainer>
      </div>
      <div className="flex justify-center">
        <button
          onClick={openGoogleMaps}
          className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 transition-colors duration-200 flex items-center"
        >
          <MapPin className="mr-2 h-5 w-5" />
          Open in Google Maps
        </button>
      </div>
    </div>
  );
};

export default Map;
