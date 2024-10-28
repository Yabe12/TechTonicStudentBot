import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/tech.jpg'; // Adjust the path as necessary
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={img} // Logo path
            alt="Company Logo"
            className="w-10 h-10 rounded-full mr-2"
          />
          <h1 className="text-lg font-bold">TECHTONIC</h1>
        </div>

        {/* Nav Links for larger screens */}
        <div className="hidden md:flex space-x-8">
          <Link to="/students" className="hover:text-blue-400 transition duration-200">
            Students
          </Link>
          <Link to="/members" className="hover:text-blue-400 transition duration-200">
            Members
          </Link>
          <Link to="/dashboard" className="hover:text-blue-400 transition duration-200">
            Dashboard
          </Link>
          <Link to="/attendance" className="hover:text-blue-400 transition duration-200">
            Attendance
          </Link>
        </div>

        {/* Toggle Button for mobile screens */}
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Dropdown Menu for mobile screens */}
      {isMenuOpen && (
        <div className="bg-gray-700 text-white md:hidden shadow-lg rounded-lg mx-4 my-2 p-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                to="/students"
                className="hover:text-blue-400 transition duration-200"
                onClick={toggleMenu}
              >
                Students
              </Link>
            </li>
            <li>
              <Link
                to="/members"
                className="hover:text-blue-400 transition duration-200"
                onClick={toggleMenu}
              >
                Members
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-blue-400 transition duration-200"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/attendance"
                className="hover:text-blue-400 transition duration-200"
                onClick={toggleMenu}
              >
                Attendance
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
