import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "../assets/Images/marker-icon.png";
import markerIcon2x from "../assets/Images/marker-icon-2x.png";
import markerShadow from "../assets/Images/marker-shadow.png";
import { useEffect, useState } from "react";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const hospitalIcon = Leaflet.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // size of the shadow
});

const userIcon = Leaflet.icon({
  iconUrl: markerIcon, // You can use a different icon if desired
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// interface RoutingProps {
//   userLocation: [number, number];
//   hospitalLocation: [number, number];
// }
// Component for rendering the route
// const Routing: React.FC<RoutingProps> = ({
//   userLocation,
//   hospitalLocation,
// }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!userLocation || !hospitalLocation) return;

//     // Add routing control between user and hospital locations
//     const routingControl = Leaflet.Routing.control({
//       waypoints: [
//         Leaflet.latLng(userLocation), // User Location
//         Leaflet.latLng(hospitalLocation), // Hospital Location
//       ],
//       lineOptions: {
//         styles: [{ color: "blue", weight: 4 }],
//       },
//       createMarker: function (i: any, waypoint: any, n: any) {
//         const markerOptions: L.MarkerOptions = {};
//         if (i === 0) {
//           markerOptions.icon = userIcon; // User's icon
//         } else if (i === n - 1) {
//           markerOptions.icon = hospitalIcon; // Hospital's icon
//         }
//         return Leaflet.marker(waypoint.latLng, markerOptions);
//       },
//       routeWhileDragging: true,
//     }).addTo(map);

//     // Cleanup the control on component unmount
//     return () => {
//       map.removeControl(routingControl);
//     };
//   }, [map, userLocation, hospitalLocation]);

//   return null;
// };

const Map = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const hospitalLocation: [number, number] = [11.115816, 76.11859]; // Example: Manjeri City coordinates
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);
  return (
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
          <Popup>City General Hospital</Popup>
        </Marker>
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {/* {userLocation && hospitalLocation && (
          <Routing
            userLocation={userLocation}
            hospitalLocation={hospitalLocation}
          />
        )} */}
      </MapContainer>
    </div>
  );
};

export default Map;
