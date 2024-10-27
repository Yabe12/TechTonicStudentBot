// Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/tech.jpg'; // Adjust the path as necessary
import { FaUsers, FaChartBar, FaHome, FaClipboardList } from 'react-icons/fa'; // Import the icons you want to use

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col bg-gray-800 text-white w-64 h-screen p-4">
      {/* Company Logo and Name */}
      <div className="flex items-center mb-8">
        <img
          src={img} // Logo path
          alt="Company Logo"
          className="w-16 h-16 rounded-full"
        />
        <h1 className="text-xl font-bold ml-2">TECHTONIC</h1>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 ">
        <ul>
          <li className="mb-4 ">
            <Link 
              to="/students" 
              className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <FaUsers className="mr-2" />
              Students
            </Link>
          </li>
          <li className="mb-4">
            <Link 
              to="/members" 
              className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <FaHome className="mr-2" />
              Members
            </Link>
          </li>
          <li className="mb-4">
            <Link 
              to="/dashboard" 
              className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              <FaChartBar className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link 
              to="/attendance" 
              className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
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
