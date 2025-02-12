import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
      <p className="text-center text-sm text-gray-600">Загрузка...</p>
    </div>
  );
};

export default Loader;
