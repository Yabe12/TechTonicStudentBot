import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-gray-800 text-white w-64 h-screen p-4">
      {/* Company Logo and Name */}
      <div className="flex items-center mb-8">
        <img
          src="/path/to/logo.png" // Replace with your logo path
          alt="Company Logo"
          className="w-16 h-16 rounded-full"
        />
        <h1 className="text-xl font-bold ml-2">Company Name</h1>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1">
        <ul>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Students</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Members</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Settings</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Dashboard</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Attendance</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
