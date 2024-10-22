// import { useEffect, useState } from "react";
// import Navbar from "../Components/Navbar";
// import { Search, MapPin, Clock, Star } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../Redux/Store";
// import { apiClient } from "../Components/Axios";

// export default function HospitalsPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterOpenNow, setFilterOpenNow] = useState(false);
//   const [sortBy, setSortBy] = useState("distance");
//   const navigate = useNavigate();
//   const { hospitals } = useSelector((state: RootState) => state.hospitalData);

//   useEffect(() => {
//     const getHospitalData = async () => {
//       await apiClient
//         .get("/api/hospitals")
//         .then((result) => console.log(result))
//         .catch((err) => console.log(err));
//     };
//     getHospitalData();
//   }, []);

//   const filteredAndSortedHospitals = hospitals
//     .filter(
//       (hospital) =>
//         hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         (!filterOpenNow || hospital.isOpen)
//     )
//     .sort((a, b) => {
//       if (sortBy === "distance") return a.distance - b.distance;
//       if (sortBy === "rating") return b.rating - a.rating;
//       return 0;
//     });

//   return (
//     <div className="min-h-screen bg-green-50">
//       <Navbar />
//       <main className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-green-800 mb-6">Hospitals</h1>

//         <div className="mb-6 flex flex-wrap gap-4">
//           <div className="flex-grow">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search hospitals..."
//                 className="w-full p-2 pl-10 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-green-400" />
//             </div>
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               id="openNow"
//               className="mr-2"
//               checked={filterOpenNow}
//               onChange={(e) => setFilterOpenNow(e.target.checked)}
//             />
//             <label htmlFor="openNow" className="text-green-700">
//               Open Now
//             </label>
//           </div>
//           <div>
//             <select
//               className="p-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option value="distance">Sort by Distance</option>
//               <option value="rating">Sort by Rating</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredAndSortedHospitals.map((hospital) => (
//             <div
//               key={hospital.id}
//               className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//               onClick={() => navigate(`/services/hospitals/${hospital.id}`)}
//             >
//               <h2 className="text-xl font-semibold text-green-800 mb-2">
//                 {hospital.name}
//               </h2>
//               <div className="flex items-center text-green-600 mb-2">
//                 <MapPin className="h-4 w-4 mr-1" />
//                 <span>{hospital.distance.toFixed(1)} km away</span>
//               </div>
//               <div className="flex items-center text-green-600 mb-2">
//                 <Star className="h-4 w-4 mr-1" />
//                 <span>{hospital.rating.toFixed(1)} / 5.0</span>
//               </div>
//               <div className="flex items-center text-green-600">
//                 <Clock className="h-4 w-4 mr-1" />
//                 <span>{hospital.isOpen ? "Open Now" : "Closed"}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { apiClient } from "../Components/Axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Hospital,
  setHospitalData,
  WorkingHours,
} from "../Redux/HospitalsData";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Clock, Star } from "lucide-react";
import Navbar from "../Components/Navbar";
import { RootState } from "../Redux/Store";
import { FormInput } from "../Components/Common";

export default function HospitalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpenNow, setFilterOpenNow] = useState(false);
  const [sortBy, setSortBy] = useState("distance");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { hospitals = [] } = useSelector(
    (state: RootState) => state.hospitalData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getHospitalData = async () => {
      try {
        const result = await apiClient.get("/api/hospitals");
        dispatch(setHospitalData({ data: result.data.data }));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    getHospitalData();
  }, [dispatch]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
  };

  const isOpenNow = (workingHours: WorkingHours[]) => {
    const now = new Date();
    const currentDay = now.toLocaleString("en-US", { weekday: "long" });
    const currentTime = now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    const todayHours = workingHours.find((wh: any) => wh.day === currentDay);
    if (!todayHours || todayHours.is_holiday) return false;

    return (
      currentTime >= todayHours.opening_time &&
      currentTime <= todayHours.closing_time
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredAndSortedHospitals = hospitals
    .filter(
      (hospital: Hospital) =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filterOpenNow || isOpenNow(hospital.working_hours))
    )
    .sort((a: Hospital, b: Hospital) => {
      if (sortBy === "distance") {
        const distanceA = calculateDistance(
          0,
          0,
          a.latitude as number,
          a.longitude as number
        );
        const distanceB = calculateDistance(
          0,
          0,
          b.latitude as number,
          b.longitude as number
        );
        return distanceA - distanceB;
      }
      if (sortBy === "rating") {
        const ratingA = a.reviews.length
          ? a.reviews.reduce(
              (sum: any, review: any) => sum + review.rating,
              0
            ) / a.reviews.length
          : 0;
        const ratingB = b.reviews.length
          ? b.reviews.reduce(
              (sum: any, review: any) => sum + review.rating,
              0
            ) / b.reviews.length
          : 0;
        return ratingB - ratingA;
      }
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
              <FormInput
                type="text"
                placeholder="Search hospitals..."
                className="w-full pl-10"
                value={searchTerm}
                OnChange={(e: any) => setSearchTerm(e.target.value)}
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
          {filteredAndSortedHospitals.map((hospital: Hospital) => (
            <div
              key={hospital._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/services/hospitals/${hospital._id}`)}
            >
              <img
                src={
                  hospital.image.imageUrl ||
                  "/placeholder.svg?height=200&width=300"
                }
                alt={hospital.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                {hospital.name}
              </h2>
              <div className="flex items-center text-green-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{hospital.address}</span>
              </div>
              <div className="flex items-center text-green-600 mb-2">
                <Star className="h-4 w-4 mr-1" />
                <span>
                  {hospital?.reviews && hospital.reviews.length > 0
                    ? (hospital.reviews.reduce(
                        (sum, review) => sum + review.rating,
                        0
                      ) /
                        (hospital.reviews.length * 5)) *
                      5
                    : 0}
                  /5
                </span>
              </div>
              <div className="flex items-center text-green-600 mb-2">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  {isOpenNow(hospital.working_hours) ? "Open Now" : "Closed"}
                </span>
              </div>
              <div className="mt-2">
                <strong>Specialties:</strong>{" "}
                {hospital.specialties.map((s: any) => s.name).join(", ")}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
