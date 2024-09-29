import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-800">
      <div className="flex flex-col items-center p-10 rounded-lg shadow-lg">
        <p className="text-gray-100 mb-2 text-center"> Generating trip. This will only take a few seconds.</p>
        <div className="w-16 h-16 border-4 border-green-800 border-solid border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;