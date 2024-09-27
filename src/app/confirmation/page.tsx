'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiCheckCircle } from 'react-icons/fi'; // Importing the checkmark icon

const ConfirmationPage: React.FC = () => {
  const router = useRouter();

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-800">
      <div className="flex flex-col items-center bg-gray-700 p-10 rounded-lg shadow-lg">
        {/* Checkmark in circle using React Icons */}
        <FiCheckCircle className="text-green-800" size={96} />

        {/* Success message */}
        <h1 className="mt-6 text-2xl font-bold text-gray-300">Trip Planned Successfully!</h1>
        <p className="text-gray-100 mt-2 text-center">
          Your trip has been created. You can review and manage it from your dashboard.
        </p>

        {/* Button to go to Dashboard */}
        <button
          onClick={goToDashboard}
          className="mt-6 bg-green-800 hover:bg-green-700 text-gray-100 py-2 px-6 rounded-full text-lg shadow-lg transition duration-300 ease-in-out"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;

