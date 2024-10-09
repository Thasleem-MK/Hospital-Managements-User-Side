import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { ArrowLeft } from "lucide-react";
import Map from "../Components/Map";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Info,
  Review,
  Specialties,
  WorkingHours,
} from "../Components/HospitalDetailesComponents";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const HospitalDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 md:h-96">
          <img
            src="https://medicaldialogues.in/wp-content/uploads/2013/10/1.jpg"
            alt="City General Hospital"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <h1 className="absolute bottom-4 left-4 text-3xl md:text-4xl font-bold text-white">
            City General Hospital
          </h1>
          <button
            onClick={() => navigate("/services/hospitals")}
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

          {activeTab === "info" && <Info />}

          {activeTab === "specialties" && <Specialties />}

          {activeTab === "hours" && <WorkingHours />}

          {activeTab === "location" && <Map />}

          {activeTab === "reviews" && <Review />}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
