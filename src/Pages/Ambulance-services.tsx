import React, { useState, useEffect } from "react";
import { Search, Phone, MapPin, ArrowUpDown, Ambulance } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { AmbulanceService } from "../Redux/AmbulanceData";
import {Header} from "../Components/Common";

const AmbulanceServicesPage: React.FC = () => {
  const ambulanceServices = useSelector(
    (state: RootState) => state.ambulanceData
  );

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
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedAndFiltered = sortServices(filtered);
    setFilteredServices(sortedAndFiltered);
  }, [searchTerm, sortOrder, userLocation, ambulanceServices]);

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
        Number(a.latitude),
        Number(a.longitude)
      );
      const distanceB = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        Number(b.latitude),
        Number(b.longitude)
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
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header onBackClick={handleGoBack} title="Ambulance Services" />

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
                  Number(service.latitude),
                  Number(service.longitude)
                )
              : null;

            return (
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-green-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Ambulance className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-green-800 mb-2">
                      {service.serviceName}
                    </h2>
                    <p className="text-green-600 text-sm mb-3 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      {service.address}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <a
                        href={`tel:${service.phone}`}
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 mb-2 sm:mb-0"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        <span>Call Now</span>
                      </a>
                      <div className="flex items-center text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">
                        <MapPin className="h-4 w-4 mr-2" />
                        {distance !== null
                          ? `${distance.toFixed(2)} km away`
                          : "Calculating distance..."}
                      </div>
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
