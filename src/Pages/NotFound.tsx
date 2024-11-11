import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="h-6 w-6" />
    </button>
  );
};

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <BackButton onClick={handleGoBack} />
            <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
              Page Not Found
            </h1>
            <div className="w-10" aria-hidden="true"></div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Search className="h-24 w-24 text-green-500" />
            <p className="text-lg text-center text-gray-600">
              Oops! The page you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}