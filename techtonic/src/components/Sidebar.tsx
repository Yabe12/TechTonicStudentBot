// Sidebar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/tech.jpg'; // Adjust the path as necessary
import { FaUsers, FaChartBar, FaHome, FaClipboardList, FaBars, FaTimes } from 'react-icons/fa'; // Import the icons you want to use

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex flex-col bg-gray-800 text-white w-64 h-screen p-4 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-64'} md:translate-x-0`}>
      {/* Company Logo and Name */}
      <div className="flex items-center mb-8">
        <img
          src={img} // Logo path
          alt="Company Logo"
          className="w-16 h-16 rounded-full"
        />
        <h1 className="text-xl font-bold ml-2">TECHTONIC</h1>
        <button onClick={toggleSidebar} className="ml-auto md:hidden">
          {isOpen ? <FaTimes /> : <FaBars />} {/* Hamburger icon */}
        </button>
      </div>
      
      {/* Navigation Links */}
      <nav className={`flex-1 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <ul>
          <li className="mb-4">
            <Link 
              to="/students" 
              className="flex items-center justify-start bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <FaUsers className="mr-2" />
              Students
            </Link>
          </li>
          <li className="mb-4">
            <Link 
              to="/members" 
              className="flex items-center justify-start bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <FaHome className="mr-2" />
              Members
            </Link>
          </li>
          <li className="mb-4">
            <Link 
              to="/dashboard" 
              className="flex items-center justify-start bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <FaChartBar className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link 
              to="/attendance" 
              className="flex items-center justify-start bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <FaClipboardList className="mr-2" />
              Attendance
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
