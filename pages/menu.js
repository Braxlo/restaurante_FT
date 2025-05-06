import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaCheck, FaTimes, FaSave, FaUndo, FaCamera, FaUtensils, FaTag } from 'react-icons/fa';

// Estilos para animaciones y transiciones
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s',
  },
  modal: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    padding: '1rem',
    minWidth: '280px',
    maxWidth: '90vw',
    maxHeight: '80vh',
    overflowY: 'auto',
    animation: 'slideDown 0.4s',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  closeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#888',
    transition: 'color 0.2s',
  },
};

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
  
  // Añadir animaciones CSS al cargar la página
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideDown { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
      
      .dish-card {
        transition: all 0.3s ease;
      }
      .dish-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      }
      .category-btn {
        transition: all 0.2s ease;
      }
      .category-btn:hover {
        transform: translateY(-2px);
      }
      .category-btn.active {
        transform: translateY(-2px);
      }
      .action-btn {
        transition: all 0.2s ease;
      }
      .action-btn:hover {
        transform: scale(1.15);
      }
      .dish-image {
        transition: all 0.5s ease;
      }
      .dish-card:hover .dish-image {
        transform: scale(1.05);
      }
      .dish-badge {
        animation: pulse 2s infinite;
      }
      .dish-list {
        animation: fadeIn 0.6s ease-out;
      }
      .dish-card {
        animation: slideUp 0.4s ease-out;
        animation-fill-mode: both;
      }
      .dish-card:nth-child(odd) {
        animation-delay: 0.1s;
      }
      .dish-card:nth-child(even) {
        animation-delay: 0.2s;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Modal reutilizable con animaciones
  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    return (
      <div style={modalStyles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div style={modalStyles.modal}>
          <button 
            style={modalStyles.closeBtn} 
            onClick={onClose} 
            aria-label="Cerrar"
            className="hover:text-red-500 transition-colors"
          >
            <FaTimes />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{title}</h2>
          <div>{children}</div>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Gestión del Menú">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Panel principal */}
        <div className="lg:w-2/3">
          <div className="dashboard-card mb-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <FaUtensils className="mr-3 text-primary-500" /> 
                <span>Menú del Restaurante</span>
              </h2>
              <button 
                className="btn btn-primary flex items-center transform hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                onClick={() => setShowNewDishModal(true)}
              >
                <FaPlus className="mr-2" /> Nuevo Plato
              </button>
            </div>
            
            {/* Filtros con animaciones */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="flex items-center bg-gray-100 rounded-lg p-1 shadow-sm">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-btn px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === category.id ? 'bg-white shadow-md text-primary-600 active' : 'text-gray-600 hover:text-primary-600'}`}
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
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64 transition-all duration-300 focus:w-72 shadow-sm"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            
            {/* Lista de platos con animaciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dish-list">
              {filteredDishes.map(dish => (
                <div 
                  key={dish.id} 
                  className={`dish-card border rounded-xl overflow-hidden shadow-sm ${!dish.isAvailable ? 'opacity-75' : ''}`}
                >
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <div className="dish-image absolute inset-0 bg-cover bg-center" style={{backgroundImage: dish.image ? `url(${dish.image})` : 'none'}}></div>
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200 bg-opacity-60">
                      <FaCamera className="mr-2" /> <span>Imagen del plato</span>
                    </div>
                    {!dish.isAvailable && (
                      <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
                        <span className="dish-badge px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium shadow-lg">
                          No Disponible
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${dish.popularity === 'high' ? 'bg-green-500 text-white' : dish.popularity === 'medium' ? 'bg-yellow-500 text-white' : 'bg-gray-500 text-white'}`}>
                        {dish.popularity === 'high' ? 'Popular' : dish.popularity === 'medium' ? 'Medio' : 'Nuevo'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800 hover:text-primary-600 transition-colors">{dish.name}</h3>
                      <span className="text-lg font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">{dish.price}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{dish.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dish.ingredients.slice(0, 3).map((ingredient, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex items-center hover:bg-gray-200 transition-colors">
                          <FaTag className="mr-1 text-primary-400" size={10} /> {ingredient.name}
                        </span>
                      ))}
                      {dish.ingredients.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors cursor-pointer">
                          +{dish.ingredients.length - 3} más
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-1">Margen: </span>
                        <span className="text-xs font-medium text-primary-600">
                          {dish.profitMargin}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          className="action-btn p-2 text-primary-600 hover:bg-primary-50 rounded-full"
                          onClick={() => setEditingDish({...dish})}
                          title="Editar plato"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button 
                          className="action-btn p-2 text-red-600 hover:bg-red-50 rounded-full"
                          onClick={() => handleDeleteDish(dish.id)}
                          title="Eliminar plato"
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
          <div className="dashboard-card mb-6 shadow-lg border border-gray-100 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 mb-4">
              <h2 className="text-xl font-bold">Estadísticas del Menú</h2>
              <p className="text-primary-100 text-sm">Resumen de rendimiento</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6 px-4">
              <div className="p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">Total de Platos</div>
                <div className="text-2xl font-bold text-gray-800">{dishes.length}</div>
                <div className="text-xs text-primary-500 mt-1">+2 esta semana</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">Disponibles</div>
                <div className="text-2xl font-bold text-green-600">{dishes.filter(d => d.isAvailable).length}</div>
                <div className="text-xs text-green-500 mt-1">{Math.round(dishes.filter(d => d.isAvailable).length / dishes.length * 100)}% del total</div>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-700 mb-3 px-4 flex items-center">
              <span className="w-2 h-6 bg-green-500 rounded-full mr-2"></span>
              Platos Más Populares
            </h3>
            <div className="space-y-3 mb-6 px-4">
              {dishes
                .filter(d => d.popularity === 'high')
                .slice(0, 3)
                .map((dish, index) => (
                  <div 
                    key={dish.id} 
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 overflow-hidden">
                      <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: dish.image ? `url(${dish.image})` : 'none'}}></div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{dish.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                        Margen: {dish.profitMargin}
                      </div>
                    </div>
                    <div className="ml-auto text-lg font-medium text-primary-600">{dish.price}</div>
                  </div>
                ))
              }
            </div>
            
            <h3 className="text-lg font-medium text-gray-700 mb-3 px-4 flex items-center">
              <span className="w-2 h-6 bg-red-500 rounded-full mr-2"></span>
              Platos No Disponibles
            </h3>
            <div className="space-y-2 px-4 pb-4">
              {dishes
                .filter(d => !d.isAvailable)
                .map(dish => (
                  <div key={dish.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
                    <div className="font-medium text-gray-800">{dish.name}</div>
                    <button className="text-xs px-3 py-1.5 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors shadow-sm hover:shadow">
                      Habilitar
                    </button>
                  </div>
                ))
              }
              {dishes.filter(d => !d.isAvailable).length === 0 && (
                <div className="text-center p-6 text-gray-500 bg-gray-50 rounded-lg border border-gray-100">
                  <FaCheck className="mx-auto mb-2 text-green-500" size={24} />
                  Todos los platos están disponibles
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal para nuevo plato - usando el componente Modal */}
          <Modal
          show={showNewDishModal !==null}
          onClose={() => setShowNewDishModal(null)}
          title="Nuevo Plato"
          >
          {newDish && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaUtensils className="mr-2 text-primary-500" size={14} />
                    Nombre del Plato
                  </label>
                  <input 
                    type="text" 
                    className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    value={newDish.name}
                    onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                    placeholder="Ingrese el nombre del plato"
                  />
                </div>
                
                <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaTag className="mr-2 text-primary-500" size={14} />
                    Categoría
                  </label>
                  <select 
                    className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    value={newDish.category}
                    onChange={(e) => setNewDish({...newDish, category: e.target.value})}
                  >
                    {categories.filter(c => c.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <span className="mr-2 text-primary-500 font-bold">S/.</span>
                    Precio
                  </label>
                  <input 
                    type="text" 
                    className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    placeholder="S/. 0.00"
                    value={newDish.price}
                    onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                  />
                </div>
                
                <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaCheck className="mr-2 text-primary-500" size={14} />
                    Disponibilidad
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <input 
                        type="radio" 
                        className="form-radio text-primary-600 h-5 w-5" 
                        name="availability" 
                        checked={newDish.isAvailable}
                        onChange={() => setNewDish({...newDish, isAvailable: true})}
                      />
                      <span className="ml-2 text-gray-700">Disponible</span>
                    </label>
                    <label className="inline-flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <input 
                        type="radio" 
                        className="form-radio text-red-600 h-5 w-5" 
                        name="availability" 
                        checked={!newDish.isAvailable}
                        onChange={() => setNewDish({...newDish, isAvailable: false})}
                      />
                      <span className="ml-2 text-gray-700">No Disponible</span>
                    </label>
                  </div>
                </div>
                
                <div className="md:col-span-2 transition-all duration-300 hover:shadow-md p-3 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FaEdit className="mr-2 text-primary-500" size={14} />
                    Descripción
                  </label>
                  <textarea 
                    className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all min-h-[120px] resize-none"
                    value={newDish.description}
                    onChange={(e) => setNewDish({...newDish, description: e.target.value})}
                    placeholder="Describa el plato, sus características y preparación..."
                  ></textarea>
                </div>
              </div>
              
              <div className="mb-6 bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center border-b border-gray-200 pb-2">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                    <FaPlus className="text-primary-600" size={12} />
                  </span>
                  Ingredientes
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg bg-white">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre
                    </label>
                    <input 
                      type="text" 
                      className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      value={newIngredient.name}
                      onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                      placeholder="Ej: Cebolla"
                    />
                  </div>
                  
                  <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg bg-white">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad
                    </label>
                    <input 
                      type="number" 
                      className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      value={newIngredient.quantity}
                      onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
                      placeholder="Ej: 0.5"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  
                  <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg bg-white">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unidad
                    </label>
                    <select 
                      className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
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
                
                <div className="flex justify-end mb-4">
                  <button 
                    className="btn btn-primary flex items-center transform hover:scale-105 transition-transform shadow hover:shadow-md rounded-lg px-4 py-2"
                    onClick={handleAddIngredient}
                  >
                    <FaPlus className="mr-2" /> Agregar Ingrediente
                  </button>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <FaCheck className="text-green-600" size={10} />
                    </span>
                    Ingredientes Agregados
                  </h4>
                  
                  {(editingDish ? editingDish.ingredients : newDish.ingredients).length === 0 ? (
                    <div className="text-center py-6 text-gray-500">
                      <FaPlus className="mx-auto mb-2 text-gray-300" size={24} />
                      <p>No hay ingredientes agregados</p>
                      <p className="text-xs mt-1">Agrega ingredientes usando el formulario de arriba</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                      {(editingDish ? editingDish.ingredients : newDish.ingredients).map((ingredient, index) => (
                        <div 
                          key={index} 
                          className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-colors"
                          style={{animationDelay: `${index * 0.05}s`}}
                        >
                          <div>
                            <span className="font-medium text-gray-800">{ingredient.name}</span>
                            <span className="text-gray-500 text-sm ml-2 bg-gray-100 px-2 py-1 rounded-full">{ingredient.quantity} {ingredient.unit}</span>
                          </div>
                          <button 
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                            onClick={() => handleRemoveIngredient(index)}
                            title="Eliminar ingrediente"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 border-t border-gray-100 pt-4">
                <button 
                  className="btn btn-secondary flex items-center px-5 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow"
                  onClick={() => {
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
                  }}
                >
                  <FaUndo className="mr-2" /> Cancelar
                </button>
                <button 
                  className="btn btn-primary flex items-center px-5 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
                  onClick={handleSaveNewDish}
                >
                  <FaSave className="mr-2" /> Guardar Plato
                </button>
              </div>
              </>
            )}
            </Modal>
            
      {/* Modal para editar plato - usando el componente Modal */}
      <Modal 
        show={editingDish !== null} 
        onClose={() => setEditingDish(null)}
        title="Editar Plato"
      >
        {editingDish && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaUtensils className="mr-2 text-primary-500" size={14} />
                  Nombre del Plato
                </label>
                <input 
                  type="text" 
                  className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  value={editingDish.name}
                  onChange={(e) => setEditingDish({...editingDish, name: e.target.value})}
                  placeholder="Ingrese el nombre del plato"
                />
              </div>
              
              <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaTag className="mr-2 text-primary-500" size={14} />
                  Categoría
                </label>
                <select 
                  className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  value={editingDish.category}
                  onChange={(e) => setEditingDish({...editingDish, category: e.target.value})}
                >
                  {categories.filter(c => c.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <span className="mr-2 text-primary-500 font-bold">S/.</span>
                  Precio
                </label>
                <input 
                  type="text" 
                  className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder="S/. 0.00"
                  value={editingDish.price}
                  onChange={(e) => setEditingDish({...editingDish, price: e.target.value})}
                />
              </div>
              
              <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaCheck className="mr-2 text-primary-500" size={14} />
                  Disponibilidad
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <input 
                      type="radio" 
                      className="form-radio text-primary-600 h-5 w-5" 
                      name="edit-availability" 
                      checked={editingDish.isAvailable}
                      onChange={() => setEditingDish({...editingDish, isAvailable: true})}
                    />
                    <span className="ml-2 text-gray-700">Disponible</span>
                  </label>
                  <label className="inline-flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <input 
                      type="radio" 
                      className="form-radio text-red-600 h-5 w-5" 
                      name="edit-availability" 
                      checked={!editingDish.isAvailable}
                      onChange={() => setEditingDish({...editingDish, isAvailable: false})}
                    />
                    <span className="ml-2 text-gray-700">No Disponible</span>
                  </label>
                </div>
              </div>
              
              <div className="md:col-span-2 transition-all duration-300 hover:shadow-md p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FaEdit className="mr-2 text-primary-500" size={14} />
                  Descripción
                </label>
                <textarea 
                  className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all min-h-[120px] resize-none"
                  value={editingDish.description}
                  onChange={(e) => setEditingDish({...editingDish, description: e.target.value})}
                  placeholder="Describa el plato, sus características y preparación..."
                ></textarea>
              </div>
            </div>
            
            <div className="mb-6 bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center border-b border-gray-200 pb-2">
                <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-2">
                  <FaPlus className="text-primary-600" size={12} />
                </span>
                Ingredientes
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg bg-white">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input 
                    type="text" 
                    className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    value={newIngredient.name}
                    onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                    placeholder="Ej: Cebolla"
                  />
                </div>
                
                <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg bg-white">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad
                  </label>
                  <input 
                    type="number" 
                    className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    value={newIngredient.quantity}
                    onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
                    placeholder="Ej: 0.5"
                    step="0.01"
                    min="0"
                  />
                </div>
                
                <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg bg-white">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unidad
                  </label>
                  <select 
                    className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
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
              
              <div className="flex justify-end mb-4">
                <button 
                  className="btn btn-primary flex items-center transform hover:scale-105 transition-transform shadow hover:shadow-md rounded-lg px-4 py-2"
                  onClick={handleAddIngredient}
                >
                  <FaPlus className="mr-2" /> Agregar Ingrediente
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <FaCheck className="text-green-600" size={10} />
                  </span>
                  Ingredientes Agregados
                </h4>
                
                {editingDish.ingredients.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <FaPlus className="mx-auto mb-2 text-gray-300" size={24} />
                    <p>No hay ingredientes agregados</p>
                    <p className="text-xs mt-1">Agrega ingredientes usando el formulario de arriba</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                    {editingDish.ingredients.map((ingredient, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-200 hover:bg-primary-50 transition-colors"
                        style={{animationDelay: `${index * 0.05}s`}}
                      >
                        <div>
                          <span className="font-medium text-gray-800">{ingredient.name}</span>
                          <span className="text-gray-500 text-sm ml-2 bg-gray-100 px-2 py-1 rounded-full">{ingredient.quantity} {ingredient.unit}</span>
                        </div>
                        <button 
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                          onClick={() => handleRemoveIngredient(index)}
                          title="Eliminar ingrediente"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 border-t border-gray-100 pt-4">
              <button 
                className="btn btn-secondary flex items-center px-5 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow"
                onClick={() => setEditingDish(null)}
              >
                <FaUndo className="mr-2" /> Cancelar
              </button>
              <button 
                className="btn btn-primary flex items-center px-5 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
                onClick={handleSaveEditDish}
              >
                <FaSave className="mr-2" /> Guardar Cambios
              </button>
            </div>
          </>
        )}
      </Modal>
    </Layout>
  );
};

export default Menu;


// Modal para agregar ingredientes
const AddIngredientModal = ({ show, onClose, dish, onSave }) => {
  const [ingredient, setIngredient] = useState({
    name: '',
    quantity: '',
    unit: 'kg'
  });

  const handleAddIngredient = () => {
    if (ingredient.name && ingredient.quantity) {
      onSave([...dish.ingredients, ingredient]);
      setIngredient({ name: '', quantity: '', unit: 'kg' });
    }
  };

  return (
    <Modal show={show} onClose={onClose} title="Agregar Ingrediente">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg bg-white">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre
          </label>
          
          <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg bg-white">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad
            </label>
            <input 
              type="number" 
              className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              value={ingredient.quantity}
              onChange={(e) => setIngredient({...ingredient, quantity: e.target.value})}
              placeholder="Ej: 0.5"
              step="0.01"
              min="0"
            />
          </div>
          
          <div className="transition-all duration-300 hover:shadow-md p-3 rounded-lg bg-white">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidad
            </label>
            <select 
              className="input w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              value={ingredient.unit}
              onChange={(e) => setIngredient({...ingredient, unit: e.target.value})}
            >
              <option value="kg">Kilogramos (kg)</option>
              <option value="g">Gramos (g)</option>
              <option value="l">Litros (l)</option>
              <option value="ml">Mililitros (ml)</option>
              <option value="unidades">Unidades</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mb-4">
        <button 
          className="btn btn-primary flex items-center transform hover:scale-105 transition-transform shadow hover:shadow-md rounded-lg px-4 py-2"
          onClick={handleAddIngredient}
        >
          <FaPlus className="mr-2" /> Agregar Ingrediente
        </button>
      </div>
      
      <div className="flex justify-end space-x-3 border-t border-gray-100 pt-4">
        <button 
          className="btn btn-secondary flex items-center px-5 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow"
          onClick={onClose}
        >
          <FaTimes className="mr-2" /> Cerrar
        </button>
      </div>
    </Modal>
  );
};