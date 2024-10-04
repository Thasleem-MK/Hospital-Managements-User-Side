import React, { useState, useEffect } from "react";
import { Search, Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  availability: {
    day: string;
    times: {
      start: string;
      end: string;
      hospital: string;
    }[];
  }[];
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. John Smith",
    specialty: "Cardiology",
    image: "/placeholder.svg?height=200&width=200",
    availability: [
      {
        day: "Monday",
        times: [
          { start: "09:00 AM", end: "11:00 AM", hospital: "City Hospital" },
          { start: "02:00 PM", end: "05:00 PM", hospital: "General Hospital" },
        ],
      },
      {
        day: "Wednesday",
        times: [
          { start: "10:00 AM", end: "02:00 PM", hospital: "City Hospital" },
        ],
      },
      {
        day: "Friday",
        times: [
          { start: "01:00 PM", end: "06:00 PM", hospital: "General Hospital" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Emily Johnson",
    specialty: "Pediatrics",
    image: "/placeholder.svg?height=200&width=200",
    availability: [
      {
        day: "Tuesday",
        times: [
          {
            start: "08:00 AM",
            end: "12:00 PM",
            hospital: "Children's Hospital",
          },
          { start: "02:00 PM", end: "04:00 PM", hospital: "City Hospital" },
        ],
      },
      {
        day: "Thursday",
        times: [
          { start: "09:00 AM", end: "03:00 PM", hospital: "General Hospital" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Michael Lee",
    specialty: "Orthopedics",
    image: "/placeholder.svg?height=200&width=200",
    availability: [
      {
        day: "Monday",
        times: [
          {
            start: "10:00 AM",
            end: "02:00 PM",
            hospital: "Sports Medicine Center",
          },
        ],
      },
      {
        day: "Wednesday",
        times: [
          { start: "08:00 AM", end: "12:00 PM", hospital: "City Hospital" },
          { start: "02:00 PM", end: "06:00 PM", hospital: "General Hospital" },
        ],
      },
      {
        day: "Friday",
        times: [
          { start: "09:00 AM", end: "01:00 PM", hospital: "Orthopedic Clinic" },
        ],
      },
    ],
  },
];

const DoctorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [expandedDoctor, setExpandedDoctor] = useState<number | null>(null);

  useEffect(() => {
    const results = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(results);
  }, [searchTerm]);

  const toggleDoctorExpansion = (doctorId: number) => {
    setExpandedDoctor(expandedDoctor === doctorId ? null : doctorId);
  };

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Our Doctors</h1>

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
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div
                className="flex items-center p-4 cursor-pointer"
                onClick={() => toggleDoctorExpansion(doctor.id)}
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-green-800">
                    {doctor.name}
                  </h2>
                  <p className="text-green-600">{doctor.specialty}</p>
                </div>
                {expandedDoctor === doctor.id ? (
                  <ChevronUp className="text-green-600" />
                ) : (
                  <ChevronDown className="text-green-600" />
                )}
              </div>
              {expandedDoctor === doctor.id && (
                <div className="px-4 pb-4">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Availability
                  </h3>
                  {doctor.availability.map((schedule, index) => (
                    <div key={index} className="mb-2">
                      <h4 className="font-medium text-green-600">
                        {schedule.day}
                      </h4>
                      {schedule.times.map((time, timeIndex) => (
                        <div
                          key={timeIndex}
                          className="ml-4 flex items-center text-green-700"
                        >
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            {time.start} - {time.end}
                          </span>
                          <MapPin className="h-4 w-4 ml-2 mr-1" />
                          <span>{time.hospital}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center text-green-700 mt-8">
            No doctors found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;