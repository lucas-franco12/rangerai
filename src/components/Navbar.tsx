import React, { useState } from 'react';
import Link from 'next/link';
import AuthModal from './AuthModal';


const Navbar: React.FC = () => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="flex justify-between items-center w-[75vw] mx-auto px-10 z-50">
      <Link href="/">
        <button className="bg-black text-white py-2 px-4 rounded-full shadow-lg hover:bg-gray-800 focus:outline-none">
          Home
        </button>
      </Link>
      <div className="flex-1 flex justify-center">
        <Link href="/plan">
          <button className="bg-black text-white py-2 px-4 rounded-full shadow-lg hover:bg-gray-800 focus:outline-none">
            Plan My Next Trip
          </button>
        </Link>
      </div>
      <button onClick={() => setAuthModalOpen(true)} className="bg-black text-white py-2 px-4 rounded-full shadow-lg hover:bg-gray-800 focus:outline-none">
        Sign In
      </button>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default Navbar;
