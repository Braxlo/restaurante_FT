import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaCalendarAlt, FaChartLine, FaChartPie, FaChartBar, FaFilter, FaDownload } from 'react-icons/fa';
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

const Analytics = () => {
  // Estado para controlar el período de tiempo seleccionado
  const [timePeriod, setTimePeriod] = useState('week');

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

  const profitabilityData = {
    labels: ['Lomo Saltado', 'Ceviche', 'Ají de Gallina', 'Arroz con Mariscos', 'Causa Rellena'],
    datasets: [
      {
        label: 'Margen de Ganancia (%)',
        data: [65, 72, 58, 62, 70],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(16, 185, 129, 0.7)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(16, 185, 129)',
          'rgb(16, 185, 129)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos simulados para la tabla de platos más rentables
  const topDishes = [
    { id: 1, name: 'Ceviche', sold: 45, revenue: 'S/. 1,800.00', cost: 'S/. 504.00', profit: 'S/. 1,296.00', margin: '72%' },
    { id: 2, name: 'Lomo Saltado', sold: 58, revenue: 'S/. 2,030.00', cost: 'S/. 710.50', profit: 'S/. 1,319.50', margin: '65%' },
    { id: 3, name: 'Causa Rellena', sold: 32, revenue: 'S/. 800.00', cost: 'S/. 240.00', profit: 'S/. 560.00', margin: '70%' },
    { id: 4, name: 'Arroz con Mariscos', sold: 38, revenue: 'S/. 1,710.00', cost: 'S/. 649.80', profit: 'S/. 1,060.20', margin: '62%' },
    { id: 5, name: 'Ají de Gallina', sold: 42, revenue: 'S/. 1,260.00', cost: 'S/. 529.20', profit: 'S/. 730.80', margin: '58%' },
  ];

  return (
    <Layout title="Análisis Económico">
      {/* Filtros y controles */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="flex items-center bg-white rounded-lg shadow-sm p-1">
            <button 
              className={`px-4 py-2 rounded-md ${timePeriod === 'day' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setTimePeriod('day')}
            >
              Día
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${timePeriod === 'week' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setTimePeriod('week')}
            >
              Semana
            </button>
            <button 
              className={`px-4 py-2 rounded-md ${timePeriod === 'month' ? 'bg-primary-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setTimePeriod('month')}
            >
              Mes
            </button>
          </div>
          
          <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
            <FaCalendarAlt className="mr-2" />
            Seleccionar Fechas
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
            <FaFilter className="mr-2" />
            Filtros
          </button>
          <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
            <FaDownload className="mr-2" />
            Exportar
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-medium text-gray-500">Ingresos Totales</h3>
          <p className="text-3xl font-bold text-gray-800">S/. 12,500</p>
          <div className="mt-2 text-sm text-green-500 flex items-center">
            <FaChartLine className="mr-1" /> +8.2% vs. semana anterior
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-medium text-gray-500">Costos Totales</h3>
          <p className="text-3xl font-bold text-gray-800">S/. 6,850</p>
          <div className="mt-2 text-sm text-red-500 flex items-center">
            <FaChartLine className="mr-1" /> +3.5% vs. semana anterior
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-medium text-gray-500">Ganancia Neta</h3>
          <p className="text-3xl font-bold text-gray-800">S/. 5,650</p>
          <div className="mt-2 text-sm text-green-500 flex items-center">
            <FaChartLine className="mr-1" /> +12.8% vs. semana anterior
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-medium text-gray-500">Margen Promedio</h3>
          <p className="text-3xl font-bold text-gray-800">65.4%</p>
          <div className="mt-2 text-sm text-green-500 flex items-center">
            <FaChartLine className="mr-1" /> +2.1% vs. semana anterior
          </div>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">Ingresos vs. Costos</h3>
            <div className="text-sm text-gray-500">Últimos 7 días</div>
          </div>
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

        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">Ganancia Neta</h3>
            <div className="text-sm text-gray-500">Últimos 7 días</div>
          </div>
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

      {/* Análisis de platos y productos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Distribución de Ventas por Plato</h3>
          <div className="h-64">
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

        <div className="dashboard-card">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Uso de Ingredientes</h3>
          <div className="h-64">
            <Bar 
              data={ingredientUsageData} 
              options={{
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }} 
            />
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Margen de Ganancia por Plato</h3>
          <div className="h-64">
            <Bar 
              data={profitabilityData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: function(value) {
                        return value + '%';
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Tabla de platos más rentables */}
      <div className="dashboard-card">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Platos Más Rentables</h3>
        
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Plato</th>
                <th className="table-header-cell">Unidades Vendidas</th>
                <th className="table-header-cell">Ingresos</th>
                <th className="table-header-cell">Costo</th>
                <th className="table-header-cell">Ganancia</th>
                <th className="table-header-cell">Margen</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {topDishes.map((dish) => (
                <tr key={dish.id} className="table-row">
                  <td className="table-cell font-medium text-gray-800">{dish.name}</td>
                  <td className="table-cell">{dish.sold}</td>
                  <td className="table-cell">{dish.revenue}</td>
                  <td className="table-cell">{dish.cost}</td>
                  <td className="table-cell font-medium text-green-600">{dish.profit}</td>
                  <td className="table-cell">
                    <div className="flex items-center">
                      <span className="mr-2">{dish.margin}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: dish.margin }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights y recomendaciones */}
      <div className="dashboard-card mt-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Insights y Recomendaciones</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-700 mb-2">Oportunidades de Mejora</h4>
            <ul className="space-y-2 text-blue-600">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                <span>El Ají de Gallina tiene el margen más bajo (58%). Considere ajustar la receta o el precio para mejorar la rentabilidad.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                <span>Los días martes y miércoles muestran menor rentabilidad. Evalúe promociones especiales para estos días.</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-700 mb-2">Tendencias Positivas</h4>
            <ul className="space-y-2 text-green-600">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                <span>El Ceviche tiene el margen más alto (72%) y muestra una tendencia creciente en ventas (+15% esta semana).</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                <span>Los fines de semana (viernes a domingo) generan el 60% de los ingresos semanales.</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-700 mb-2">Optimización de Inventario</h4>
            <ul className="space-y-2 text-yellow-600">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
                <span>El arroz representa el mayor consumo de ingredientes. Considere compras al por mayor para reducir costos.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
                <span>El uso de limones ha disminuido un 10%. Ajuste las compras para evitar desperdicios.</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-700 mb-2">Predicciones</h4>
            <ul className="space-y-2 text-purple-600">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <span>Se proyecta un incremento del 12% en ventas para la próxima semana basado en tendencias históricas.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mt-1.5 mr-2"></span>
                <span>El costo de ingredientes podría aumentar un 5% el próximo mes según tendencias de mercado.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;