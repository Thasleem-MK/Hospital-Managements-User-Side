import { useState } from "react";
import Navbar from "../Components/Navbar";
import { Search, MapPin, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for hospitals
const hospitals = [
  {
    id: 1,
    name: "City General Hospital",
    distance: 2.5,
    rating: 4.5,
    isOpen: true,
  },
  {
    id: 2,
    name: "Sunshine Medical Center",
    distance: 5.1,
    rating: 4.2,
    isOpen: false,
  },
  {
    id: 3,
    name: "Greenwood Health Institute",
    distance: 1.8,
    rating: 4.8,
    isOpen: true,
  },
  {
    id: 4,
    name: "Riverside Community Hospital",
    distance: 3.7,
    rating: 4.0,
    isOpen: true,
  },
  {
    id: 5,
    name: "Oakville Medical Complex",
    distance: 6.2,
    rating: 4.6,
    isOpen: false,
  },
];

export default function HospitalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpenNow, setFilterOpenNow] = useState(false);
  const [sortBy, setSortBy] = useState("distance");
  const navigate = useNavigate();

  const filteredAndSortedHospitals = hospitals
    .filter(
      (hospital) =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filterOpenNow || hospital.isOpen)
    )
    .sort((a, b) => {
      if (sortBy === "distance") return a.distance - b.distance;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Hospitals</h1>

        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search hospitals..."
                className="w-full p-2 pl-10 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-green-400" />
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="openNow"
              className="mr-2"
              checked={filterOpenNow}
              onChange={(e) => setFilterOpenNow(e.target.checked)}
            />
            <label htmlFor="openNow" className="text-green-700">
              Open Now
            </label>
          </div>
          <div>
            <select
              className="p-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              onClick={() => navigate(`/services/hospitals/${hospital.id}`)}
            >
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                {hospital.name}
              </h2>
              <div className="flex items-center text-green-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hospital.distance.toFixed(1)} km away</span>
              </div>
              <div className="flex items-center text-green-600 mb-2">
                <Star className="h-4 w-4 mr-1" />
                <span>{hospital.rating.toFixed(1)} / 5.0</span>
              </div>
              <div className="flex items-center text-green-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>{hospital.isOpen ? "Open Now" : "Closed"}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}