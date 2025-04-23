import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaCheck, FaTimes, FaSave, FaUndo } from 'react-icons/fa';

const Menu = () => {
  // Estado para controlar la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Estado para controlar el plato seleccionado para editar
  const [editingDish, setEditingDish] = useState(null);
  
  // Estado para controlar el modal de nuevo plato
  const [showNewDishModal, setShowNewDishModal] = useState(false);
  
  // Estado para el nuevo plato
  const [newDish, setNewDish] = useState({
    name: '',
    category: 'main',
    price: '',
    ingredients: [],
    description: '',
    image: '',
    isAvailable: true
  });
  
  // Estado para el ingrediente que se está agregando
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    unit: 'kg'
  });
  
  // Datos simulados de categorías
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'starters', name: 'Entradas' },
    { id: 'main', name: 'Platos Principales' },
    { id: 'desserts', name: 'Postres' },
    { id: 'drinks', name: 'Bebidas' },
    { id: 'specials', name: 'Especiales' },
  ];
  
  // Datos simulados de platos
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: 'Lomo Saltado',
      category: 'main',
      price: 'S/. 35.00',
      ingredients: [
        { name: 'Carne de res', quantity: 0.25, unit: 'kg' },
        { name: 'Cebolla', quantity: 0.1, unit: 'kg' },
        { name: 'Tomate', quantity: 0.1, unit: 'kg' },
        { name: 'Papas', quantity: 0.2, unit: 'kg' },
        { name: 'Arroz', quantity: 0.15, unit: 'kg' },
      ],
      description: 'Tradicional plato peruano con carne de res salteada con verduras y papas fritas.',
      image: '/images/lomo-saltado.jpg',
      isAvailable: true,
      popularity: 'high',
      profit: 'S/. 22.50',
      profitMargin: '64%'
    },
    {
      id: 2,
      name: 'Ceviche',
      category: 'main',
      price: 'S/. 40.00',
      ingredients: [
        { name: 'Pescado', quantity: 0.25, unit: 'kg' },
        { name: 'Limones', quantity: 0.2, unit: 'kg' },
        { name: 'Cebolla', quantity: 0.1, unit: 'kg' },
        { name: 'Camote', quantity: 0.1, unit: 'kg' },
        { name: 'Choclo', quantity: 0.1, unit: 'kg' },
      ],
      description: 'Plato bandera de la gastronomía peruana a base de pescado fresco marinado en limón.',
      image: '/images/ceviche.jpg',
      isAvailable: false,
      popularity: 'high',
      profit: 'S/. 28.00',
      profitMargin: '70%'
    },
    {
      id: 3,
      name: 'Ají de Gallina',
      category: 'main',
      price: 'S/. 30.00',
      ingredients: [
        { name: 'Pollo', quantity: 0.25, unit: 'kg' },
        { name: 'Ají amarillo', quantity: 0.1, unit: 'kg' },
        { name: 'Pan', quantity: 0.1, unit: 'kg' },
        { name: 'Leche', quantity: 0.2, unit: 'l' },
        { name: 'Arroz', quantity: 0.15, unit: 'kg' },
      ],
      description: 'Cremoso guiso de pollo deshilachado en salsa de ají amarillo, servido con arroz.',
      image: '/images/aji-gallina.jpg',
      isAvailable: true,
      popularity: 'medium',
      profit: 'S/. 18.00',
      profitMargin: '60%'
    },
    {
      id: 4,
      name: 'Arroz con Mariscos',
      category: 'main',
      price: 'S/. 45.00',
      ingredients: [
        { name: 'Mariscos mixtos', quantity: 0.3, unit: 'kg' },
        { name: 'Arroz', quantity: 0.2, unit: 'kg' },
        { name: 'Ají panca', quantity: 0.05, unit: 'kg' },
        { name: 'Cebolla', quantity: 0.1, unit: 'kg' },
        { name: 'Pimiento', quantity: 0.1, unit: 'kg' },
      ],
      description: 'Arroz cocido con mariscos frescos y verduras, sazonado con especias peruanas.',
      image: '/images/arroz-mariscos.jpg',
      isAvailable: true,
      popularity: 'medium',
      profit: 'S/. 25.00',
      profitMargin: '55%'
    },
    {
      id: 5,
      name: 'Causa Rellena',
      category: 'starters',
      price: 'S/. 25.00',
      ingredients: [
        { name: 'Papas amarillas', quantity: 0.3, unit: 'kg' },
        { name: 'Pollo', quantity: 0.15, unit: 'kg' },
        { name: 'Limones', quantity: 0.1, unit: 'kg' },
        { name: 'Palta', quantity: 0.1, unit: 'kg' },
        { name: 'Mayonesa', quantity: 0.05, unit: 'kg' },
      ],
      description: 'Terrina de papa amarilla rellena de pollo o atún, aguacate y mayonesa.',
      image: '/images/causa-rellena.jpg',
      isAvailable: true,
      popularity: 'medium',
      profit: 'S/. 15.00',
      profitMargin: '60%'
    },
    {
      id: 6,
      name: 'Suspiro a la Limeña',
      category: 'desserts',
      price: 'S/. 18.00',
      ingredients: [
        { name: 'Leche condensada', quantity: 0.2, unit: 'kg' },
        { name: 'Leche evaporada', quantity: 0.2, unit: 'l' },
        { name: 'Huevos', quantity: 3, unit: 'unidades' },
        { name: 'Azúcar', quantity: 0.1, unit: 'kg' },
        { name: 'Canela', quantity: 0.01, unit: 'kg' },
      ],
      description: 'Dulce tradicional limeño a base de manjar blanco y merengue italiano.',
      image: '/images/suspiro-limena.jpg',
      isAvailable: true,
      popularity: 'low',
      profit: 'S/. 12.00',
      profitMargin: '67%'
    },
  ]);
  
  // Función para filtrar platos por categoría
  const filteredDishes = selectedCategory === 'all' 
    ? dishes 
    : dishes.filter(dish => dish.category === selectedCategory);
  
  // Función para agregar un nuevo ingrediente al plato
  const handleAddIngredient = () => {
    if (newIngredient.name && newIngredient.quantity) {
      if (editingDish) {
        setEditingDish({
          ...editingDish,
          ingredients: [...editingDish.ingredients, {...newIngredient}]
        });
      } else {
        setNewDish({
          ...newDish,
          ingredients: [...newDish.ingredients, {...newIngredient}]
        });
      }
      
      // Resetear el formulario de ingrediente
      setNewIngredient({
        name: '',
        quantity: '',
        unit: 'kg'
      });
    }
  };
  
  // Función para eliminar un ingrediente
  const handleRemoveIngredient = (index) => {
    if (editingDish) {
      const updatedIngredients = [...editingDish.ingredients];
      updatedIngredients.splice(index, 1);
      setEditingDish({
        ...editingDish,
        ingredients: updatedIngredients
      });
    } else {
      const updatedIngredients = [...newDish.ingredients];
      updatedIngredients.splice(index, 1);
      setNewDish({
        ...newDish,
        ingredients: updatedIngredients
      });
    }
  };
  
  // Función para guardar un nuevo plato
  const handleSaveNewDish = () => {
    const dishToAdd = {
      ...newDish,
      id: dishes.length + 1,
      popularity: 'low',
      profit: 'S/. ' + (parseFloat(newDish.price.replace('S/. ', '')) * 0.6).toFixed(2),
      profitMargin: '60%'
    };
    
    setDishes([...dishes, dishToAdd]);
    setShowNewDishModal(false);
    setNewDish({
      name: '',
      category: 'main',
      price: '',
      ingredients: [],
      description: '',
      image: '',
      isAvailable: true
    });
  };
  
  // Función para guardar cambios en un plato
  const handleSaveEditDish = () => {
    setDishes(dishes.map(dish => 
      dish.id === editingDish.id ? editingDish : dish
    ));
    setEditingDish(null);
  };
  
  // Función para eliminar un plato
  const handleDeleteDish = (id) => {
    setDishes(dishes.filter(dish => dish.id !== id));
  };
  
  return (
    <Layout title="Gestión del Menú">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Panel principal */}
        <div className="lg:w-2/3">
          <div className="dashboard-card mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Menú del Restaurante</h2>
              <button 
                className="btn btn-primary flex items-center"
                onClick={() => setShowNewDishModal(true)}
              >
                <FaPlus className="mr-2" /> Nuevo Plato
              </button>
            </div>
            
            {/* Filtros */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category.id ? 'bg-white shadow text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              <div className="relative ml-auto">
                <input 
                  type="text" 
                  placeholder="Buscar plato..." 
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            {/* Lista de platos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDishes.map(dish => (
                <div 
                  key={dish.id} 
                  className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${!dish.isAvailable ? 'opacity-60' : ''}`}
                >
                  <div className="relative h-48 bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <span>Imagen del plato</span>
                    </div>
                    {!dish.isAvailable && (
                      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium">No Disponible</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-800">{dish.name}</h3>
                      <span className="text-lg font-bold text-primary-600">{dish.price}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{dish.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {dish.ingredients.slice(0, 3).map((ingredient, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {ingredient.name}
                        </span>
                      ))}
                      {dish.ingredients.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{dish.ingredients.length - 3} más
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-gray-500">Popularidad: </span>
                        <span className={`text-xs font-medium ${dish.popularity === 'high' ? 'text-green-600' : dish.popularity === 'medium' ? 'text-yellow-600' : 'text-gray-600'}`}>
                          {dish.popularity === 'high' ? 'Alta' : dish.popularity === 'medium' ? 'Media' : 'Baja'}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-full"
                          onClick={() => setEditingDish({...dish})}
                        >
                          <FaEdit size={16} />
                        </button>
                        <button 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          onClick={() => handleDeleteDish(dish.id)}
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Panel lateral */}
        <div className="lg:w-1/3">
          <div className="dashboard-card mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Estadísticas del Menú</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Total de Platos</div>
                <div className="text-2xl font-bold text-gray-800">{dishes.length}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Disponibles</div>
                <div className="text-2xl font-bold text-green-600">{dishes.filter(d => d.isAvailable).length}</div>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-700 mb-3">Platos Más Populares</h3>
            <div className="space-y-3 mb-6">
              {dishes
                .filter(d => d.popularity === 'high')
                .slice(0, 3)
                .map(dish => (
                  <div key={dish.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                    <div>
                      <div className="font-medium">{dish.name}</div>
                      <div className="text-sm text-gray-500">Margen: {dish.profitMargin}</div>
                    </div>
                    <div className="ml-auto text-lg font-medium text-primary-600">{dish.price}</div>
                  </div>
                ))
              }
            </div>
            
            <h3 className="text-lg font-medium text-gray-700 mb-3">Platos No Disponibles</h3>
            <div className="space-y-2">
              {dishes
                .filter(d => !d.isAvailable)
                .map(dish => (
                  <div key={dish.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="font-medium">{dish.name}</div>
                    <button className="text-xs px-2 py-1 bg-primary-500 text-white rounded-md">
                      Habilitar
                    </button>
                  </div>
                ))
              }
              {dishes.filter(d => !d.isAvailable).length === 0 && (
                <div className="text-center p-4 text-gray-500">
                  Todos los platos están disponibles
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal para nuevo plato */}
      {showNewDishModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Nuevo Plato</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowNewDishModal(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Plato
                  </label>
                  <input 
                    type="text" 
                    className="input"
                    value={newDish.name}
                    onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select 
                    className="input"
                    value={newDish.category}
                    onChange={(e) => setNewDish({...newDish, category: e.target.value})}
                  >
                    {categories.filter(c => c.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio
                  </label>
                  <input 
                    type="text" 
                    className="input"
                    placeholder="S/. 0.00"
                    value={newDish.price}
                    onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Disponibilidad
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        className="form-radio text-primary-600" 
                        name="availability" 
                        checked={newDish.isAvailable}
                        onChange={() => setNewDish({...newDish, isAvailable: true})}
                      />
                      <span className="ml-2">Disponible</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        className="form-radio text-red-600" 
                        name="availability" 
                        checked={!newDish.isAvailable}
                        onChange={() => setNewDish({...newDish, isAvailable: false})}
                      />
                      <span className="ml-2">No Disponible</span>
                    </label>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea 
                    className="input min-h-[100px]"
                    value={newDish.description}
                    onChange={(e) => setNewDish({...newDish, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Ingredientes</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input 
                      type="text" 
                      className="input"
                      value={newIngredient.name}
                      onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cantidad
                    </label>
                    <input 
                      type="text" 
                      className="input"
                      value={newIngredient.quantity}
                      onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unidad
                    </label>
                    <select 
                      className="input"
                      value={newIngredient.unit}
                      onChange={(e) => setNewIngredient({...newIngredient, unit: e.target.value})}
                    >
                      <option value="kg">Kilogramos (kg)</option>
                      <option value="g">Gramos (g)</option>
                      <option value="l">Litros (l)</option>
                      <option value="ml">Mililitros (ml)</option>
                      <option value="unidades">Unidades</option>
                    </select>
                  </div>
                </div>
                
                <button 
                  className="btn btn-primary w-full md:w-auto"
                  onClick={handleAddIngredient}
                >
                  <FaPlus className="mr-2" /> Agregar Ingrediente
                </button>
                
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingrediente</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {newDish.ingredients.map((ingredient, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap">{ingredient.name}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{ingredient.quantity}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{ingredient.unit}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-right">
                            <button 
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleRemoveIngredient(index)}
                            >
                              <FaTrash size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {newDish.ingredients.length === 0 && (
                        <tr>
                          <td colSpan="4" className="px-4 py-4 text-center text-sm text-gray-500">
                            No hay ingredientes agregados
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowNewDishModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleSaveNewDish}
                  disabled={!newDish.name || !newDish.price || newDish.ingredients.length === 0}
                >
                  Guardar Plato
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal para editar plato */}
      {editingDish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Editar Plato</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setEditingDish(null)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Plato
                  </label>
                  <input 
                    type="text" 
                    className="input"
                    value={editingDish.name}
                    onChange={(e) => setEditingDish({...editingDish, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría
                  </label>
                  <select 
                    className="input"
                    value={editingDish.category}
                    onChange={(e) => setEditingDish({...editingDish, category: e.target.value})}
                  >
                    {categories.filter(c => c.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio
                  </label>
                  <input 
                    type="text" 
                    className="input"
                    placeholder="S/. 0.00"
                    value={editingDish.price}
                    onChange={(e) => setEditingDish({...editingDish, price: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Disponibilidad
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        className="form-radio text-primary-600" 
                        name="edit-availability" 
                        checked={editingDish.isAvailable}
                        onChange={() => setEditingDish({...editingDish, isAvailable: true})}
                      />
                      <span className="ml-2">Disponible</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        className="form-radio text-red-600" 
                        name="edit-availability" 
                        checked={!editingDish.isAvailable}
                        onChange={() => setEditingDish({...editingDish, isAvailable: false})}
                      />
                      <span className="ml-2">No Disponible</span>
                    </label>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea 
                    className="input min-h-[100px]"
                    value={editingDish.description}
                    onChange={(e) => setEditingDish({...editingDish, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Ingredientes</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input 
                      type="text" 
                      className="input"
                      value={newIngredient.name}
                      onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cantidad
                    </label>
                    <input 
                      type="text" 
                      className="input"
                      value={newIngredient.quantity}
                      onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unidad
                    </label>
                    <select 
                      className="input"
                      value={newIngredient.unit}
                      onChange={(e) => setNewIngredient({...newIngredient, unit: e.target.value})}
                    >
                      <option value="kg">Kilogramos (kg)</option>
                      <option value="g">Gramos (g)</option>
                      <option value="l">Litros (l)</option>
                      <option value="ml">Mililitros (ml)</option>
                      <option value="unidades">Unidades</option>
                    </select>
                  </div>
                </div>
                
                <button 
                  className="btn btn-primary w-full md:w-auto"
                  onClick={handleAddIngredient}
                >
                  <FaPlus className="mr-2" /> Agregar Ingrediente
                </button>
                
                <div className="mt-4 border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingrediente</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {editingDish.ingredients.map((ingredient, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap">{ingredient.name}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{ingredient.quantity}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{ingredient.unit}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-right">
                            <button 
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleRemoveIngredient(index)}
                            >
                              <FaTrash size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {editingDish.ingredients.length === 0 && (
                        <tr>
                          <td colSpan="4" className="px-4 py-4 text-center text-sm text-gray-500">
                            No hay ingredientes agregados
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setEditingDish(null)}
                >
                  Cancelar
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleSaveEditDish}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Menu;