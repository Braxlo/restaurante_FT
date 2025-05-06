import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaCalendarAlt, FaChartLine, FaFilter, FaDownload } from 'react-icons/fa';
import ProgressiveLineChart from '../components/charts/ProgressiveLineChart';
import ProgressTable from '../components/charts/ProgressTable';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend
);

const Progress = () => {
  // Estado para controlar el período de tiempo seleccionado
  const [timePeriod, setTimePeriod] = useState('week');
  
  // Estados para los modales
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Estados para los filtros
  const [filterType, setFilterType] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Estados para la exportación
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportRange, setExportRange] = useState('current');
  
  // Función para aplicar filtros
  const applyFilters = () => {
    // Lógica para aplicar filtros
    setShowFilterModal(false);
  };
  
  // Función para manejar exportación
  const handleExport = () => {
    // Lógica para exportar datos
    setShowExportModal(false);
  };

  // Datos simulados para los gráficos de progreso
  const progressData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Ventas',
        data: [12500, 15000, 14000, 18000, 22000, 19000, 23000, 25000, 23000, 26000, 28000, 30000],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        fill: true,
      },
      {
        label: 'Costos',
        data: [8000, 9500, 9000, 10500, 12000, 11000, 13000, 14000, 13500, 15000, 16000, 17000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        fill: true,
      },
    ],
  };

  const profitProgressData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Ganancia Neta',
        data: [4500, 5500, 5000, 7500, 10000, 8000, 10000, 11000, 9500, 11000, 12000, 13000],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true,
      },
    ],
  };

  // Datos simulados para la tabla de progreso de platos
  const dishProgressData = [
    { 
      id: 1, 
      name: 'Lomo Saltado', 
      currentSales: 120, 
      previousSales: 105, 
      trend: 14, 
      revenue: 'S/. 4,200.00', 
      status: 'alto',
      history: [95, 100, 90, 105, 110, 115, 120]
    },
    { 
      id: 2, 
      name: 'Ceviche', 
      currentSales: 95, 
      previousSales: 85, 
      trend: 12, 
      revenue: 'S/. 3,800.00', 
      status: 'alto',
      history: [75, 80, 85, 90, 85, 90, 95]
    },
    { 
      id: 3, 
      name: 'Ají de Gallina', 
      currentSales: 85, 
      previousSales: 90, 
      trend: -5, 
      revenue: 'S/. 2,550.00', 
      status: 'medio',
      history: [95, 90, 85, 80, 85, 80, 85]
    },
    { 
      id: 4, 
      name: 'Arroz con Mariscos', 
      currentSales: 70, 
      previousSales: 65, 
      trend: 8, 
      revenue: 'S/. 3,150.00', 
      status: 'medio',
      history: [60, 65, 60, 65, 70, 65, 70]
    },
    { 
      id: 5, 
      name: 'Causa Rellena', 
      currentSales: 65, 
      previousSales: 50, 
      trend: 30, 
      revenue: 'S/. 1,625.00', 
      status: 'alto',
      history: [40, 45, 50, 55, 60, 60, 65]
    },
  ];

  // Datos simulados para la tabla de progreso de ingredientes
  const ingredientProgressData = [
    { 
      id: 1, 
      name: 'Arroz', 
      currentUsage: '25 kg', 
      previousUsage: '28 kg', 
      trend: -11, 
      cost: 'S/. 225.00', 
      status: 'bueno',
      history: [30, 29, 28, 27, 26, 25, 25]
    },
    { 
      id: 2, 
      name: 'Pollo', 
      currentUsage: '18 kg', 
      previousUsage: '15 kg', 
      trend: 20, 
      cost: 'S/. 360.00', 
      status: 'regular',
      history: [14, 15, 16, 17, 18, 17, 18]
    },
    { 
      id: 3, 
      name: 'Pescado', 
      currentUsage: '15 kg', 
      previousUsage: '12 kg', 
      trend: 25, 
      cost: 'S/. 450.00', 
      status: 'regular',
      history: [10, 11, 12, 13, 14, 15, 15]
    },
    { 
      id: 4, 
      name: 'Papas', 
      currentUsage: '12 kg', 
      previousUsage: '14 kg', 
      trend: -14, 
      cost: 'S/. 96.00', 
      status: 'bueno',
      history: [15, 14, 13, 14, 13, 12, 12]
    },
    { 
      id: 5, 
      name: 'Limones', 
      currentUsage: '8 kg', 
      previousUsage: '10 kg', 
      trend: -20, 
      cost: 'S/. 64.00', 
      status: 'bueno',
      history: [12, 11, 10, 9, 8, 8, 8]
    },
  ];

  // Configuración de columnas para la tabla de platos
  const dishColumns = [
    { header: 'Plato', key: 'name' },
    { header: 'Ventas Actuales', key: 'currentSales' },
    { header: 'Ventas Anteriores', key: 'previousSales' },
    { header: 'Tendencia', key: 'trend', type: 'trend' },
    { header: 'Ingresos', key: 'revenue' },
    { header: 'Estado', key: 'status', type: 'status' },
    { header: 'Progreso', key: 'history', type: 'chart', width: '200px' },
  ];

  // Configuración de columnas para la tabla de ingredientes
  const ingredientColumns = [
    { header: 'Ingrediente', key: 'name' },
    { header: 'Uso Actual', key: 'currentUsage' },
    { header: 'Uso Anterior', key: 'previousUsage' },
    { header: 'Tendencia', key: 'trend', type: 'trend' },
    { header: 'Costo', key: 'cost' },
    { header: 'Estado', key: 'status', type: 'status' },
    { header: 'Progreso', key: 'history', type: 'chart', width: '200px' },
  ];

  // Etiquetas para los gráficos de línea en las tablas
  const weekLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  return (
    <Layout title="Progreso y Tendencias">
      {/* Filtros y controles */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 animate-fadeIn">
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-lg shadow-sm p-1 transition-all duration-300 hover:shadow-md">
            <button 
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${timePeriod === 'day' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm active:bg-gray-200 active:shadow-none'}`}
              onClick={() => setTimePeriod('day')}
            >
              Día
            </button>
            <button 
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${timePeriod === 'week' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm active:bg-gray-200 active:shadow-none'}`}
              onClick={() => setTimePeriod('week')}
            >
              Semana
            </button>
            <button 
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${timePeriod === 'month' ? 'bg-primary-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:shadow-sm active:bg-gray-200 active:shadow-none'}`}
              onClick={() => setTimePeriod('month')}
            >
              Mes
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
            onClick={() => setShowFilterModal(true)}
          >
            <FaFilter className="mr-2" />
            Filtrar
          </button>
          
          <button 
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
            onClick={() => setShowExportModal(true)}
          >
            <FaDownload className="mr-2" />
            Exportar
          </button>
        </div>
      </div>

      {/* Gráficos de progreso */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Progreso de Ventas y Costos</h2>
          <div className="h-80">
            <ProgressiveLineChart 
              labels={progressData.labels}
              datasets={progressData.datasets}
              height={320}
              yAxisPrefix="S/. "
            />
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Progreso de Ganancias</h2>
          <div className="h-80">
            <ProgressiveLineChart 
              labels={profitProgressData.labels}
              datasets={profitProgressData.datasets}
              height={320}
              yAxisPrefix="S/. "
            />
          </div>
        </div>
      </div>

      {/* Tablas de progreso */}
      <div className="space-y-6">
        <ProgressTable 
          title="Progreso de Platos"
          data={dishProgressData}
          columns={dishColumns}
          timeLabels={weekLabels}
        />

        <ProgressTable 
          title="Progreso de Ingredientes"
          data={ingredientProgressData}
          columns={ingredientColumns}
          timeLabels={weekLabels}
        />
      </div>

      {/* Resumen de tendencias */}
      <div className="dashboard-card mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen de Tendencias</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-700 mb-2">Tendencias Positivas</h4>
            <ul className="space-y-2 text-green-600">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                <span>La Causa Rellena muestra el mayor crecimiento en ventas (+30%) este mes.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                <span>Reducción en el uso de arroz (-11%) y limones (-20%) manteniendo la calidad.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                <span>Las ganancias netas muestran una tendencia al alza constante durante los últimos 6 meses.</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-700 mb-2">Áreas de Atención</h4>
            <ul className="space-y-2 text-yellow-600">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
                <span>El Ají de Gallina muestra una disminución en ventas (-5%) que requiere atención.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
                <span>Aumento en el uso de pollo (+20%) y pescado (+25%) que podría afectar los márgenes.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mt-1.5 mr-2"></span>
                <span>Los costos están creciendo a un ritmo similar a los ingresos, limitando el crecimiento de ganancias.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;