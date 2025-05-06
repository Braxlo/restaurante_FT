import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaExclamationTriangle, FaBell, FaFilter, FaCalendarAlt } from 'react-icons/fa';

const Alertas = () => {
  // Datos simulados para las alertas
  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      type: 'stock', 
      message: 'Arroz por debajo del stock mínimo (5kg)', 
      severity: 'high',
      date: '2023-11-15 10:30',
      read: false
    },
    { 
      id: 2, 
      type: 'stock', 
      message: 'Limones por debajo del stock mínimo (1kg)', 
      severity: 'high',
      date: '2023-11-15 11:45',
      read: false
    },
    { 
      id: 3, 
      type: 'stock', 
      message: 'Aceite de oliva por debajo del stock mínimo (2 botellas)', 
      severity: 'medium',
      date: '2023-11-14 09:20',
      read: true
    },
    { 
      id: 4, 
      type: 'waste', 
      message: 'Alto desperdicio de verduras detectado', 
      severity: 'medium',
      date: '2023-11-14 14:15',
      read: true
    },
    { 
      id: 5, 
      type: 'prediction', 
      message: 'Se prevé alta demanda de ceviches para el fin de semana', 
      severity: 'low',
      date: '2023-11-13 16:50',
      read: true
    },
  ]);

  // Estado para controlar el filtro de alertas
  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Función para marcar alerta como leída
  const markAsRead = (id) => {
    setAlerts(alerts.map(alert => {
      if (alert.id === id) {
        return { ...alert, read: true };
      }
      return alert;
    }));
    
    // Animación de feedback
    const alertElement = document.getElementById(`alert-${id}`);
    if (alertElement) {
      alertElement.classList.add('animate-pulse', 'ring-2', 'ring-blue-500');
      setTimeout(() => {
        alertElement.classList.remove('animate-pulse', 'ring-2', 'ring-blue-500');
      }, 300);
    }
  };

  // Filtrar alertas según el filtro seleccionado
  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !alert.read;
    
    const matchesSeverity = filter === 'all' || alert.severity === filter;
    const matchesCategory = categoryFilter === 'all' || alert.type === categoryFilter;
    const matchesDate = dateFilter === 'all' || 
      (dateFilter === 'today' && new Date(alert.date).toDateString() === new Date().toDateString()) ||
      (dateFilter === 'week' && new Date(alert.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    
    return matchesSeverity && matchesCategory && matchesDate;
  });

  return (
    <Layout title="Alertas - Historial">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Historial de Alertas</h1>
        
        <div className="flex space-x-4">
          <div className="relative group">
            <select 
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md hover:border-primary-300 group-hover:bg-gray-50"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Todas</option>
              <option value="unread">No leídas</option>
              <option value="high">Alta prioridad</option>
              <option value="medium">Media prioridad</option>
              <option value="low">Baja prioridad</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 group-hover:text-primary-500 transition-colors duration-200">
              <FaFilter className="h-4 w-4" />
            </div>
          </div>
          
          <div className="relative group">
            <select 
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md hover:border-primary-300 group-hover:bg-gray-50"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Todas las categorías</option>
              <option value="stock">Inventario</option>
              <option value="waste">Desperdicio</option>
              <option value="prediction">Predicción</option>
            </select>
          </div>
          
          <div className="relative group">
            <select 
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md hover:border-primary-300 group-hover:bg-gray-50"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">Todo el tiempo</option>
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 group-hover:text-primary-500 transition-colors duration-200">
              <FaCalendarAlt className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredAlerts.map(alert => (
            <div 
              key={alert.id} 
              id={`alert-${alert.id}`}
              className={`p-4 hover:bg-gray-50 transition-all duration-200 ease-out ${!alert.read ? 'bg-blue-50' : ''} cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md active:shadow-sm`}
              onClick={() => markAsRead(alert.id)}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 p-2 rounded-full ${alert.severity === 'high' ? 'bg-red-100 text-red-500' : alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-500' : 'bg-blue-100 text-blue-500'}`}>
                  <FaExclamationTriangle className="h-5 w-5" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.date}</p>
                  </div>
                  <div className="mt-1 flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${alert.severity === 'high' ? 'bg-red-100 text-red-800' : alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                      {alert.severity === 'high' ? 'Alta' : alert.severity === 'medium' ? 'Media' : 'Baja'} prioridad
                    </span>
                    <span className="ml-2 text-xs text-gray-500">{alert.type === 'stock' ? 'Inventario' : alert.type === 'waste' ? 'Desperdicio' : 'Predicción'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Alertas;