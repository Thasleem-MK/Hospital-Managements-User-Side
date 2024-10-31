import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import Map from "../Components/Map";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Info,
  ReviewComponent,
  Specialties,
  WorkingHours,
} from "../Components/HospitalDetailesComponents";
import { RootState } from "../Redux/Store";
import { Hospital } from "../Redux/HospitalsData";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";

const HospitalDetails: React.FC = () => {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();
  const { hospitals } = useSelector((state: RootState) => state.hospitalData);

  const hospital = hospitals.find((hospital) => hospital._id === id);

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 md:h-96">
          <img
            src={hospital?.image?.imageUrl || ""}
            alt={hospital?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <h1 className="absolute bottom-4 left-4 text-3xl md:text-4xl font-bold text-white">
            {hospital?.name}
          </h1>
          <button
            onClick={() =>
              navigate(`/services/hospitals?type=${hospital?.type}`)
            }
            className="absolute top-4 left-4 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition-all duration-200"
          >
            <ArrowLeft className="h-6 w-6 text-green-600" />
          </button>
          
        </div>

        <div className="p-6">
          <div className="flex mb-6 border-b border-green-200 overflow-x-auto">
            <Button
              activeTab={activeTab}
              content="Information"
              purpose="info"
              OnClick={() => setActiveTab("info")}
            />
            <Button
              activeTab={activeTab}
              content="Specialties"
              purpose="specialties"
              OnClick={() => setActiveTab("specialties")}
            />
            <Button
              activeTab={activeTab}
              purpose="hours"
              content="Hours"
              OnClick={() => setActiveTab("hours")}
            />
            <Button
              activeTab={activeTab}
              purpose="location"
              content="Location"
              OnClick={() => setActiveTab("location")}
            />
            <Button
              activeTab={activeTab}
              purpose="reviews"
              content="Reviews"
              OnClick={() => setActiveTab("reviews")}
            />
          </div>

          {activeTab === "info" && <Info hospital={hospital as Hospital} />}

          {activeTab === "specialties" && (
            <Specialties hospital={hospital as Hospital} />
          )}

          {activeTab === "hours" && (
            <WorkingHours hospital={hospital as Hospital} />
          )}

          {activeTab === "location" && <Map hospital={hospital as Hospital} />}

          {activeTab === "reviews" && (
            <ReviewComponent hospital={hospital as Hospital} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
