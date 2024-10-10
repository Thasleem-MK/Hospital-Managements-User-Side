import React, { useState, useEffect } from "react";
import {
  Search,
  Phone,
  MapPin,
  ArrowUpDown,
  Ambulance,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AmbulanceService {
  id: number;
  name: string;
  contactNumber: string;
  latitude: number;
  longitude: number;
  location: string;
}

const ambulanceServices: AmbulanceService[] = [
  {
    id: 1,
    name: "City Emergency Response",
    contactNumber: "555-0101",
    latitude: 40.7128,
    longitude: -74.006,
    location: "Downtown",
  },
  {
    id: 2,
    name: "Rapid Rescue Ambulance",
    contactNumber: "555-0102",
    latitude: 40.7282,
    longitude: -73.7949,
    location: "Uptown",
  },
  {
    id: 3,
    name: "QuickMed Services",
    contactNumber: "555-0103",
    latitude: 40.7589,
    longitude: -73.9851,
    location: "Midtown",
  },
  {
    id: 4,
    name: "LifeLine Ambulance",
    contactNumber: "555-0104",
    latitude: 40.7831,
    longitude: -73.9712,
    location: "West End",
  },
  {
    id: 5,
    name: "Swift Aid Paramedics",
    contactNumber: "555-0105",
    latitude: 40.7214,
    longitude: -73.9448,
    location: "East Side",
  },
  {
    id: 6,
    name: "Metro Medical Transport",
    contactNumber: "555-0106",
    latitude: 40.8224,
    longitude: -73.9496,
    location: "North End",
  },
];

const AmbulanceServicesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filteredServices, setFilteredServices] = useState(ambulanceServices);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  useEffect(() => {
    const filtered = ambulanceServices.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedAndFiltered = sortServices(filtered);
    setFilteredServices(sortedAndFiltered);
  }, [searchTerm, sortOrder, userLocation]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const sortServices = (services: AmbulanceService[]) => {
    return services.sort((a, b) => {
      if (!userLocation) return 0;
      const distanceA = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        a.latitude,
        a.longitude
      );
      const distanceB = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        b.latitude,
        b.longitude
      );
      return sortOrder === "asc"
        ? distanceA - distanceB
        : distanceB - distanceA;
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={handleGoBack}
            className="mr-4 p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-200"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-bold text-green-800">
            Ambulance Services
          </h1>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search ambulance services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
        </div>

        <div className="flex justify-end mb-4">
          <button
            className="flex items-center text-green-700 hover:text-green-900"
            onClick={toggleSortOrder}
          >
            Sort by Distance
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.map((service) => {
            const distance = userLocation
              ? calculateDistance(
                  userLocation.latitude,
                  userLocation.longitude,
                  service.latitude,
                  service.longitude
                )
              : null;

            return (
              <div
                key={service.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <Ambulance className="h-6 w-6 text-green-600 mr-2 mt-1" />
                  <div>
                    <h2 className="text-lg font-semibold text-green-800">
                      {service.name}
                    </h2>
                    <p className="text-green-600 text-sm mb-2">
                      {service.location}
                    </p>
                    <div className="flex items-center text-sm text-green-700 mb-1">
                      <Phone className="h-4 w-4 mr-1" />
                      <a
                        href={`tel:${service.contactNumber}`}
                        className="hover:underline"
                      >
                        {service.contactNumber}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-green-700">
                      <MapPin className="h-4 w-4 mr-1" />
                      {distance !== null
                        ? `${distance.toFixed(2)} km away`
                        : "Calculating distance..."}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center text-green-700 mt-8">
            No ambulance services found matching your search criteria.
          </div>
        )}

        <div className="mt-8 bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            Emergency Instructions
          </h2>
          <ol className="list-decimal list-inside text-green-700 space-y-2">
            <li>Stay calm and assess the situation</li>
            <li>Call the nearest ambulance service</li>
            <li>Provide clear location details</li>
            <li>Follow the dispatcher's instructions</li>
            <li>Prepare necessary documents if possible</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceServicesPage;