import React, { useState } from 'react';
import { FaBell, FaSearch, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Header = ({ title }) => {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  return (
    <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-20">
      <motion.h1 
        className="text-2xl font-bold text-gray-800"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h1>
      
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64 transition-all duration-200"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </motion.div>
        
        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative">
            <motion.button 
              className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowNotificationsMenu(!showNotificationsMenu)}
            >
              <FaBell className="text-gray-600" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white animate-pulse">3</span>
            </motion.button>
            
            {showNotificationsMenu && (
              <motion.div 
                className="absolute right-0 top-12 w-64 bg-white rounded-md shadow-lg z-30 overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-700">Notificaciones</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-700">Nuevo pedido recibido</p>
                    <p className="text-xs text-gray-500 mt-1">Mesa #5 - Hace 5 minutos</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-700">Stock bajo de ingredientes</p>
                    <p className="text-xs text-gray-500 mt-1">Arroz, Limones - Hace 1 hora</p>
                  </div>
                  <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium text-gray-700">Nueva reserva confirmada</p>
                    <p className="text-xs text-gray-500 mt-1">Mesa #2 - Hace 2 horas</p>
                  </div>
                </div>
                <button 
                  className="w-full px-4 py-2 text-sm text-primary-600 hover:bg-gray-50 border-t border-gray-100"
                  onClick={() => router.push('/alertas')}
                >
                  Ver todas las notificaciones
                </button>
              </motion.div>
            )}
          </div>
          
          {/* Settings */}
          <motion.button 
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push('/settings')}
          >
            <FaCog className="text-gray-600" />
          </motion.button>
        </div>
        
        {/* User Profile */}
        <div className="relative">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-md">
              <FaUser />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">Admin Usuario</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          </motion.div>
          
          {showProfileMenu && (
            <motion.div 
              className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg z-30 overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <button 
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                onClick={() => {
                  if (confirm('¿Está seguro que desea cerrar sesión?')) {
                    router.push('/login');
                  }
                }}
              >
                <FaSignOutAlt className="mr-2" /> Cerrar sesión
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;