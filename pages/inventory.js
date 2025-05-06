import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaArrowDown, FaArrowUp, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Inventory = () => {
  // Estado para controlar la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Estado para controlar el producto seleccionado para editar
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Estado para controlar la visibilidad del formulario de nuevo ingrediente
  const [showNewIngredientForm, setShowNewIngredientForm] = useState(false);
  
  // Estado para el nuevo ingrediente
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    category: 'grains',
    stock: 0,
    unit: 'kg',
    minStock: 0,
    price: ''
  });

  // Datos simulados de categorías
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'grains', name: 'Granos y Cereales' },
    { id: 'proteins', name: 'Carnes y Proteínas' },
    { id: 'vegetables', name: 'Verduras y Hortalizas' },
    { id: 'fruits', name: 'Frutas' },
    { id: 'dairy', name: 'Lácteos' },
    { id: 'spices', name: 'Especias y Condimentos' },
    { id: 'oils', name: 'Aceites y Grasas' },
    { id: 'beverages', name: 'Bebidas' },
  ];

  // Función para manejar cambios en el formulario de nuevo ingrediente
  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setNewIngredient({
      ...newIngredient,
      [name]: value
    });
  };

  // Función para validar y enviar el nuevo ingrediente
  const handleSubmitIngredient = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!newIngredient.name || !newIngredient.price) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    
    // Aquí iría la lógica para guardar el nuevo ingrediente
    console.log('Nuevo ingrediente:', newIngredient);
    
    // Resetear el formulario
    setNewIngredient({
      name: '',
      category: 'grains',
      stock: 0,
      unit: 'kg',
      minStock: 0,
      price: ''
    });
    
    setShowNewIngredientForm(false);
  };

  // Datos simulados de productos
  const products = [
    { 
      id: 1, 
      name: 'Arroz', 
      category: 'grains', 
      stock: 5, 
      unit: 'kg', 
      minStock: 30, 
      price: 'S/. 4.50', 
      lastUpdated: '2023-10-24', 
      status: 'critical',
      consumption: [
        { date: '2023-10-24', amount: 2.5 },
        { date: '2023-10-23', amount: 3.0 },
        { date: '2023-10-22', amount: 2.0 },
      ]
    },
    { 
      id: 2, 
      name: 'Pollo', 
      category: 'proteins', 
      stock: 8.5, 
      unit: 'kg', 
      minStock: 10, 
      price: 'S/. 15.90', 
      lastUpdated: '2023-10-25', 
      status: 'warning',
      consumption: [
        { date: '2023-10-25', amount: 3.5 },
        { date: '2023-10-24', amount: 4.0 },
        { date: '2023-10-23', amount: 3.0 },
      ]
    },
    { 
      id: 3, 
      name: 'Papas', 
      category: 'vegetables', 
      stock: 12, 
      unit: 'kg', 
      minStock: 15, 
      price: 'S/. 3.20', 
      lastUpdated: '2023-10-25', 
      status: 'warning',
      consumption: [
        { date: '2023-10-25', amount: 4.0 },
        { date: '2023-10-24', amount: 3.5 },
        { date: '2023-10-23', amount: 4.5 },
      ]
    },
    { 
      id: 4, 
      name: 'Aceite de Oliva', 
      category: 'oils', 
      stock: 2, 
      unit: 'botellas', 
      minStock: 10, 
      price: 'S/. 32.50', 
      lastUpdated: '2023-10-23', 
      status: 'critical',
      consumption: [
        { date: '2023-10-23', amount: 0.5 },
        { date: '2023-10-22', amount: 0.5 },
        { date: '2023-10-21', amount: 0.5 },
      ]
    },
    { 
      id: 5, 
      name: 'Limones', 
      category: 'fruits', 
      stock: 1, 
      unit: 'kg', 
      minStock: 8, 
      price: 'S/. 5.90', 
      lastUpdated: '2023-10-24', 
      status: 'critical',
      consumption: [
        { date: '2023-10-24', amount: 1.0 },
        { date: '2023-10-23', amount: 1.5 },
        { date: '2023-10-22', amount: 1.0 },
      ]
    },
    { 
      id: 6, 
      name: 'Leche', 
      category: 'dairy', 
      stock: 12, 
      unit: 'litros', 
      minStock: 15, 
      price: 'S/. 4.80', 
      lastUpdated: '2023-10-25', 
      status: 'warning',
      consumption: [
        { date: '2023-10-25', amount: 3.0 },
        { date: '2023-10-24', amount: 2.5 },
        { date: '2023-10-23', amount: 3.0 },
      ]
    },
    { 
      id: 7, 
      name: 'Azúcar', 
      category: 'grains', 
      stock: 18, 
      unit: 'kg', 
      minStock: 20, 
      price: 'S/. 3.90', 
      lastUpdated: '2023-10-25', 
      status: 'warning',
      consumption: [
        { date: '2023-10-25', amount: 1.0 },
        { date: '2023-10-24', amount: 1.5 },
        { date: '2023-10-23', amount: 1.0 },
      ]
    },
    { 
      id: 8, 
      name: 'Sal', 
      category: 'spices', 
      stock: 5, 
      unit: 'kg', 
      minStock: 3, 
      price: 'S/. 1.50', 
      lastUpdated: '2023-10-22', 
      status: 'normal',
      consumption: [
        { date: '2023-10-22', amount: 0.2 },
        { date: '2023-10-21', amount: 0.3 },
        { date: '2023-10-20', amount: 0.2 },
      ]
    },
    { 
      id: 9, 
      name: 'Tomates', 
      category: 'vegetables', 
      stock: 7, 
      unit: 'kg', 
      minStock: 8, 
      price: 'S/. 4.20', 
      lastUpdated: '2023-10-25', 
      status: 'warning',
      consumption: [
        { date: '2023-10-25', amount: 2.0 },
        { date: '2023-10-24', amount: 1.5 },
        { date: '2023-10-23', amount: 2.0 },
      ]
    },
    { 
      id: 10, 
      name: 'Cebollas', 
      category: 'vegetables', 
      stock: 9, 
      unit: 'kg', 
      minStock: 10, 
      price: 'S/. 2.80', 
      lastUpdated: '2023-10-25', 
      status: 'warning',
      consumption: [
        { date: '2023-10-25', amount: 1.5 },
        { date: '2023-10-24', amount: 1.0 },
        { date: '2023-10-23', amount: 1.5 },
      ]
    },
  ];

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Función para obtener el color según el estado del producto
  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'normal': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Función para obtener el porcentaje de stock
  const getStockPercentage = (stock, minStock) => {
    const percentage = (stock / minStock) * 100;
    return Math.min(percentage, 100); // Limitar al 100%
  };

  return (
    <Layout title="Inventario / Almacén">
      {/* Formulario de nuevo ingrediente */}
      <AnimatePresence>
        {showNewIngredientForm && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowNewIngredientForm(false)}
          >
            <motion.div 
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <h2 className="text-xl font-bold mb-4">Agregar Nuevo Ingrediente</h2>
              <form onSubmit={handleSubmitIngredient}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={newIngredient.name}
                      onChange={handleIngredientChange}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select
                      name="category"
                      value={newIngredient.category}
                      onChange={handleIngredientChange}
                      className="w-full p-2 border rounded-md"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={newIngredient.stock}
                        onChange={handleIngredientChange}
                        className="w-full p-2 border rounded-md"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                      <select
                        name="unit"
                        value={newIngredient.unit}
                        onChange={handleIngredientChange}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="l">l</option>
                        <option value="ml">ml</option>
                        <option value="unidades">unidades</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo</label>
                      <input
                        type="number"
                        name="minStock"
                        value={newIngredient.minStock}
                        onChange={handleIngredientChange}
                        className="w-full p-2 border rounded-md"
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Precio (S/.)</label>
                      <input
                        type="text"
                        name="price"
                        value={newIngredient.price}
                        onChange={handleIngredientChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewIngredientForm(false)}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Panel superior con estadísticas y alertas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Productos en Stock</h3>
          <div className="flex items-end">
            <div className="text-3xl font-bold text-gray-800">{products.length}</div>
            <div className="ml-2 text-sm text-gray-500">productos registrados</div>
          </div>
          <div className="mt-2 text-sm">
            <span className="text-red-500 font-medium">{products.filter(p => p.status === 'critical').length} críticos</span>
            <span className="mx-2">•</span>
            <span className="text-yellow-500 font-medium">{products.filter(p => p.status === 'warning').length} por agotar</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Valor del Inventario</h3>
          <div className="text-3xl font-bold text-gray-800">S/. 2,450.80</div>
          <div className="mt-2 text-sm text-green-500 flex items-center">
            <FaArrowUp className="mr-1" /> 5.2% vs. semana anterior
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Consumo Semanal</h3>
          <div className="text-3xl font-bold text-gray-800">S/. 875.30</div>
          <div className="mt-2 text-sm text-red-500 flex items-center">
            <FaArrowDown className="mr-1" /> 2.1% vs. semana anterior
          </div>
        </div>
      </div>

      {/* Alertas de stock crítico */}
      <div className="dashboard-card mb-6">
        <div className="flex items-center mb-4">
          <FaExclamationTriangle className="text-red-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-700">Alertas de Stock Crítico</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products
            .filter(product => product.status === 'critical')
            .map(product => (
              <div key={product.id} className="p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.stock} {product.unit} disponibles</p>
                  </div>
                  <div className="px-2 py-1 rounded-full text-xs font-medium text-red-600 bg-red-100">
                    {Math.round((product.stock / product.minStock) * 100)}% del mínimo
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${getStockPercentage(product.stock, product.minStock)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="flex overflow-x-auto pb-2 mb-4 md:mb-0">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${selectedCategory === category.id ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex">
          <div className="relative mr-2">
            <input 
              type="text" 
              placeholder="Buscar producto..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button 
            className="btn btn-primary flex items-center transition-all duration-300 hover:bg-primary-600 active:scale-95"
            onClick={() => setShowNewIngredientForm(true)}
          >
            <FaPlus className="mr-2 transition-transform group-hover:rotate-90" /> 
            <span className="group-hover:underline">Nuevo Ingrediente</span>
          </button>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="dashboard-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Producto</th>
                <th className="table-header-cell">Categoría</th>
                <th className="table-header-cell">Stock Actual</th>
                <th className="table-header-cell">Stock Mínimo</th>
                <th className="table-header-cell">Precio Unitario</th>
                <th className="table-header-cell">Última Actualización</th>
                <th className="table-header-cell">Estado</th>
                <th className="table-header-cell">Acciones</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredProducts.map(product => (
                <tr key={product.id} className="table-row">
                  <td className="table-cell font-medium text-gray-800">{product.name}</td>
                  <td className="table-cell">{categories.find(c => c.id === product.category)?.name}</td>
                  <td className="table-cell">
                    <div className="flex items-center">
                      <span className="mr-2">{product.stock} {product.unit}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${product.status === 'critical' ? 'bg-red-500' : product.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`} 
                          style={{ width: `${getStockPercentage(product.stock, product.minStock)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">{product.minStock} {product.unit}</td>
                  <td className="table-cell">{product.price}</td>
                  <td className="table-cell">{product.lastUpdated}</td>
                  <td className="table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status === 'critical' ? 'Crítico' : product.status === 'warning' ? 'Por Agotar' : 'Normal'}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 text-blue-500 hover:text-blue-700 transition-colors duration-200 transform hover:scale-110" 
                        onClick={() => {
                          setSelectedProduct(product);
                          alert(`Editando producto: ${product.name}`);
                        }}
                        title="Editar producto"
                      >
                        <FaEdit className="hover:rotate-12 transition-transform" />
                      </button>
                      <button 
                        className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200 transform hover:scale-110"
                        onClick={() => {
                          if(confirm(`¿Eliminar producto ${product.name}?`)) {
                            alert(`Producto ${product.name} eliminado (simulado)`);
                          }
                        }}
                        title="Eliminar producto"
                      >
                        <FaTrash className="hover:shake-animation" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para editar producto (simulado) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Editar Producto</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                <input 
                  type="text" 
                  className="input" 
                  defaultValue={selectedProduct.name} 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Actual</label>
                  <input 
                    type="number" 
                    className="input" 
                    defaultValue={selectedProduct.stock} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                  <input 
                    type="text" 
                    className="input" 
                    defaultValue={selectedProduct.unit} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo</label>
                  <input 
                    type="number" 
                    className="input" 
                    defaultValue={selectedProduct.minStock} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unitario</label>
                  <input 
                    type="text" 
                    className="input" 
                    defaultValue={selectedProduct.price.replace('S/. ', '')} 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select className="input">
                  {categories.filter(c => c.id !== 'all').map(category => (
                    <option 
                      key={category.id} 
                      value={category.id}
                      selected={category.id === selectedProduct.category}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setSelectedProduct(null)}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => setSelectedProduct(null)}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Inventory;