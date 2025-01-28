import React from 'react';

interface LogoutProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Logout: React.FC<LogoutProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] relative">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h2>
        <div className="flex justify-between">
          <button onClick={onConfirm} className="bg-red-500 text-white py-2 px-4 rounded">
            Yes
          </button>
          <button onClick={onClose} className="bg-gray-300 py-2 px-4 rounded">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
