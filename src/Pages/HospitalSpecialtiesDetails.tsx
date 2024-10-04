// import React, { useState } from "react";
// import {
//   ArrowLeft,
//   Clock,
//   Calendar,
//   Star,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";

// interface Doctor {
//   id: number;
//   name: string;
//   specialty: string;
//   image: string;
//   rating: number;
//   experience: number;
//   consultingDays: string[];
//   consultingHours: string;
// }

// interface Department {
//   id: number;
//   name: string;
//   doctors: Doctor[];
// }

// const departments: Department[] = [
//   {
//     id: 1,
//     name: "Cardiology",
//     doctors: [
//       {
//         id: 101,
//         name: "Dr. John Smith",
//         specialty: "Interventional Cardiology",
//         image: "/placeholder.svg?height=100&width=100",
//         rating: 4.8,
//         experience: 15,
//         consultingDays: ["Monday", "Wednesday", "Friday"],
//         consultingHours: "9:00 AM - 1:00 PM",
//       },
//       {
//         id: 102,
//         name: "Dr. Emily Johnson",
//         specialty: "Electrophysiology",
//         image: "/placeholder.svg?height=100&width=100",
//         rating: 4.7,
//         experience: 12,
//         consultingDays: ["Tuesday", "Thursday", "Saturday"],
//         consultingHours: "2:00 PM - 6:00 PM",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Orthopedics",
//     doctors: [
//       {
//         id: 201,
//         name: "Dr. Michael Lee",
//         specialty: "Joint Replacement",
//         image: "/placeholder.svg?height=100&width=100",
//         rating: 4.9,
//         experience: 20,
//         consultingDays: ["Monday", "Tuesday", "Thursday"],
//         consultingHours: "10:00 AM - 2:00 PM",
//       },
//       {
//         id: 202,
//         name: "Dr. Sarah Parker",
//         specialty: "Sports Medicine",
//         image: "/placeholder.svg?height=100&width=100",
//         rating: 4.6,
//         experience: 8,
//         consultingDays: ["Wednesday", "Friday", "Saturday"],
//         consultingHours: "1:00 PM - 5:00 PM",
//       },
//     ],
//   },
// ];

// const DepartmentDoctorsPage: React.FC = () => {
//   const { departmentId } = useParams();
//   const [expandedDoctor, setExpandedDoctor] = useState<number | null>(null);
//   const navigate = useNavigate();

//   const department = departments.find((dept) => dept.name === departmentId);

//   const toggleDoctorExpansion = (doctorId: number) => {
//     setExpandedDoctor(expandedDoctor === doctorId ? null : doctorId);
//   };

//   if (!department) {
//     return (
//       <div className="min-h-screen bg-green-50 p-4 md:p-8 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-green-800 mb-4">
//             Department not found
//           </h1>
//           <button
//             onClick={() => navigate("/services/hospitals/3")}
//             className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-green-50 p-4 md:p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-6 flex items-center">
//           <button
//             onClick={() => navigate("/services/hospitals/3")}
//             className="mr-4 p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
//           >
//             <ArrowLeft className="h-6 w-6" />
//           </button>
//           <h1 className="text-3xl font-bold text-green-800">
//             {department.name} Department
//           </h1>
//         </div>

//         <div className="space-y-6">
//           {department.doctors.map((doctor) => (
//             <div
//               key={doctor.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden"
//             >
//               <div
//                 className="flex items-center p-4 cursor-pointer"
//                 onClick={() => toggleDoctorExpansion(doctor.id)}
//               >
//                 <img
//                   src={doctor.image}
//                   alt={doctor.name}
//                   className="w-16 h-16 rounded-full object-cover mr-4"
//                 />
//                 <div className="flex-grow">
//                   <h2 className="text-xl font-semibold text-green-800">
//                     {doctor.name}
//                   </h2>
//                   <p className="text-green-600">{doctor.specialty}</p>
//                 </div>
//                 {expandedDoctor === doctor.id ? (
//                   <ChevronUp className="text-green-600" />
//                 ) : (
//                   <ChevronDown className="text-green-600" />
//                 )}
//               </div>
//               {expandedDoctor === doctor.id && (
//                 <div className="px-4 pb-4">
//                   <div className="flex items-center mb-2">
//                     <Star className="h-5 w-5 text-yellow-400 mr-1" />
//                     <span className="text-green-700 font-medium">
//                       {doctor.rating} / 5
//                     </span>
//                     <span className="ml-4 text-green-600">
//                       {doctor.experience} years experience
//                     </span>
//                   </div>
//                   <div className="flex items-center mb-2">
//                     <Calendar className="h-5 w-5 text-green-600 mr-2" />
//                     <span className="text-green-700">
//                       {doctor.consultingDays.join(", ")}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <Clock className="h-5 w-5 text-green-600 mr-2" />
//                     <span className="text-green-700">
//                       {doctor.consultingHours}
//                     </span>
//                   </div>
//                   <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors">
//                     Book Appointment
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="mt-8 bg-green-100 p-4 rounded-lg">
//           <h2 className="text-xl font-semibold text-green-800 mb-2">
//             Department Information
//           </h2>
//           <p className="text-green-700">
//             Our {department.name} department is staffed with experienced
//             professionals dedicated to providing the highest quality of care.
//             Please note that doctor availability may change. For the most
//             up-to-date information or to schedule an appointment, please contact
//             our reception.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DepartmentDoctorsPage;

import React, { useState } from "react";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Star,
  ChevronDown,
  ChevronUp,
  Phone,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  experience: number;
  consultingDays: string[];
  consultingHours: string;
}

interface Department {
  id: number;
  name: string;
  bookingNumber: string;
  doctors: Doctor[];
}

const departments: Department[] = [
  {
    id: 1,
    name: "Cardiology",
    bookingNumber: "+1234567890",
    doctors: [
      {
        id: 101,
        name: "Dr. John Smith",
        specialty: "Interventional Cardiology",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.8,
        experience: 15,
        consultingDays: ["Monday", "Wednesday", "Friday"],
        consultingHours: "9:00 AM - 1:00 PM",
      },
      {
        id: 102,
        name: "Dr. Emily Johnson",
        specialty: "Electrophysiology",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.7,
        experience: 12,
        consultingDays: ["Tuesday", "Thursday", "Saturday"],
        consultingHours: "2:00 PM - 6:00 PM",
      },
    ],
  },
  {
    id: 2,
    name: "Orthopedics",
    bookingNumber: "+1987654321",
    doctors: [
      {
        id: 201,
        name: "Dr. Michael Lee",
        specialty: "Joint Replacement",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.9,
        experience: 20,
        consultingDays: ["Monday", "Tuesday", "Thursday"],
        consultingHours: "10:00 AM - 2:00 PM",
      },
      {
        id: 202,
        name: "Dr. Sarah Parker",
        specialty: "Sports Medicine",
        image: "/placeholder.svg?height=100&width=100",
        rating: 4.6,
        experience: 8,
        consultingDays: ["Wednesday", "Friday", "Saturday"],
        consultingHours: "1:00 PM - 5:00 PM",
      },
    ],
  },
];

const DepartmentDoctorsPage: React.FC = () => {
  const { departmentId } = useParams();
  const [expandedDoctor, setExpandedDoctor] = useState<number | null>(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const navigate = useNavigate();

  const department = departments.find(
    (dept) => dept.name === departmentId
  );

  const toggleDoctorExpansion = (doctorId: number) => {
    setExpandedDoctor(expandedDoctor === doctorId ? null : doctorId);
  };

  const handleBookAppointment = () => {
    setShowCallModal(true);
  };

  const initiateCall = () => {
    if (department) {
      window.location.href = `tel:${department.bookingNumber}`;
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
            onClick={() => {
              navigate("/services/hospitals/3/");
            }}
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
        <div className="mb-6 flex items-center">
          <button
            onClick={() => {
              navigate("/services/hospitals/3/");
            }}
            className="mr-4 p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-bold text-green-800">
            {department.name} Department
          </h1>
        </div>

        <div className="space-y-6">
          {department.doctors.map((doctor) => (
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
                  <div className="flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="text-green-700 font-medium">
                      {doctor.rating} / 5
                    </span>
                    <span className="ml-4 text-green-600">
                      {doctor.experience} years experience
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-700">
                      {doctor.consultingDays.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-700">
                      {doctor.consultingHours}
                    </span>
                  </div>
                  <button
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                    onClick={handleBookAppointment}
                  >
                    Book Appointment
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            Department Information
          </h2>
          <p className="text-green-700">
            Our {department.name} department is staffed with experienced
            professionals dedicated to providing the highest quality of care.
            Please note that doctor availability may change. For the most
            up-to-date information or to schedule an appointment, please contact
            our reception at {department.bookingNumber}.
          </p>
        </div>
      </div>

      {showCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Book Appointment
            </h2>
            <p className="text-green-700 mb-4">
              To book an appointment, we'll connect you with our booking line.
              Click the button below to call {department.bookingNumber}.
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
