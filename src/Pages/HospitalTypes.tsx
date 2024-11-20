import React from "react";
import { Header } from "../Components/Common";
import { Link, useNavigate } from "react-router-dom";

interface HospitalType {
  title: string;
  image: string;
}

const HospitalTypeCard: React.FC<HospitalType> = ({ title, image }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-2 flex flex-col items-center justify-center aspect-square">
      <div className="w-28 h-28 mb-2">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <span className="text-base font-medium text-green-800 text-center">
        {title}
      </span>
    </div>
  </div>
);

const HospitalTypeCards: React.FC = () => {
  const navigate = useNavigate();
  const hospitalTypes: HospitalType[] = [
    {
      title: "Allopathy",
      image:
        "https://th.bing.com/th/id/OIP.47Ra6GUykfLRORz713KmpwHaE6?w=232&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      title: "Homeopathy",
      image:
        "https://th.bing.com/th/id/OIP.mHSxohdwswyJLGlqtk3wfwHaE7?rs=1&pid=ImgDetMain",
    },
    {
      title: "Ayurveda",
      image:
        "https://th.bing.com/th/id/OIP.naR0FBavTXRS08FGcT4mGAHaEn?rs=1&pid=ImgDetMain",
    },
    {
      title: "Unani",
      image:
        "https://th.bing.com/th/id/R.6f6ce2d6663331e471b4f4a13ad67640?rik=wMqEC%2bmw38ScAg&riu=http%3a%2f%2funanihakeem.in%2fimages%2fbg%2fbg4.jpg&ehk=w3pjl0aV%2fqER9efY0FgzhhzzP7J6cVx%2fJIBm8PXRJts%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      title: "Acupuncture",
      image:
        "https://th.bing.com/th/id/OIP.eVNH_oc408tN7zftvmyqXwHaE7?w=281&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      title: "Other",
      image:
        "https://th.bing.com/th/id/OIP.4hOrUMJve5Es4c3Uvq7evAHaHr?w=2131&h=2209&rs=1&pid=ImgDetMain",
    },
  ];

  return (
    <div className="bg-green-50 py-4 px-2 sm:py-6 sm:px-4 h-screen">
      <div className="max-w-7xl mx-auto">
        <Header onBackClick={() => navigate("/")} title="Hospiatl Types" />
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-5">
          {hospitalTypes.map((type, index) => (
            <Link to={`/services/hospitals?type=${type.title}`}>
              <HospitalTypeCard
                key={index}
                title={type.title}
                image={type.image}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalTypeCards;