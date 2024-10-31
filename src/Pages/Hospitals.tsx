import { useEffect, useState } from "react";
import { apiClient } from "../Components/Axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Hospital,
  setHospitalData,
  WorkingHours,
} from "../Redux/HospitalsData";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Clock, Star, Phone } from "lucide-react";
import Navbar from "../Components/Navbar";
import { RootState } from "../Redux/Store";
import { FormInput } from "../Components/Common";

export default function HospitalsPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const HospitasType = queryParams.get("type") as string;
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
    const istTime = new Date(now.getTime());

    const currentDay = istTime.toLocaleString("en-US", { weekday: "long" });
    const currentTime = istTime.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    const todayHours = workingHours.find((wh: any) => wh.day === currentDay);

    if (
      !todayHours ||
      todayHours.is_holiday ||
      !todayHours.opening_time ||
      !todayHours.closing_time
    ) {
      return false;
    }

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
        hospital?.type?.toLowerCase() == HospitasType?.toLowerCase() &&
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
                  hospital?.image?.imageUrl ||
                  "/placeholder.svg?height=200&width=300"
                }
                alt={hospital.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                {hospital.name}
              </h2>

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
                  {isOpenNow(hospital.working_hours) ? (
                    <em>Open now</em>
                  ) : (
                    "Closed"
                  )}
                </span>
              </div>
              <div className="flex items-center text-green-600 mb-2">
                {/* <MapPin className="h-4 w-4 mr-1" /> */}
                <Phone className="h-4 w-4 mr-1" />
                <span>
                  <em>{hospital.phone}</em>
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
