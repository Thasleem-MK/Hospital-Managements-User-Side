import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Star,
  MapPin,
  ArrowUpDown,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Hospital, Review } from "../Redux/HospitalsData";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";

interface HospitalDetails {
  id: string;
  name: string;
  rating: number;
  doctorCount: number;
  location: string;
}

interface SpecialtyWithHospitals {
  id?: string;
  name: string;
  description: string;
  hospitals: HospitalDetails[];
}

// Function to gather specialties with associated hospitals
const getAllSpecialtiesWithHospitals = (
  hospitals: Hospital[]
): SpecialtyWithHospitals[] => {
  const specialtiesMap: { [key: string]: SpecialtyWithHospitals } = {};

  hospitals.forEach((hospital) => {
    hospital.specialties.forEach((specialty) => {
      if (!specialtiesMap[specialty.name]) {
        specialtiesMap[specialty.name] = {
          id: specialty._id,
          name: specialty.name,
          description: specialty.description,
          hospitals: [],
        };
      }

      specialtiesMap[specialty.name].hospitals.push({
        id: hospital._id ?? "",
        name: hospital.name,
        rating: calculateAverageRating(hospital.reviews),
        doctorCount: specialty.doctors.length,
        location: hospital.address,
      });
    });
  });

  return Object.values(specialtiesMap);
};

const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

const SpecialtiesPage: React.FC = () => {
  const hospitals = useSelector(
    (state: RootState) => state.hospitalData.hospitals
  );

  const specialties = getAllSpecialtiesWithHospitals(hospitals);

  const [expandedSpecialty, setExpandedSpecialty] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState<"rating" | "doctorCount">(
    "rating"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filteredSpecialties, setFilteredSpecialties] = useState(specialties);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = specialties.filter(
      (specialty) =>
        specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialty.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSpecialties(filtered);
  }, [searchTerm, specialties]);

  const toggleSpecialtyExpansion = (specialtyId: string) => {
    setExpandedSpecialty(
      expandedSpecialty === specialtyId ? null : specialtyId
    );
  };

  const navigateToHospital = (hospitalId: string) => {
    navigate(`/services/hospitals/${hospitalId}`);
  };

  const sortHospitals = (hospitals: HospitalDetails[]): HospitalDetails[] => {
    return hospitals.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortCriteria] - b[sortCriteria];
      } else {
        return b[sortCriteria] - a[sortCriteria];
      }
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
            Medical Specialties
          </h1>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search specialties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
        </div>

        <div className="space-y-6">
          {filteredSpecialties.map((specialty) => (
            <div
              key={specialty.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div
                className="flex items-center p-4 cursor-pointer"
                onClick={() => toggleSpecialtyExpansion(specialty.id as string)}
              >
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-green-800">
                    {specialty.name}
                  </h2>
                  {/* <p className="text-green-600">{specialty.description}</p> */}
                </div>
                {expandedSpecialty === specialty.id ? (
                  <ChevronUp className="text-green-600" />
                ) : (
                  <ChevronDown className="text-green-600" />
                )}
              </div>
              {expandedSpecialty === specialty.id && (
                <div className="px-4 pb-4">
                  <h3 className="text-lg font-semibold text-green-700 mb-4">
                    Hospitals with {specialty.name}
                  </h3>
                  <div className="flex justify-end mb-4">
                    <button
                      className="flex items-center text-green-700 hover:text-green-900"
                      onClick={() => {
                        setSortCriteria(
                          sortCriteria === "rating" ? "doctorCount" : "rating"
                        );
                        toggleSortOrder();
                      }}
                    >
                      Sort by{" "}
                      {sortCriteria === "rating" ? "Rating" : "Doctor Count"}
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {sortHospitals(specialty.hospitals).map((hospital) => (
                      <div
                        key={hospital.id}
                        className="bg-green-100 p-3 rounded-lg cursor-pointer hover:bg-green-200 transition-colors"
                        onClick={() => navigateToHospital(hospital.id)}
                      >
                        <h4 className="text-md font-medium text-green-800 mb-1">
                          {hospital.name}
                        </h4>
                        <div className="flex items-center text-sm text-green-700 mb-1">
                          <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
                          {hospital.rating.toFixed(1)}
                        </div>
                        <div className="flex items-center text-sm text-green-700 mb-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {hospital.location}
                        </div>
                        <div className="text-sm text-green-700">
                          {hospital.doctorCount} doctors
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredSpecialties.length === 0 && (
          <div className="text-center text-green-700 mt-8">
            No specialties found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialtiesPage;
