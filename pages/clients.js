import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { FaCircle, FaEye, FaHistory, FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Clients = () => {
  // Animaciones CSS mejoradas
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes modalIn { from { transform: scale(0.95) translateY(20px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
      @keyframes buttonPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      .animate-fadeIn { animation: fadeIn 0.3s ease forwards; }
      .animate-modalIn { animation: modalIn 0.3s ease forwards; }
      .btn-interactive {
        transition: all 0.2s ease;
        transform-origin: center;
      }
      .btn-interactive:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }
      .btn-interactive:active {
        animation: buttonPulse 0.2s ease;
      }
      .table-row {
        transition: all 0.2s ease;
      }
      .table-row:hover {
        background-color: #f8fafc !important;
        transform: translateX(4px);
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  // Estado para los clientes
  const [clients, setClients] = useState([
    { id: 1, name: 'Juan Pérez', phone: '999888777', email: 'juan@example.com', visits: 5, lastVisit: '2023-10-20' },
    { id: 2, name: 'María Gómez', phone: '999111222', email: 'maria@example.com', visits: 3, lastVisit: '2023-10-18' },
    { id: 3, name: 'Carlos Ruiz', phone: '999333444', email: 'carlos@example.com', visits: 7, lastVisit: '2023-10-15' },
    { id: 4, name: 'Ana López', phone: '999555666', email: 'ana@example.com', visits: 2, lastVisit: '2023-10-10' },
  ]);

  // Estado para el cliente seleccionado
  const [selectedClient, setSelectedClient] = useState(null);
  
  // Estado para el modal de nuevo/editar cliente
  const [showClientModal, setShowClientModal] = useState(false);
  
  // Estado para el modal de historial
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
  // Estado para el modal de confirmación de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <Layout title="Gestión de Clientes">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <button 
            className="btn btn-primary flex items-center btn-interactive transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            onClick={() => {
              setSelectedClient(null);
              setShowClientModal(true);
            }}
          >
            <FaUserPlus className="mr-2 transition-transform duration-200 group-hover:rotate-12" /> 
            <span className="group-hover:underline">Nuevo Cliente</span>
          </button>
        </div>

        {/* Tabla de clientes */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Visita</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map(client => (
                <tr key={client.id} className="table-row hover:bg-gray-50 group">
                  <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.visits}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700 transition-all duration-200 transform hover:scale-110 active:scale-95 group-hover:text-blue-600"
                      onClick={() => {
                        setSelectedClient(client);
                        setShowClientModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700 transition-all duration-200 transform hover:scale-110 active:scale-95 group-hover:text-red-600"
                      onClick={() => {
                        setSelectedClient(client);
                        setShowDeleteModal(true);
                      }}
                    >
                      <FaTrash />
                    </button>
                    <button 
                      className="text-green-500 hover:text-green-700 transition-all duration-200 transform hover:scale-110 active:scale-95 group-hover:text-green-600"
                      onClick={() => {
                        setSelectedClient(client);
                        setShowHistoryModal(true);
                      }}
                    >
                      <FaHistory />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal para nuevo/editar cliente */}
        {showClientModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-modalIn">
              <h2 className="text-xl font-bold mb-4">
                {selectedClient ? 'Editar Cliente' : 'Nuevo Cliente'}
              </h2>
              <button 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                onClick={() => setShowClientModal(false)}
              >
                <FaTimes />
              </button>
              <form onSubmit={(e) => {
                  e.preventDefault();
                  // Lógica para guardar cliente
                  setShowClientModal(false);
                }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                      defaultValue={selectedClient?.name || ''}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                      defaultValue={selectedClient?.phone || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-2 border rounded transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                      defaultValue={selectedClient?.email || ''}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <button 
                    type="button" 
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200 transform hover:scale-105 active:scale-95"
                    onClick={() => setShowClientModal(false)}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal para historial de cliente */}
        {showHistoryModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">Historial de {selectedClient.name}</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-2">Total de visitas: {selectedClient.visits}</p>
                <p className="text-sm text-gray-500 mb-4">Última visita: {selectedClient.lastVisit}</p>
                
                <div className="space-y-4">
                  <div className="border-b pb-2">
                    <h3 className="font-medium">Visita #5 - 2023-10-20</h3>
                    <p className="text-sm text-gray-600">Pedidos: Lomo Saltado, Chicha Morada</p>
                    <p className="text-sm text-gray-600">Total: S/. 43.00</p>
                  </div>
                  <div className="border-b pb-2">
                    <h3 className="font-medium">Visita #4 - 2023-09-15</h3>
                    <p className="text-sm text-gray-600">Pedidos: Ceviche, Inca Kola</p>
                    <p className="text-sm text-gray-600">Total: S/. 47.00</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button 
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200 transform hover:scale-105 active:scale-95"
                  onClick={() => setShowHistoryModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Modal de confirmación para eliminar cliente */}
        {showDeleteModal && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Confirmar eliminación</h2>
              <p className="mb-6">¿Estás seguro que deseas eliminar la reserva del cliente {selectedClient.name}? Esta acción no se puede deshacer.</p>
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors duration-200"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                  onClick={() => {
                    setClients(clients.filter(c => c.id !== selectedClient.id));
                    setShowDeleteModal(false);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Clients;