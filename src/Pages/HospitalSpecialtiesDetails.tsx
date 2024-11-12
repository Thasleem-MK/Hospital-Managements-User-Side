import React, { useState } from "react";
import {
  ArrowLeft,
  Clock,
  ChevronDown,
  ChevronUp,
  Phone,
  // Calendar,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { Header } from "../Components/Common";
import { convertTo12HourFormat } from "../Components/HospitalDetailesComponents";
import { Hospital, Specialty } from "../Redux/HospitalsData";

const DepartmentDoctorsPage: React.FC = () => {
  const { departmentId, id } = useParams<{
    departmentId: string;
    id: string;
  }>();
  const [expandedDoctor, setExpandedDoctor] = useState<string | null>(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const navigate = useNavigate();
  const { hospitals } = useSelector((state: RootState) => state.hospitalData);
  const hospital = hospitals.find((hos) => hos._id === id) as
    | Hospital
    | undefined;

  const department = hospital?.specialties.find(
    (dept) => dept._id === departmentId
  ) as Specialty | undefined;

  const toggleDoctorExpansion = (doctorId: string) => {
    setExpandedDoctor(expandedDoctor === doctorId ? null : doctorId);
  };

  // const handleBookAppointment = (doctorId: string) => {
  //   // Implement booking logic here
  //   console.log(`Booking appointment with doctor ${doctorId}`);
  // };

  const initiateCall = () => {
    if (department) {
      window.location.href = `tel:${department.phone}`;
    }
    setShowCallModal(false);
  };

  if (!department) {
    return (
      <div className="min-h-screen bg-green-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-800 mb-4">
            Department not found
          </h1>
          <button
            onClick={() => navigate(`/services/hospitals/${id}`)}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header
          onBackClick={() =>
            navigate(`/services/hospitals/${hospital?._id}`)}
          title={department.name}
        />

        <div className="space-y-6">
          {department.doctors.map((doctor) => (
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
                  <p className="text-green-600">{doctor.qualification}</p>
                </div>
                {expandedDoctor === doctor._id ? (
                  <ChevronUp className="text-green-600" />
                ) : (
                  <ChevronDown className="text-green-600" />
                )}
              </div>
              {expandedDoctor === doctor._id && (
                <div className="px-4 pb-4">
                  <div className="flex items-center mb-2">
                    <span className="text-green-700">
                      <div className="flex align-middle">
                        <Clock className="h-5 w-5 text-green-600 mr-2" />
                        Consultation Hours:{" "}
                      </div>
                      {doctor.consulting.map((schedule, index) => (
                        <span key={index}>
                          {schedule.day}:{" "}
                          {convertTo12HourFormat(schedule.start_time)} -{" "}
                          {convertTo12HourFormat(schedule.end_time)}
                          {index < doctor.consulting.length - 1 ? ", " : ""}
                          <br />
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    {/* <button
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                      onClick={() =>
                        handleBookAppointment(doctor._id as string)
                      }
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Appointment
                    </button> */}
                    <button
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                      onClick={() => setShowCallModal(true)}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            Department Information
          </h2>
          <p className="text-green-700">{department.description}</p>
        </div>
      </div>

      {showCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Call Department
            </h2>
            <p className="text-green-700 mb-4">
              You're about to call the {department.name} department. Click the
              button below to call {department.phone}.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCallModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={initiateCall}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentDoctorsPage;
