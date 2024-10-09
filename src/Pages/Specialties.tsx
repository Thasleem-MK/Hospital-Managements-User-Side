// // import React, { useState } from "react";
// // import { ChevronDown, ChevronUp, BarChart2 } from "lucide-react";
// // import { useNavigate } from "react-router-dom";

// // interface Hospital {
// //   id: number;
// //   name: string;
// //   rating: number;
// //   doctorCount: number;
// // }

// // interface Specialty {
// //   id: number;
// //   name: string;
// //   description: string;
// //   hospitals: Hospital[];
// // }

// // const specialties: Specialty[] = [
// //   {
// //     id: 1,
// //     name: "Cardiology",
// //     description: "Deals with disorders of the heart and blood vessels",
// //     hospitals: [
// //       { id: 101, name: "City Hospital", rating: 4.5, doctorCount: 15 },
// //       { id: 102, name: "General Hospital", rating: 4.2, doctorCount: 12 },
// //       { id: 103, name: "Heart Center", rating: 4.8, doctorCount: 20 },
// //     ],
// //   },
// //   {
// //     id: 2,
// //     name: "Orthopedics",
// //     description: "Focuses on the musculoskeletal system",
// //     hospitals: [
// //       { id: 101, name: "City Hospital", rating: 4.3, doctorCount: 10 },
// //       { id: 104, name: "Sports Medicine Center", rating: 4.7, doctorCount: 18 },
// //       { id: 105, name: "Bone & Joint Clinic", rating: 4.5, doctorCount: 15 },
// //     ],
// //   },
// //   {
// //     id: 3,
// //     name: "Pediatrics",
// //     description: "Provides medical care for infants, children, and adolescents",
// //     hospitals: [
// //       { id: 102, name: "General Hospital", rating: 4.4, doctorCount: 14 },
// //       { id: 106, name: "Children's Hospital", rating: 4.9, doctorCount: 25 },
// //       { id: 107, name: "Family Care Center", rating: 4.6, doctorCount: 12 },
// //     ],
// //   },
// // ];

// // const SpecialtiesPage: React.FC = () => {
// //   const [expandedSpecialty, setExpandedSpecialty] = useState<number | null>(
// //     null
// //   );
// //   const navigate = useNavigate();

// //   const toggleSpecialtyExpansion = (specialtyId: number) => {
// //     setExpandedSpecialty(
// //       expandedSpecialty === specialtyId ? null : specialtyId
// //     );
// //   };

// //   const navigateToHospital = (hospitalId: number) => {
// //     navigate(`/services/hospitals/${hospitalId}`);
// //   };

// //   return (
// //     <div className="min-h-screen bg-green-50 p-4 md:p-8">
// //       <div className="max-w-4xl mx-auto">
// //         <h1 className="text-3xl font-bold text-green-800 mb-6">
// //           Medical Specialties
// //         </h1>

// //         <div className="space-y-6">
// //           {specialties.map((specialty) => (
// //             <div
// //               key={specialty.id}
// //               className="bg-white rounded-lg shadow-md overflow-hidden"
// //             >
// //               <div
// //                 className="flex items-center p-4 cursor-pointer"
// //                 onClick={() => toggleSpecialtyExpansion(specialty.id)}
// //               >
// //                 <div className="flex-grow">
// //                   <h2 className="text-xl font-semibold text-green-800">
// //                     {specialty.name}
// //                   </h2>
// //                   <p className="text-green-600">{specialty.description}</p>
// //                 </div>
// //                 {expandedSpecialty === specialty.id ? (
// //                   <ChevronUp className="text-green-600" />
// //                 ) : (
// //                   <ChevronDown className="text-green-600" />
// //                 )}
// //               </div>
// //               {expandedSpecialty === specialty.id && (
// //                 <div className="px-4 pb-4">
// //                   <h3 className="text-lg font-semibold text-green-700 mb-4">
// //                     Hospitals with {specialty.name}
// //                   </h3>
// //                   <div className="space-y-4">
// //                     {specialty.hospitals.map((hospital) => (
// //                       <div
// //                         key={hospital.id}
// //                         className="bg-green-100 p-4 rounded-lg cursor-pointer hover:bg-green-200 transition-colors"
// //                         onClick={() => navigateToHospital(hospital.id)}
// //                       >
// //                         <div className="flex justify-between items-center mb-2">
// //                           <h4 className="text-lg font-medium text-green-800">
// //                             {hospital.name}
// //                           </h4>
// //                           <span className="text-sm text-green-700">
// //                             Rating: {hospital.rating}/5
// //                           </span>
// //                         </div>
// //                         <div className="flex items-center">
// //                           <BarChart2 className="h-5 w-5 text-green-700 mr-2" />
// //                           <div className="flex-grow bg-green-200 rounded-full h-2">
// //                             <div
// //                               className="bg-green-600 rounded-full h-2"
// //                               style={{
// //                                 width: `${(hospital.doctorCount / 25) * 100}%`,
// //                               }}
// //                             ></div>
// //                           </div>
// //                           <span className="ml-2 text-sm text-green-700">
// //                             {hospital.doctorCount} doctors
// //                           </span>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SpecialtiesPage;

// import React, { useState, useEffect } from "react";
// import {
//   ChevronDown,
//   ChevronUp,
//   Search,
//   Star,
//   MapPin,
//   ArrowUpDown,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface Hospital {
//   id: number;
//   name: string;
//   rating: number;
//   doctorCount: number;
//   location: string;
// }

// interface Specialty {
//   id: number;
//   name: string;
//   description: string;
//   hospitals: Hospital[];
// }

// const specialties: Specialty[] = [
//   {
//     id: 1,
//     name: "Cardiology",
//     description: "Deals with disorders of the heart and blood vessels",
//     hospitals: [
//       {
//         id: 101,
//         name: "City Hospital",
//         rating: 4.5,
//         doctorCount: 15,
//         location: "Downtown",
//       },
//       {
//         id: 102,
//         name: "General Hospital",
//         rating: 4.2,
//         doctorCount: 12,
//         location: "Uptown",
//       },
//       {
//         id: 103,
//         name: "Heart Center",
//         rating: 4.8,
//         doctorCount: 20,
//         location: "Midtown",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Orthopedics",
//     description: "Focuses on the musculoskeletal system",
//     hospitals: [
//       {
//         id: 101,
//         name: "City Hospital",
//         rating: 4.3,
//         doctorCount: 10,
//         location: "Downtown",
//       },
//       {
//         id: 104,
//         name: "Sports Medicine Center",
//         rating: 4.7,
//         doctorCount: 18,
//         location: "West End",
//       },
//       {
//         id: 105,
//         name: "Bone & Joint Clinic",
//         rating: 4.5,
//         doctorCount: 15,
//         location: "East Side",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Pediatrics",
//     description: "Provides medical care for infants, children, and adolescents",
//     hospitals: [
//       {
//         id: 102,
//         name: "General Hospital",
//         rating: 4.4,
//         doctorCount: 14,
//         location: "Uptown",
//       },
//       {
//         id: 106,
//         name: "Children's Hospital",
//         rating: 4.9,
//         doctorCount: 25,
//         location: "North End",
//       },
//       {
//         id: 107,
//         name: "Family Care Center",
//         rating: 4.6,
//         doctorCount: 12,
//         location: "South Side",
//       },
//     ],
//   },
// ];

// const SpecialtiesPage: React.FC = () => {
//   const [expandedSpecialty, setExpandedSpecialty] = useState<number | null>(
//     null
//   );
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortCriteria, setSortCriteria] = useState<"rating" | "doctorCount">(
//     "rating"
//   );
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
//   const [filteredSpecialties, setFilteredSpecialties] = useState(specialties);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const filtered = specialties.filter(
//       (specialty) =>
//         specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         specialty.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredSpecialties(filtered);
//   }, [searchTerm]);

//   const toggleSpecialtyExpansion = (specialtyId: number) => {
//     setExpandedSpecialty(
//       expandedSpecialty === specialtyId ? null : specialtyId
//     );
//   };

//   const navigateToHospital = (hospitalId: number) => {
//     navigate(`/services/hospitals/${hospitalId}`);
//   };

//   const sortHospitals = (hospitals: Hospital[]) => {
//     return hospitals.sort((a, b) => {
//       if (sortOrder === "asc") {
//         return a[sortCriteria] - b[sortCriteria];
//       } else {
//         return b[sortCriteria] - a[sortCriteria];
//       }
//     });
//   };

//   const toggleSortOrder = () => {
//     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//   };

//   return (
//     <div className="min-h-screen bg-green-50 p-4 md:p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-green-800 mb-6">
//           Medical Specialties
//         </h1>

//         <div className="mb-6 relative">
//           <input
//             type="text"
//             placeholder="Search specialties..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
//         </div>

//         <div className="space-y-6">
//           {filteredSpecialties.map((specialty) => (
//             <div
//               key={specialty.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden"
//             >
//               <div
//                 className="flex items-center p-4 cursor-pointer"
//                 onClick={() => toggleSpecialtyExpansion(specialty.id)}
//               >
//                 <div className="flex-grow">
//                   <h2 className="text-xl font-semibold text-green-800">
//                     {specialty.name}
//                   </h2>
//                   <p className="text-green-600">{specialty.description}</p>
//                 </div>
//                 {expandedSpecialty === specialty.id ? (
//                   <ChevronUp className="text-green-600" />
//                 ) : (
//                   <ChevronDown className="text-green-600" />
//                 )}
//               </div>
//               {expandedSpecialty === specialty.id && (
//                 <div className="px-4 pb-4">
//                   <h3 className="text-lg font-semibold text-green-700 mb-4">
//                     Hospitals with {specialty.name}
//                   </h3>
//                   <div className="flex justify-end mb-4">
//                     <button
//                       className="flex items-center text-green-700 hover:text-green-900"
//                       onClick={() => {
//                         setSortCriteria(
//                           sortCriteria === "rating" ? "doctorCount" : "rating"
//                         );
//                         toggleSortOrder();
//                       }}
//                     >
//                       Sort by{" "}
//                       {sortCriteria === "rating" ? "Rating" : "Doctor Count"}
//                       <ArrowUpDown className="ml-1 h-4 w-4" />
//                     </button>
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                     {sortHospitals(specialty.hospitals).map((hospital) => (
//                       <div
//                         key={hospital.id}
//                         className="bg-green-100 p-3 rounded-lg cursor-pointer hover:bg-green-200 transition-colors"
//                         onClick={() => navigateToHospital(hospital.id)}
//                       >
//                         <h4 className="text-md font-medium text-green-800 mb-1">
//                           {hospital.name}
//                         </h4>
//                         <div className="flex items-center text-sm text-green-700 mb-1">
//                           <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
//                           {hospital.rating.toFixed(1)}
//                         </div>
//                         <div className="flex items-center text-sm text-green-700 mb-1">
//                           <MapPin className="h-4 w-4 mr-1" />
//                           {hospital.location}
//                         </div>
//                         <div className="text-sm text-green-700">
//                           {hospital.doctorCount} doctors
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {filteredSpecialties.length === 0 && (
//           <div className="text-center text-green-700 mt-8">
//             No specialties found matching your search criteria.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpecialtiesPage;





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

interface Hospital {
  id: number;
  name: string;
  rating: number;
  doctorCount: number;
  location: string;
}

interface Specialty {
  id: number;
  name: string;
  description: string;
  hospitals: Hospital[];
}

const specialties: Specialty[] = [
  {
    id: 1,
    name: "Cardiology",
    description: "Deals with disorders of the heart and blood vessels",
    hospitals: [
      {
        id: 101,
        name: "City Hospital",
        rating: 4.5,
        doctorCount: 15,
        location: "Downtown",
      },
      {
        id: 102,
        name: "General Hospital",
        rating: 4.2,
        doctorCount: 12,
        location: "Uptown",
      },
      {
        id: 103,
        name: "Heart Center",
        rating: 4.8,
        doctorCount: 20,
        location: "Midtown",
      },
    ],
  },
  {
    id: 2,
    name: "Orthopedics",
    description: "Focuses on the musculoskeletal system",
    hospitals: [
      {
        id: 101,
        name: "City Hospital",
        rating: 4.3,
        doctorCount: 10,
        location: "Downtown",
      },
      {
        id: 104,
        name: "Sports Medicine Center",
        rating: 4.7,
        doctorCount: 18,
        location: "West End",
      },
      {
        id: 105,
        name: "Bone & Joint Clinic",
        rating: 4.5,
        doctorCount: 15,
        location: "East Side",
      },
    ],
  },
  {
    id: 3,
    name: "Pediatrics",
    description: "Provides medical care for infants, children, and adolescents",
    hospitals: [
      {
        id: 102,
        name: "General Hospital",
        rating: 4.4,
        doctorCount: 14,
        location: "Uptown",
      },
      {
        id: 106,
        name: "Children's Hospital",
        rating: 4.9,
        doctorCount: 25,
        location: "North End",
      },
      {
        id: 107,
        name: "Family Care Center",
        rating: 4.6,
        doctorCount: 12,
        location: "South Side",
      },
    ],
  },
];

const SpecialtiesPage: React.FC = () => {
  const [expandedSpecialty, setExpandedSpecialty] = useState<number | null>(
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
  }, [searchTerm]);

  const toggleSpecialtyExpansion = (specialtyId: number) => {
    setExpandedSpecialty(
      expandedSpecialty === specialtyId ? null : specialtyId
    );
  };

  const navigateToHospital = (hospitalId: number) => {
    navigate(`/services/hospitals/${hospitalId}`);
  };

  const sortHospitals = (hospitals: Hospital[]) => {
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
                onClick={() => toggleSpecialtyExpansion(specialty.id)}
              >
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-green-800">
                    {specialty.name}
                  </h2>
                  <p className="text-green-600">{specialty.description}</p>
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