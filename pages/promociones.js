import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaTag, FaPlus, FaEdit, FaTrash, FaCalendarAlt } from 'react-icons/fa';

const Promociones = () => {
  // Estado para las promociones
  const [promotions, setPromotions] = useState([
    { 
      id: 1, 
      name: 'Martes de Descuento', 
      description: '20% de descuento en todos los platos principales',
      discount: 20,
      startDate: '2023-11-01',
      endDate: '2023-11-30',
      active: true,
      days: ['Tuesday']
    },
    { 
      id: 2, 
      name: 'Combo Familiar', 
      description: '2 platos principales + 2 bebidas + postre',
      discount: 15,
      startDate: '2023-11-01',
      endDate: '2023-12-15',
      active: true,
      days: ['Saturday', 'Sunday']
    },
  ]);

  // Estado para la promoción seleccionada
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  
  // Estado para el modal de nueva/editar promoción
  const [showPromotionModal, setShowPromotionModal] = useState(false);

  return (
    <Layout title="Gestión de Promociones">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Promociones</h1>
          <button 
            className="btn btn-primary flex items-center"
            onClick={() => {
              setSelectedPromotion(null);
              setShowPromotionModal(true);
            }}
          >
            <FaPlus className="mr-2" /> Nueva Promoción
          </button>
        </div>

        {/* Listado de promociones */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descuento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fechas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Días</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {promotions.map(promotion => (
                <tr key={promotion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{promotion.name}</td>
                  <td className="px-6 py-4">{promotion.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{promotion.discount}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {promotion.startDate} a {promotion.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {promotion.days.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${promotion.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {promotion.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button 
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setSelectedPromotion(promotion);
                        setShowPromotionModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        // Lógica para eliminar promoción
                        setPromotions(promotions.filter(p => p.id !== promotion.id));
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal para nueva/editar promoción */}
        {showPromotionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {selectedPromotion ? 'Editar Promoción' : 'Nueva Promoción'}
              </h2>
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded"
                      defaultValue={selectedPromotion?.name || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea 
                      className="w-full p-2 border rounded"
                      defaultValue={selectedPromotion?.description || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descuento (%)</label>
                    <input 
                      type="number" 
                      className="w-full p-2 border rounded"
                      defaultValue={selectedPromotion?.discount || ''}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                      <input 
                        type="date" 
                        className="w-full p-2 border rounded"
                        defaultValue={selectedPromotion?.startDate || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
                      <input 
                        type="date" 
                        className="w-full p-2 border rounded"
                        defaultValue={selectedPromotion?.endDate || ''}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Días de la semana</label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <button 
                    type="button" 
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={() => setShowPromotionModal(false)}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      // Lógica para guardar promoción
                      setShowPromotionModal(false);
                    }}
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Promociones;