import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaCalendarAlt, FaChartLine, FaChartPie, FaChartBar, FaFilter, FaDownload, FaExchangeAlt, FaUtensils, FaWarehouse } from 'react-icons/fa';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Estilos para el modal
export const modalStyles = {
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
    padding: '2rem',
    minWidth: '500px',
    maxWidth: '90vw',
    maxHeight: '80vh',
    overflowY: 'auto',
    animation: 'slideDown 0.4s',
    position: 'relative',
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
    '&:hover': {
      color: '#555',
    },
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
    '&:hover': {
      color: '#555',
    },
  },
};

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Economic = () => {
  // Estado para controlar el período de tiempo seleccionado
  const [timePeriod, setTimePeriod] = useState('week');
  
  // Estado para controlar la visualización del modal de exportación
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Función para mostrar/ocultar el modal
  const toggleExportModal = () => setShowExportModal(!showExportModal);
  
  // Estado para controlar la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Estado para controlar la visibilidad del modal de filtros
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // Función para mostrar/ocultar el modal de filtros con animación
  const toggleFilterModal = () => {
    if (showFilterModal) {
      // Animación de salida
      const modal = document.querySelector('.filter-modal');
      setTimeout(() => setShowFilterModal(false), 250);
    } else {
      setShowFilterModal(true);
    }
  };
  
  // Datos simulados para los gráficos
  const revenueData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Ingresos',
        data: [1200, 1500, 1300, 1800, 2200, 2800, 2500],
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
        borderColor: 'rgb(14, 165, 233)',
        borderWidth: 2,
      },
      {
        label: 'Costos',
        data: [800, 850, 750, 950, 1100, 1400, 1300],
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
      },
    ],
  };

  const profitData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Ganancia Neta',
        data: [400, 650, 550, 850, 1100, 1400, 1200],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const dishesData = {
    labels: ['Lomo Saltado', 'Ceviche', 'Ají de Gallina', 'Arroz con Mariscos', 'Causa Rellena', 'Otros'],
    datasets: [
      {
        data: [30, 22, 18, 15, 10, 5],
        backgroundColor: [
          'rgba(14, 165, 233, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(156, 163, 175, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const ingredientUsageData = {
    labels: ['Arroz', 'Pollo', 'Pescado', 'Papas', 'Limones', 'Cebollas', 'Tomates', 'Aceite'],
    datasets: [
      {
        label: 'Uso de Ingredientes (kg)',
        data: [25, 18, 15, 12, 8, 7, 6, 5],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
    ],
  };
  
  // Datos simulados para la tabla de rentabilidad por plato
  const dishProfitability = [
    { id: 1, name: 'Lomo Saltado', sales: 120, revenue: 'S/. 4,200.00', cost: 'S/. 1,512.00', profit: 'S/. 2,688.00', margin: '64%' },
    { id: 2, name: 'Ceviche', sales: 95, revenue: 'S/. 3,800.00', cost: 'S/. 1,140.00', profit: 'S/. 2,660.00', margin: '70%' },
    { id: 3, name: 'Ají de Gallina', sales: 85, revenue: 'S/. 2,550.00', cost: 'S/. 1,020.00', profit: 'S/. 1,530.00', margin: '60%' },
    { id: 4, name: 'Arroz con Mariscos', sales: 70, revenue: 'S/. 3,150.00', cost: 'S/. 1,417.50', profit: 'S/. 1,732.50', margin: '55%' },
    { id: 5, name: 'Causa Rellena', sales: 65, revenue: 'S/. 1,625.00', cost: 'S/. 650.00', profit: 'S/. 975.00', margin: '60%' },
  ];
  
  // Datos simulados para la tabla de uso de ingredientes
  const ingredientUsage = [
    { id: 1, name: 'Arroz', initialStock: '50 kg', consumed: '25 kg', remaining: '25 kg', cost: 'S/. 225.00', dishes: 'Lomo Saltado, Arroz con Mariscos, Ají de Gallina' },
    { id: 2, name: 'Pollo', initialStock: '30 kg', consumed: '18 kg', remaining: '12 kg', cost: 'S/. 360.00', dishes: 'Ají de Gallina, Causa Rellena' },
    { id: 3, name: 'Pescado', initialStock: '25 kg', consumed: '15 kg', remaining: '10 kg', cost: 'S/. 450.00', dishes: 'Ceviche, Arroz con Mariscos' },
    { id: 4, name: 'Papas', initialStock: '40 kg', consumed: '12 kg', remaining: '28 kg', cost: 'S/. 96.00', dishes: 'Lomo Saltado, Causa Rellena' },
    { id: 5, name: 'Limones', initialStock: '15 kg', consumed: '8 kg', remaining: '7 kg', cost: 'S/. 64.00', dishes: 'Ceviche, Causa Rellena' },
  ];
  
  // Datos simulados para las tarjetas de KPI
  const kpis = {
    totalRevenue: 'S/. 15,325.00',
    totalCost: 'S/. 5,740.00',
    totalProfit: 'S/. 9,585.00',
    averageMargin: '62.5%',
    bestSellingDish: 'Lomo Saltado',
    mostProfitableDish: 'Ceviche',
    wasteReduction: '15%',
  };
  
  return (
    <Layout title="Análisis Económico">
      <div className="mb-6">
        {/* Filtros y controles */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-lg shadow-sm p-1">
              <button 
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${timePeriod === 'day' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm active:scale-95'}`}
                onClick={() => setTimePeriod('day')}
              >
                Día
              </button>
              <button 
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${timePeriod === 'week' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm active:scale-95'}`}
                onClick={() => setTimePeriod('week')}
              >
                Semana
              </button>
              <button 
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${timePeriod === 'month' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm active:scale-95'}`}
                onClick={() => setTimePeriod('month')}
              >
                Mes
              </button>
            </div>
            
            <div className="relative">
              <button className="flex items-center px-3 py-2 bg-white rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                <FaCalendarAlt className="mr-2 text-gray-500" />
                Octubre 2023
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">


{showFilterModal && (
  <div style={modalStyles.overlay}>
    <div style={modalStyles.modal}>
      <button 
        style={modalStyles.closeBtn}
        onClick={toggleFilterModal}
      >
        ×
      </button>
      <h2 className="text-xl font-bold mb-4">Filtros</h2>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Categorías:</h3>
        <div className="grid grid-cols-2 gap-2">
          {['Todos', 'Entradas', 'Platos principales', 'Postres', 'Bebidas', 'Especiales'].map((cat) => (
            <label key={cat} className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={selectedCategory === cat.toLowerCase().replace(' ', '_')}
                onChange={() => setSelectedCategory(cat.toLowerCase().replace(' ', '_'))}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Rango de fechas:</h3>
        <div className="flex space-x-2">
          <input 
            type="date" 
            className="border rounded-md p-2 w-full"
            placeholder="Fecha inicio"
          />
          <span className="flex items-center">a</span>
          <input 
            type="date" 
            className="border rounded-md p-2 w-full"
            placeholder="Fecha fin"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Margen de ganancia:</h3>
        <div className="flex items-center">
          <input 
            type="range" 
            min="0" 
            max="100" 
            className="w-full mr-2"
          />
          <span>50%</span>
        </div>
      </div>
      
      <button 
        className="w-full py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        onClick={toggleFilterModal}
      >
        Aplicar Filtros
      </button>
    </div>
  </div>
)}

<button 
  className="flex items-center px-4 py-2.5 bg-white rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 hover:shadow-md active:scale-95 group border border-gray-200"
  onClick={toggleFilterModal}
>
  <FaFilter className="mr-2 text-gray-500 group-hover:text-primary-600 transition-colors" />
  Filtrar
</button>
            <button 
              className="flex items-center px-4 py-2.5 bg-primary-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-primary-700 transition-all duration-200 hover:shadow-md active:scale-95 group"
              onClick={toggleExportModal}
            >
              <FaDownload className="mr-2 text-white" />
              Exportar
            </button>
            {showExportModal && (
                <div style={modalStyles.overlay} onClick={toggleExportModal}>
                  <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
                    <button 
                      style={{
                        ...modalStyles.closeBtn,
                        color: '#ff4444',
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        '&:hover': {
                          color: '#cc0000',
                          transform: 'scale(1.1)'
                        }
                      }}
                      onClick={toggleExportModal}
                      aria-label="Cerrar modal"
                    >
                      ×
                    </button>
                    <h2 className="text-xl font-bold mb-4">Vista Previa de Exportación</h2>
                    
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Datos a exportar:</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="mb-2">• Información económica completa</p>
                        <p className="mb-2">• Gráficos y tablas visibles</p>
                        <p>• Período seleccionado: {timePeriod}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Formato de exportación:</h3>
                      <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                          Excel (.xlsx)
                        </button>
                        <button className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200">
                          PDF (.pdf)
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                          CSV (.csv)
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                      onClick={toggleExportModal}
                    >
                      Confirmar Exportación
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
        
        {/* Tarjetas de KPI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="dashboard-card flex items-center">
            <div className="rounded-full p-3 bg-blue-100 mr-4">
              <FaChartLine className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-500">Ingresos Totales</h3>
              <p className="text-2xl font-bold">{kpis.totalRevenue}</p>
              <p className="text-sm text-green-500">+8% vs. semana anterior</p>
            </div>
          </div>
          
          <div className="dashboard-card flex items-center">
            <div className="rounded-full p-3 bg-green-100 mr-4">
              <FaChartPie className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-500">Ganancia Neta</h3>
              <p className="text-2xl font-bold">{kpis.totalProfit}</p>
              <p className="text-sm text-green-500">+12% vs. semana anterior</p>
            </div>
          </div>
          
          <div className="dashboard-card flex items-center">
            <div className="rounded-full p-3 bg-yellow-100 mr-4">
              <FaExchangeAlt className="h-6 w-6 text-warning" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-500">Margen Promedio</h3>
              <p className="text-2xl font-bold">{kpis.averageMargin}</p>
              <p className="text-sm text-green-500">+2.5% vs. semana anterior</p>
            </div>
          </div>
          
          <div className="dashboard-card flex items-center">
            <div className="rounded-full p-3 bg-red-100 mr-4">
              <FaUtensils className="h-6 w-6 text-danger" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-500">Plato Más Vendido</h3>
              <p className="text-2xl font-bold">{kpis.bestSellingDish}</p>
              <p className="text-sm text-gray-500">120 unidades</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gráfico de Ingresos vs Costos */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ingresos vs Costos</h2>
          <div className="h-80">
            <Bar 
              data={revenueData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return 'S/. ' + value;
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
        
        {/* Gráfico de Ganancia Neta */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ganancia Neta</h2>
          <div className="h-80">
            <Line 
              data={profitData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return 'S/. ' + value;
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gráfico de Distribución de Ventas por Plato */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Distribución de Ventas por Plato</h2>
          <div className="h-80 flex items-center justify-center">
            <div className="w-3/4 h-full">
              <Doughnut 
                data={dishesData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                  },
                }} 
              />
            </div>
          </div>
        </div>
        
        {/* Gráfico de Uso de Ingredientes */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Uso de Ingredientes</h2>
          <div className="h-80">
            <Bar 
              data={ingredientUsageData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }} 
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Tabla de Rentabilidad por Plato */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Rentabilidad por Plato</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unidades Vendidas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ingresos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Costos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ganancia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Margen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dishProfitability.map((dish) => (
                  <tr key={dish.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{dish.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dish.sales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dish.revenue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dish.cost}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-green-600 font-medium">{dish.profit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-blue-600 font-medium">{dish.margin}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Tabla de Uso de Ingredientes */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Uso de Ingredientes</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ingrediente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Inicial
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consumido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Restante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Costo Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platos Relacionados
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ingredientUsage.map((ingredient) => (
                  <tr key={ingredient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{ingredient.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ingredient.initialStock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ingredient.consumed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ingredient.remaining}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ingredient.cost}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{ingredient.dishes}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Economic;