import React from 'react';
import { FaBell, FaSearch, FaUser } from 'react-icons/fa';

const Header = ({ title }) => {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <FaBell className="text-gray-600" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">3</span>
          </button>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
            <FaUser />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700">Admin Usuario</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;