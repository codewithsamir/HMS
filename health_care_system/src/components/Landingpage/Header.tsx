import Link from 'next/link';
import React, { useState } from 'react';
import { FaStethoscope, FaUser, FaUserMd, FaUserShield, FaBars, FaTimes, FaHome } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex   items-center gap-2">
          <FaStethoscope className="text-blue-600 w-8 h-8" />
          <span className="text-2xl font-bold text-gray-900">HealthConnect</span>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
        
        <FaBars className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`md:flex space-x-6 ${isOpen ? 'fixed right-0 top-0 bg-gradient-to-r from-blue-200 to-blue-700 bottom-0 px-6 text-white z-40 ' : 'hidden'} md:block text-gray-700`}>

        <div className="md:hidden  flex justify-end py-4">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
        
          <FaTimes className=" text-white text-2xl" />
          </button>
        </div>

       
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <Link href="/" className="flex items-center gap-2  hover:underline transition ">
              <FaHome className="text-blue-600 w-5 h-5" />
              <span className="font-medium ">Home</span>
            </Link>
            <Link href="/Login/user" className="flex items-center gap-2  hover:underline transition ">
              <FaUser className="text-blue-600 w-5 h-5" />
              <span className="font-medium ">User Login</span>
            </Link>
            <Link href="/Login/doctor" className="flex items-center gap-2  hover:underline transition">
              <FaUserMd className="text-green-600 w-5 h-5" />
              <span className="font-medium">Doctor Login</span>
            </Link>
            <Link href="/Login/admin" className="flex items-center gap-2  hover:underline transition">
              <FaUserShield className="text-red-600 w-5 h-5" />
              <span className="font-medium">Admin Login</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-0" onClick={toggleMenu}></div>
      )}
    </header>
  );
};

export default Header;