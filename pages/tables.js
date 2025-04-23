import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaCircle, FaEye, FaHistory, FaUtensils } from 'react-icons/fa';

const Tables = () => {
  // Estado para controlar qué mesa está seleccionada para ver detalles
  const [selectedTable, setSelectedTable] = useState(null);

  // Datos simulados de mesas
  const tables = [
    { id: 1, number: 1, status: 'free', capacity: 4, lastOrder: null },
    { id: 2, number: 2, status: 'occupied', capacity: 2, lastOrder: '12:30 PM', totalAmount: 'S/. 85.50', items: 3 },
    { id: 3, number: 3, status: 'occupied', capacity: 6, lastOrder: '1:15 PM', totalAmount: 'S/. 145.00', items: 8 },
    { id: 4, number: 4, status: 'reserved', capacity: 4, lastOrder: null, reservationTime: '3:00 PM' },
    { id: 5, number: 5, status: 'attended', capacity: 4, lastOrder: '12:45 PM', totalAmount: 'S/. 120.00', items: 5 },
    { id: 6, number: 6, status: 'free', capacity: 2, lastOrder: null },
    { id: 7, number: 7, status: 'occupied', capacity: 8, lastOrder: '1:30 PM', totalAmount: 'S/. 320.00', items: 12 },
    { id: 8, number: 8, status: 'free', capacity: 4, lastOrder: null },
    { id: 9, number: 9, status: 'attended', capacity: 2, lastOrder: '1:00 PM', totalAmount: 'S/. 65.00', items: 2 },
    { id: 10, number: 10, status: 'reserved', capacity: 6, lastOrder: null, reservationTime: '7:30 PM' },
    { id: 11, number: 11, status: 'free', capacity: 4, lastOrder: null },
    { id: 12, number: 12, status: 'occupied', capacity: 4, lastOrder: '2:00 PM', totalAmount: 'S/. 175.00', items: 7 },
    { id: 13, number: 13, status: 'free', capacity: 2, lastOrder: null },
    { id: 14, number: 14, status: 'free', capacity: 2, lastOrder: null },
    { id: 15, number: 15, status: 'occupied', capacity: 8, lastOrder: '1:45 PM', totalAmount: 'S/. 280.00', items: 10 },
    { id: 16, number: 16, status: 'attended', capacity: 4, lastOrder: '12:15 PM', totalAmount: 'S/. 95.00', items: 4 },
    { id: 17, number: 17, status: 'free', capacity: 4, lastOrder: null },
    { id: 18, number: 18, status: 'reserved', capacity: 6, lastOrder: null, reservationTime: '8:00 PM' },
    { id: 19, number: 19, status: 'free', capacity: 2, lastOrder: null },
    { id: 20, number: 20, status: 'free', capacity: 4, lastOrder: null },
  ];

  // Datos simulados del historial de pedidos para la mesa seleccionada
  const orderHistory = [
    {
      id: 1,
      tableNumber: 3,
      date: '2023-10-25',
      time: '1:15 PM',
      items: [
        { name: 'Lomo Saltado', quantity: 2, price: 'S/. 35.00', total: 'S/. 70.00' },
        { name: 'Ceviche', quantity: 1, price: 'S/. 40.00', total: 'S/. 40.00' },
        { name: 'Chicha Morada', quantity: 3, price: 'S/. 8.00', total: 'S/. 24.00' },
        { name: 'Arroz con Mariscos', quantity: 1, price: 'S/. 45.00', total: 'S/. 45.00' },
      ],
      total: 'S/. 179.00',
      status: 'En proceso',
    },
    {
      id: 2,
      tableNumber: 3,
      date: '2023-10-24',
      time: '7:30 PM',
      items: [
        { name: 'Ají de Gallina', quantity: 2, price: 'S/. 30.00', total: 'S/. 60.00' },
        { name: 'Causa Rellena', quantity: 1, price: 'S/. 25.00', total: 'S/. 25.00' },
        { name: 'Inca Kola', quantity: 2, price: 'S/. 7.00', total: 'S/. 14.00' },
      ],
      total: 'S/. 99.00',
      status: 'Completado',
    },
    {
      id: 3,
      tableNumber: 3,
      date: '2023-10-22',
      time: '1:00 PM',
      items: [
        { name: 'Ceviche', quantity: 3, price: 'S/. 40.00', total: 'S/. 120.00' },
        { name: 'Chicha Morada', quantity: 3, price: 'S/. 8.00', total: 'S/. 24.00' },
      ],
      total: 'S/. 144.00',
      status: 'Completado',
    },
  ];

  // Función para obtener el color según el estado de la mesa
  const getStatusColor = (status) => {
    switch (status) {
      case 'free': return 'status-free';
      case 'occupied': return 'status-occupied';
      case 'reserved': return 'status-reserved';
      case 'attended': return 'status-attended';
      default: return 'bg-gray-500';
    }
  };

  // Función para obtener el texto según el estado de la mesa
  const getStatusText = (status) => {
    switch (status) {
      case 'free': return 'Libre';
      case 'occupied': return 'Ocupada';
      case 'reserved': return 'Reservada';
      case 'attended': return 'Atendida';
      default: return 'Desconocido';
    }
  };

  return (
    <Layout title="Gestión de Mesas">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mapa de mesas */}
        <div className="lg:w-2/3">
          <div className="dashboard-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Mapa de Mesas</h2>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full status-free mr-2"></div>
                  <span className="text-sm text-gray-600">Libre</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full status-occupied mr-2"></div>
                  <span className="text-sm text-gray-600">Ocupada</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full status-reserved mr-2"></div>
                  <span className="text-sm text-gray-600">Reservada</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full status-attended mr-2"></div>
                  <span className="text-sm text-gray-600">Atendida</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tables.map((table) => (
                <div 
                  key={table.id} 
                  className={`relative p-4 rounded-lg border-2 border-gray-200 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${selectedTable === table.id ? 'ring-2 ring-primary-500' : 'hover:border-primary-300'}`}
                  onClick={() => setSelectedTable(table.id)}
                >
                  <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getStatusColor(table.status)}`}></div>
                  <div className="text-3xl font-bold text-gray-700 mb-1">{table.number}</div>
                  <div className="text-sm text-gray-500 mb-1">{table.capacity} personas</div>
                  <div className="text-xs font-medium text-gray-600">{getStatusText(table.status)}</div>
                  {table.lastOrder && (
                    <div className="text-xs text-gray-500 mt-1">Última orden: {table.lastOrder}</div>
                  )}
                  {table.reservationTime && (
                    <div className="text-xs text-gray-500 mt-1">Reserva: {table.reservationTime}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detalles de la mesa seleccionada */}
        <div className="lg:w-1/3">
          <div className="dashboard-card h-full">
            {selectedTable ? (
              <div>
                {/* Información de la mesa */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Mesa {tables.find(t => t.id === selectedTable)?.number}</h2>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(tables.find(t => t.id === selectedTable)?.status)}`}>
                      {getStatusText(tables.find(t => t.id === selectedTable)?.status)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Capacidad</div>
                      <div className="text-lg font-medium">{tables.find(t => t.id === selectedTable)?.capacity} personas</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Estado</div>
                      <div className="text-lg font-medium">{getStatusText(tables.find(t => t.id === selectedTable)?.status)}</div>
                    </div>
                  </div>

                  {/* Acciones para la mesa */}
                  <div className="flex space-x-2 mb-6">
                    <button className="btn btn-primary flex items-center">
                      <FaUtensils className="mr-2" /> Tomar Orden
                    </button>
                    <button className="btn btn-secondary flex items-center">
                      <FaHistory className="mr-2" /> Ver Historial
                    </button>
                  </div>
                </div>

                {/* Orden actual o historial */}
                {tables.find(t => t.id === selectedTable)?.status === 'occupied' || tables.find(t => t.id === selectedTable)?.status === 'attended' ? (
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Orden Actual</h3>
                    <div className="space-y-2 mb-4">
                      {orderHistory[0].items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500">Cantidad: {item.quantity}</div>
                          </div>
                          <div className="text-right">
                            <div>{item.total}</div>
                            <div className="text-sm text-gray-500">{item.price} c/u</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <div>Total:</div>
                      <div>{orderHistory[0].total}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <FaEye className="text-5xl mb-4" />
                    <p className="text-center">Selecciona una mesa ocupada o atendida para ver los detalles de la orden</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FaEye className="text-5xl mb-4" />
                <p className="text-center">Selecciona una mesa para ver sus detalles</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Historial de pedidos */}
      {selectedTable && (
        <div className="mt-6">
          <div className="dashboard-card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Historial de Pedidos - Mesa {tables.find(t => t.id === selectedTable)?.number}</h2>
            
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th className="table-header-cell">Fecha</th>
                    <th className="table-header-cell">Hora</th>
                    <th className="table-header-cell">Items</th>
                    <th className="table-header-cell">Total</th>
                    <th className="table-header-cell">Estado</th>
                    <th className="table-header-cell">Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {orderHistory.map((order) => (
                    <tr key={order.id} className="table-row">
                      <td className="table-cell">{order.date}</td>
                      <td className="table-cell">{order.time}</td>
                      <td className="table-cell">{order.items.length} platos</td>
                      <td className="table-cell font-medium">{order.total}</td>
                      <td className="table-cell">
                        <span className={`badge ${order.status === 'Completado' ? 'badge-success' : 'badge-info'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="table-cell">
                        <button className="text-primary-500 hover:text-primary-700">
                          <FaEye className="inline mr-1" /> Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Tables;