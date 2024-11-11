import React, { useState, useEffect } from "react";
import { Search, Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Components/Common";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { Doctor, Hospital, Specialty } from "../Redux/HospitalsData";
import { convertTo12HourFormat } from "../Components/HospitalDetailesComponents";

interface DoctorWithSpecialtyAndHospital extends Doctor {
  specialty: string;
  hospitalName: string;
  hospitalId: string;
}

const getAllDoctorsWithSpecialties = (
  hospitals: Hospital[]
): DoctorWithSpecialtyAndHospital[] => {
  return hospitals.flatMap((hospital) =>
    hospital.specialties.flatMap((specialty: Specialty) =>
      specialty.doctors.map((doctor: Doctor) => ({
        ...doctor,
        specialty: specialty.name,
        hospitalName: hospital.name,
        hospitalId: hospital._id as string,
      }))
    )
  );
};

const DoctorsPage: React.FC = () => {
  const hospitals = useSelector(
    (state: RootState) => state.hospitalData.hospitals
  );

  const [doctors, setDoctors] = useState<DoctorWithSpecialtyAndHospital[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<
    DoctorWithSpecialtyAndHospital[] | null
  >(null);
  const [expandedDoctor, setExpandedDoctor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (hospitals.length > 0) {
      const allDoctors = getAllDoctorsWithSpecialties(hospitals);
      setDoctors(allDoctors);
      setFilteredDoctors(allDoctors);
      setLoading(false);
    }
  }, [hospitals]);

  useEffect(() => {
    if (doctors) {
      const results = doctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDoctors(results);
    }
  }, [searchTerm, doctors]);

  const toggleDoctorExpansion = (doctorId: string) => {
    setExpandedDoctor(expandedDoctor === doctorId ? null : doctorId);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-green-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header onBackClick={handleGoBack} title="Our Doctors" />

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search doctors by name or specialty"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
        </div>

        <div className="space-y-6">
          {filteredDoctors?.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div
                className="flex items-center p-4 cursor-pointer"
                onClick={() => toggleDoctorExpansion(doctor._id as string)}
              >
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-green-800">
                    {doctor.name}
                  </h2>
                  <p className="text-green-600">{doctor.specialty}</p>
                </div>
                {expandedDoctor === doctor._id ? (
                  <ChevronUp className="text-green-600" />
                ) : (
                  <ChevronDown className="text-green-600" />
                )}
              </div>
              {expandedDoctor === doctor._id && (
                <div className="px-4 pb-4">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Availability
                  </h3>
                  {doctor.consulting.map((schedule, index) => (
                    <div key={index} className="mb-2">
                      <h4 className="font-medium text-green-600">
                        {schedule.day}
                      </h4>

                      <div className="ml-4 flex items-center text-green-700">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          {convertTo12HourFormat(schedule.start_time)} -{" "}
                          {convertTo12HourFormat(schedule.end_time)}
                        </span>
                        <MapPin className="h-4 w-4 ml-2 mr-1" />
                        <span
                          onClick={() =>
                            navigate(`/services/hospitals/${doctor.hospitalId}`)
                          }
                          className="cursor-pointer text-green-600"
                        >
                          <u>{doctor.hospitalName}</u>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredDoctors?.length === 0 && (
          <div className="text-center text-green-700 mt-8">
            No doctors found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
