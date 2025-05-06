import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { FaPlus, FaMinus, FaSave, FaUndo, FaCog, FaChair, FaEdit, FaTrash } from 'react-icons/fa';

// Animaciones CSS
const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  slideDown: {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 }
  },
  pulse: {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' }
  }
};

const Settings = () => {
  // Aplicar animaciones CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      .btn {
        transition: all 0.2s ease;
      }
      .btn:active {
        animation: pulse 0.2s ease;
      }
      .dashboard-card {
        animation: fadeIn 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  // Estado para el número de mesas
  const [tableCount, setTableCount] = useState(20);
  const [editingTableCount, setEditingTableCount] = useState(20);
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado para la configuración de mesas
  const [tables, setTables] = useState([
    ...Array(20).fill().map((_, index) => ({
      id: index + 1,
      number: index + 1,
      capacity: index % 3 === 0 ? 6 : (index % 2 === 0 ? 4 : 2),
      section: index < 10 ? 'Principal' : 'Terraza',
      shape: index % 5 === 0 ? 'rectangular' : 'circular'
    }))
  ]);
  
  // Estado para la mesa que se está editando
  const [editingTable, setEditingTable] = useState(null);
  
  // Función para guardar cambios en el número de mesas
  const handleSaveTableCount = () => {
    const newCount = parseInt(editingTableCount);
    if (newCount > tableCount) {
      // Agregar nuevas mesas
      const newTables = [...tables];
      for (let i = tableCount + 1; i <= newCount; i++) {
        newTables.push({
          id: i,
          number: i,
          capacity: 4,
          section: 'Principal',
          shape: 'circular'
        });
      }
      setTables(newTables);
    } else if (newCount < tableCount) {
      // Eliminar mesas
      setTables(tables.slice(0, newCount));
    }
    
    setTableCount(newCount);
    setIsEditing(false);
  };
  
  // Función para editar una mesa
  const handleEditTable = (table) => {
    setEditingTable({...table});
  };
  
  // Función para guardar cambios en una mesa
  const handleSaveTable = () => {
    setTables(tables.map(table => 
      table.id === editingTable.id ? editingTable : table
    ));
    setEditingTable(null);
  };
  
  // Función para cancelar la edición
  const handleCancelEdit = () => {
    setEditingTable(null);
  };
  
  return (
    <Layout title="Configuración del Sistema">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de configuración general */}
        <div className="lg:col-span-1">
          <div className="dashboard-card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Configuración General</h2>
            
            <div className="space-y-6">
              {/* Configuración de mesas */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Mesas del Restaurante</h3>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  {!isEditing ? (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Número actual de mesas</p>
                        <p className="text-2xl font-bold">{tableCount}</p>
                      </div>
                      <button 
                        className="btn btn-primary flex items-center transition-colors duration-200 hover:bg-primary-700 active:bg-primary-800 shadow-md hover:shadow-lg transform active:scale-95"
                        onClick={() => setIsEditing(true)}
                      >
                        <FaEdit className="mr-2" /> Modificar
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nuevo número de mesas
                        </label>
                        <div className="flex items-center">
                          <button 
                            className="p-2 rounded-l-md bg-gray-200 hover:bg-gray-300"
                            onClick={() => setEditingTableCount(Math.max(1, editingTableCount - 1))}
                          >
                            <FaMinus />
                          </button>
                          <input 
                            type="number" 
                            className="w-20 text-center border-y border-gray-300 py-2 focus:outline-none"
                            value={editingTableCount}
                            onChange={(e) => setEditingTableCount(Math.max(1, parseInt(e.target.value) || 1))}
                            min="1"
                          />
                          <button 
                            className="p-2 rounded-r-md bg-gray-200 hover:bg-gray-300"
                            onClick={() => setEditingTableCount(editingTableCount + 1)}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          className="btn btn-primary flex items-center transition-colors duration-200 hover:bg-primary-700 active:bg-primary-800 shadow-md hover:shadow-lg transform active:scale-95"
                          onClick={handleSaveTableCount}
                        >
                          <FaSave className="mr-2" /> Guardar
                        </button>
                        <button 
                          className="btn btn-secondary flex items-center transition-colors duration-200 hover:bg-gray-200 active:bg-gray-300 shadow-md hover:shadow-lg transform active:scale-95"
                          onClick={() => {
                            setEditingTableCount(tableCount);
                            setIsEditing(false);
                          }}
                        >
                          <FaUndo className="mr-2" /> Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Otras configuraciones */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Otras Configuraciones</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-primary-100 text-primary-600 mr-3">
                        <FaCog />
                      </div>
                      <span>Modo oscuro</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-primary-100 text-primary-600 mr-3">
                        <FaCog />
                      </div>
                      <span>Notificaciones</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" checked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-primary-100 text-primary-600 mr-3">
                        <FaCog />
                      </div>
                      <span>Copias de seguridad automáticas</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Panel de configuración de mesas */}
        <div className="lg:col-span-2">
          <div className="dashboard-card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Configuración de Mesas</h2>
            
            {editingTable ? (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Editar Mesa #{editingTable.number}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número de Mesa
                    </label>
                    <input 
                      type="number" 
                      className="input"
                      value={editingTable.number}
                      onChange={(e) => setEditingTable({...editingTable, number: parseInt(e.target.value) || 1})}
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Capacidad
                    </label>
                    <select 
                      className="input"
                      value={editingTable.capacity}
                      onChange={(e) => setEditingTable({...editingTable, capacity: parseInt(e.target.value)})}
                    >
                      <option value="2">2 personas</option>
                      <option value="4">4 personas</option>
                      <option value="6">6 personas</option>
                      <option value="8">8 personas</option>
                      <option value="10">10 personas</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sección
                    </label>
                    <select 
                      className="input"
                      value={editingTable.section}
                      onChange={(e) => setEditingTable({...editingTable, section: e.target.value})}
                    >
                      <option value="Principal">Principal</option>
                      <option value="Terraza">Terraza</option>
                      <option value="VIP">VIP</option>
                      <option value="Bar">Bar</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Forma
                    </label>
                    <select 
                      className="input"
                      value={editingTable.shape}
                      onChange={(e) => setEditingTable({...editingTable, shape: e.target.value})}
                    >
                      <option value="circular">Circular</option>
                      <option value="rectangular">Rectangular</option>
                      <option value="cuadrada">Cuadrada</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    className="btn btn-primary flex items-center transition-colors duration-200 hover:bg-primary-700 active:bg-primary-800 shadow-md hover:shadow-lg transform active:scale-95"
                    onClick={handleSaveTable}
                  >
                    <FaSave className="mr-2" /> Guardar Cambios
                  </button>
                  <button 
                    className="btn btn-secondary flex items-center transition-colors duration-200 hover:bg-gray-200 active:bg-gray-300 shadow-md hover:shadow-lg transform active:scale-95"
                    onClick={handleCancelEdit}
                  >
                    <FaUndo className="mr-2" /> Cancelar
                  </button>
                </div>
              </div>
            ) : null}
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      # Mesa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sección
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Forma
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tables.map((table) => (
                    <tr key={table.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 rounded-md bg-gray-100 text-gray-600 mr-3 transition-transform duration-100 hover:scale-105">
                            <FaChair />
                          </div>
                          <span className="font-medium">{table.number}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {table.capacity} personas
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {table.section}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {table.shape === 'circular' ? 'Circular' : 
                         table.shape === 'rectangular' ? 'Rectangular' : 'Cuadrada'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-primary-600 hover:text-primary-900 mr-3"
                          onClick={() => handleEditTable(table)}
                        >
                          <FaEdit size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;