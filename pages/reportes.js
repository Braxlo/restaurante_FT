import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaChartLine, FaChartBar, FaChartPie, FaTable } from 'react-icons/fa';

const Reportes = () => {
  const [activeTab, setActiveTab] = useState('ventas');

  // Datos de ejemplo para los reportes
  const [salesData] = useState([
    { mes: 'Ene', ventas: 12000 },
    { mes: 'Feb', ventas: 19000 },
    { mes: 'Mar', ventas: 15000 },
    { mes: 'Abr', ventas: 18000 },
    { mes: 'May', ventas: 21000 },
    { mes: 'Jun', ventas: 25000 },
  ]);

  const [ordersData] = useState([
    { hora: '12:00', pedidos: 15 },
    { hora: '13:00', pedidos: 25 },
    { hora: '14:00', pedidos: 18 },
    { hora: '15:00', pedidos: 12 },
    { hora: '16:00', pedidos: 8 },
    { hora: '17:00', pedidos: 10 },
  ]);

  const [clientsData] = useState([
    { tipo: 'Nuevos', cantidad: 45 },
    { tipo: 'Regulares', cantidad: 120 },
    { tipo: 'Frecuentes', cantidad: 75 },
  ]);

  return (
    <Layout title="Reportes">
      <div className="grid grid-cols-1 gap-6">
        {/* Pestañas de navegación */}
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'ventas' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('ventas')}
          >
            <FaChartLine className="mr-2" /> Ventas
          </button>
          <button
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'pedidos' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('pedidos')}
          >
            <FaChartBar className="mr-2" /> Pedidos
          </button>
          <button
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'clientes' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('clientes')}
          >
            <FaChartPie className="mr-2" /> Clientes
          </button>
        </div>

        {/* Contenido de las pestañas */}
        <div className="dashboard-card">
          {activeTab === 'ventas' && (
            <div>
              <h3 className="text-lg font-bold mb-4">Reporte de Ventas Mensuales</h3>
              {/* Aquí iría el gráfico de ventas */}
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <p className="text-gray-500">Gráfico de ventas mensuales</p>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2 flex items-center">
                  <FaTable className="mr-2" /> Datos de Ventas
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 text-left">Mes</th>
                        <th className="py-2 px-4 text-left">Ventas (S/.)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {salesData.map((item, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4">{item.mes}</td>
                          <td className="py-2 px-4">{item.ventas.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pedidos' && (
            <div>
              <h3 className="text-lg font-bold mb-4">Reporte de Pedidos por Hora</h3>
              {/* Aquí iría el gráfico de pedidos */}
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <p className="text-gray-500">Gráfico de pedidos por hora</p>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2 flex items-center">
                  <FaTable className="mr-2" /> Datos de Pedidos
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 text-left">Hora</th>
                        <th className="py-2 px-4 text-left">Pedidos</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {ordersData.map((item, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4">{item.hora}</td>
                          <td className="py-2 px-4">{item.pedidos}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clientes' && (
            <div>
              <h3 className="text-lg font-bold mb-4">Reporte de Clientes</h3>
              {/* Aquí iría el gráfico de clientes */}
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <p className="text-gray-500">Gráfico de distribución de clientes</p>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2 flex items-center">
                  <FaTable className="mr-2" /> Datos de Clientes
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 text-left">Tipo de Cliente</th>
                        <th className="py-2 px-4 text-left">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {clientsData.map((item, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4">{item.tipo}</td>
                          <td className="py-2 px-4">{item.cantidad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Reportes;