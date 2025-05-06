import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaClipboardList, FaPlus, FaSearch, FaFilter, FaEdit, FaTrash } from 'react-icons/fa';

const Pedidos = () => {
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      mesa: 'Mesa 5', 
      cliente: 'Juan Pérez', 
      items: ['Lomo Saltado', 'Inca Kola'], 
      total: 45.00, 
      estado: 'En preparación', 
      hora: '12:30 PM',
      tiempoTranscurrido: '0 min',
      prioridad: 'normal'
    },
    { 
      id: 2, 
      mesa: 'Mesa 2', 
      cliente: 'María Gómez', 
      items: ['Ceviche', 'Chicha Morada'], 
      total: 38.00, 
      estado: 'Listo para servir', 
      hora: '12:45 PM',
      tiempoTranscurrido: '15 min',
      prioridad: 'alta'
    },
    { 
      id: 3, 
      mesa: 'Mesa 8', 
      cliente: 'Carlos Ruiz', 
      items: ['Ají de Gallina', 'Agua Mineral'], 
      total: 32.00, 
      estado: 'Entregado', 
      hora: '1:15 PM',
      tiempoTranscurrido: '45 min',
      prioridad: 'baja'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.cliente.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.mesa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.estado === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, estado: newStatus } : order
    ));
  };

  return (
    <Layout title="Pedidos - Vista Cocina">
      <div className="grid grid-cols-1 gap-6">
        {/* Panel de filtros optimizado para cocina */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-100 p-4 rounded-lg">
          <div className="flex flex-wrap gap-3 w-full">
            <button 
              className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilterStatus('all')}
            >
              Todos
            </button>
            <button 
              className={`btn ${filterStatus === 'En preparación' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilterStatus('En preparación')}
            >
              En Cocina
            </button>
            <button 
              className={`btn ${filterStatus === 'Listo para servir' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilterStatus('Listo para servir')}
            >
              Listos
            </button>
            <div className="relative flex-1 min-w-[200px]">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por mesa..."
                className="input pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Listado de pedidos */}
        <div className="dashboard-card">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map(order => (
              <div 
                key={order.id} 
                className={`p-6 rounded-lg shadow-md border-l-4 ${order.prioridad === 'alta' ? 'border-red-500 bg-red-50' : order.prioridad === 'baja' ? 'border-gray-300' : 'border-yellow-500'} transition-all hover:shadow-lg`}
              >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{order.mesa}</h3>
                        <p className="text-sm text-gray-600">{order.cliente}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                            {order.tiempoTranscurrido}
                          </span>
                          {order.prioridad === 'alta' && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                              Urgente
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mb-1 ${order.estado === 'En preparación' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {order.estado}
                        </span>
                        <span className="font-bold">S/. {order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4 border-t pt-3">
                      <h4 className="text-sm font-medium mb-2">Items:</h4>
                      <ul className="space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index} className="text-sm">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between space-x-2">
                      <button 
                        className="btn btn-sm btn-primary flex-1"
                        onClick={() => handleStatusChange(order.id, 'Listo para servir')}
                        disabled={order.estado === 'Listo para servir'}
                      >
                        Listo
                      </button>
                      <button 
                        className="btn btn-sm btn-secondary flex-1"
                        onClick={() => handleStatusChange(order.id, 'Entregado')}
                        disabled={order.estado === 'Entregado'}
                      >
                        Entregar
                      </button>
                    </div>
                  </div>
                ))}
              
          </div>
        </div>
      </div>

      {/* Modal para nuevo pedido */}
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Nuevo Pedido</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowNewOrderModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mesa</label>
                <select className="select w-full">
                  {Array.from({ length: 20 }, (_, i) => (
                    <option key={i+1} value={`Mesa ${i+1}`}>Mesa {i+1}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <input type="text" className="input w-full" placeholder="Nombre del cliente" />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Items del Menú</label>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex-1 mr-4">
                    <select className="select w-full">
                      <option>Seleccionar item del menú</option>
                      <option>Lomo Saltado</option>
                      <option>Ceviche</option>
                      <option>Ají de Gallina</option>
                      <option>Arroz con Mariscos</option>
                      <option>Inca Kola</option>
                      <option>Chicha Morada</option>
                    </select>
                  </div>
                  <button className="btn btn-primary">
                    <FaPlus /> Agregar
                  </button>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-gray-500 text-sm">No hay items agregados aún</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowNewOrderModal(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary">
                Guardar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Pedidos;