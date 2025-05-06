import React from 'react';
import Layout from '../components/layout/Layout';
import { FaUtensils, FaTrash, FaExclamationTriangle, FaMoneyBillWave, FaUsers, FaClipboardList, FaChartLine, FaCalendarAlt, FaChair, FaWarehouse } from 'react-icons/fa';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
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

const Dashboard = () => {
  // Datos simulados para los gráficos
  const salesData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Ventas diarias',
        data: [12500, 15000, 10000, 22000, 25000, 30000, 28000],
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
        borderColor: 'rgb(14, 165, 233)',
        borderWidth: 2,
      },
    ],
  };

  const wasteData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Desperdicio (kg)',
        data: [2.3, 1.8, 2.1, 1.5, 1.9, 2.5, 2.2],
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const popularDishesData = {
    labels: ['Lomo Saltado', 'Ceviche', 'Ají de Gallina', 'Arroz con Mariscos', 'Causa Rellena'],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          'rgba(14, 165, 233, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(99, 102, 241, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos simulados para las alertas
  const alerts = [
    { id: 1, type: 'stock', message: 'Arroz por debajo del stock mínimo (5kg)', severity: 'high' },
    { id: 2, type: 'stock', message: 'Limones por debajo del stock mínimo (1kg)', severity: 'high' },
    { id: 3, type: 'stock', message: 'Aceite de oliva por debajo del stock mínimo (2 botellas)', severity: 'medium' },
    { id: 4, type: 'waste', message: 'Alto desperdicio de verduras detectado', severity: 'medium' },
    { id: 5, type: 'prediction', message: 'Se prevé alta demanda de ceviches para el fin de semana', severity: 'low' },
  ];

  // Datos simulados para las mesas
  const tableStatus = {
    total: 20,
    occupied: 5,
    reserved: 3,
    free: 10,
    attended: 2,
  };

  // Datos simulados para el inventario
  const inventoryStatus = {
    total: 120,
    critical: 3,
    warning: 8,
    ok: 109,
  };

  return (
    <Layout title="Dashboard - Resumen General">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="dashboard-card flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500 border-transparent border-2 rounded-xl">
          <div className="rounded-full p-3 bg-blue-100 mr-4">
            <FaUtensils className="h-6 w-6 text-primary-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-500">Platos Servidos Hoy</h3>
            <p className="text-2xl font-bold">142</p>
            <p className="text-sm text-green-500">+12% vs. ayer</p>
          </div>
        </div>

        <div className="dashboard-card flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500 border-transparent border-2 rounded-xl">
          <div className="rounded-full p-3 bg-red-100 mr-4">
            <FaTrash className="h-6 w-6 text-danger" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-500">Desperdicio Estimado</h3>
            <p className="text-2xl font-bold">2.1 kg</p>
            <p className="text-sm text-red-500">+0.3 kg vs. ayer</p>
          </div>
        </div>

        <div className="dashboard-card flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500 border-transparent border-2 rounded-xl">
          <div className="rounded-full p-3 bg-yellow-100 mr-4">
            <FaExclamationTriangle className="h-6 w-6 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-500">Stock Crítico</h3>
            <p className="text-2xl font-bold">{inventoryStatus.critical} productos</p>
            <p className="text-sm text-yellow-500">{inventoryStatus.warning} en alerta</p>
          </div>
        </div>

        <div className="dashboard-card flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500 border-transparent border-2 rounded-xl">
          <div className="rounded-full p-3 bg-green-100 mr-4">
            <FaMoneyBillWave className="h-6 w-6 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-500">Ganancia Neta Hoy</h3>
            <p className="text-2xl font-bold">S/. 3,850</p>
            <p className="text-sm text-green-500">+15% vs. ayer</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Gráfico de Ventas */}
        <div className="dashboard-card lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Ventas Diarias</h2>
            <div className="flex space-x-2">
              <button 
                className="px-3 py-1 text-xs font-medium bg-gray-100 rounded-md transition-all duration-200 hover:bg-gray-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                7 días
              </button>
              <button 
                className="px-3 py-1 text-xs font-medium bg-primary-500 text-white rounded-md transition-all duration-200 hover:bg-primary-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                30 días
              </button>
            </div>
          </div>
          <div className="h-80">
            <Bar 
              data={salesData} 
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

        {/* Platos Populares */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Platos Más Populares</h2>
          <div className="h-80 flex items-center justify-center">
            <Doughnut 
              data={popularDishesData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }} 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Gráfico de Desperdicio */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Desperdicio de Alimentos</h2>
          <div className="h-60">
            <Line 
              data={wasteData} 
              options={{
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
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700 flex items-center">
              <FaChartLine className="mr-2" />
              Reducción del 15% en desperdicio comparado con el mes anterior
            </p>
          </div>
        </div>

        {/* Estado de Mesas */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Estado de Mesas</h2>
          <div className="flex items-center justify-center h-60">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-5xl font-bold text-primary-500 mb-2">{tableStatus.total}</div>
                <div className="text-gray-500">Total de Mesas</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg text-center">
                <div className="text-5xl font-bold text-red-500 mb-2">{tableStatus.occupied}</div>
                <div className="text-gray-500">Ocupadas</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg text-center">
                <div className="text-5xl font-bold text-yellow-500 mb-2">{tableStatus.reserved}</div>
                <div className="text-gray-500">Reservadas</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <div className="text-5xl font-bold text-green-500 mb-2">{tableStatus.free}</div>
                <div className="text-gray-500">Libres</div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button 
              className="btn btn-primary flex items-center transition-all duration-200 hover:bg-primary-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              <FaChair className="mr-2 transition-transform duration-200 group-hover:rotate-6" /> 
              <span className="group-hover:underline">Ver Mapa de Mesas</span>
            </button>
          </div>
        </div>

        {/* Alertas */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Alertas del Sistema</h2>
          <div className="space-y-3 overflow-y-auto" style={{ maxHeight: '250px' }}>
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-3 rounded-lg flex items-start transition-all duration-200 ${alert.severity === 'high' ? 'bg-red-50 hover:bg-red-100' : alert.severity === 'medium' ? 'bg-yellow-50 hover:bg-yellow-100' : 'bg-blue-50 hover:bg-blue-100'} hover:shadow-md hover:-translate-y-0.5 cursor-pointer`}
              >
                <div className={`p-2 rounded-full mr-3 ${alert.severity === 'high' ? 'bg-red-100 text-red-500' : alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-500' : 'bg-blue-100 text-blue-500'}`}>
                  {alert.type === 'stock' ? <FaWarehouse /> : 
                   alert.type === 'waste' ? <FaTrash /> : 
                   <FaCalendarAlt />}
                </div>
                <div>
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {alert.severity === 'high' ? 'Acción inmediata requerida' : 
                     alert.severity === 'medium' ? 'Atención necesaria' : 
                     'Información'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <button 
              className="btn btn-secondary flex items-center transition-all duration-200 hover:bg-secondary-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              <FaClipboardList className="mr-2 transition-transform duration-200 group-hover:rotate-6" /> 
              <span className="group-hover:underline">Ver Todas las Alertas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Próximas Actividades */}
      <div className="dashboard-card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Próximas Actividades</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actividad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Hoy, 15:00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Recepción de productos frescos</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Carlos Mendoza</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mañana, 10:00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Inventario semanal</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">María López</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Programado</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Viernes, 18:00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Preparación para evento especial</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Todo el equipo</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Programado</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sábado, 20:00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Evento corporativo (25 personas)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Javier Ramírez</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Confirmado</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;