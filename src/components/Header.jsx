// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-blue-600">Health Connect</h1>
      <nav className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/hospitals" className="text-gray-700 hover:text-blue-600">Hospitals</Link>
        <Link to="/appointments" className="text-gray-700 hover:text-blue-600">Appointments</Link>
        <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login Portal</Link>
      </nav>
    </header>
  );
};

export default Header;
