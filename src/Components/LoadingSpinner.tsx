const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mb-4">
          <div className="absolute inset-0 border-8 border-green-200 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 border-t-8 border-green-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 bg-white rounded-full shadow-inner"></div>
        </div>
        <p className="text-xl font-semibold text-green-600 animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
