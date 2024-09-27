import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
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
      <Link href="/contact">
        <button className="bg-black text-white py-2 px-4 rounded-full shadow-lg hover:bg-gray-800 focus:outline-none">
          Contact
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
