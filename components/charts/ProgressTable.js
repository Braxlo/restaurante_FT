import React from 'react';
import { FaArrowUp, FaArrowDown, FaEquals } from 'react-icons/fa';
import ProgressiveLineChart from './ProgressiveLineChart';

/**
 * Componente de tabla de progreso que muestra datos con tendencias y gráficos de línea
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.data - Datos para la tabla
 * @param {Array} props.columns - Configuración de columnas
 * @param {Array} props.timeLabels - Etiquetas para el eje X del gráfico de línea
 * @param {string} props.title - Título de la tabla (opcional)
 */
const ProgressTable = ({ data, columns, timeLabels, title }) => {
  // Función para renderizar el indicador de tendencia
  const renderTrend = (trend) => {
    if (!trend || trend === 0) {
      return (
        <span className="flex items-center text-gray-500">
          <FaEquals className="mr-1" size={10} />
          <span>0%</span>
        </span>
      );
    }
    
    if (trend > 0) {
      return (
        <span className="flex items-center text-green-500">
          <FaArrowUp className="mr-1" size={10} />
          <span>+{trend}%</span>
        </span>
      );
    }
    
    return (
      <span className="flex items-center text-red-500">
        <FaArrowDown className="mr-1" size={10} />
        <span>{trend}%</span>
      </span>
    );
  };

  // Función para generar datos de gráfico a partir de los datos históricos
  const generateChartData = (historyData) => {
    if (!historyData || !Array.isArray(historyData) || historyData.length === 0) {
      return null;
    }

    return {
      labels: timeLabels,
      datasets: [
        {
          label: 'Progreso',
          data: historyData,
          borderColor: 'rgb(14, 165, 233)',
          backgroundColor: 'rgba(14, 165, 233, 0.2)',
          fill: true,
        },
      ],
    };
  };

  return (
    <div className="dashboard-card">
      {title && <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={column.width ? { width: column.width } : {}}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column, colIndex) => {
                  // Renderizar diferentes tipos de celdas según el tipo de columna
                  if (column.type === 'chart' && row[column.key]) {
                    const chartData = generateChartData(row[column.key]);
                    return (
                      <td key={colIndex} className="px-6 py-4">
                        {chartData && (
                          <div className="h-20 w-48">
                            <ProgressiveLineChart 
                              labels={chartData.labels}
                              datasets={chartData.datasets}
                              height={80}
                              showLegend={false}
                              showGrid={false}
                            />
                          </div>
                        )}
                      </td>
                    );
                  }
                  
                  if (column.type === 'trend') {
                    return (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                        {renderTrend(row[column.key])}
                      </td>
                    );
                  }
                  
                  if (column.type === 'status') {
                    const status = row[column.key];
                    let statusClass = '';
                    
                    if (status === 'success' || status === 'bueno' || status === 'alto') {
                      statusClass = 'bg-green-100 text-green-800';
                    } else if (status === 'warning' || status === 'medio' || status === 'regular') {
                      statusClass = 'bg-yellow-100 text-yellow-800';
                    } else if (status === 'danger' || status === 'bajo' || status === 'crítico') {
                      statusClass = 'bg-red-100 text-red-800';
                    } else {
                      statusClass = 'bg-gray-100 text-gray-800';
                    }
                    
                    return (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
                          {row[column.key]}
                        </span>
                      </td>
                    );
                  }
                  
                  // Columna de texto predeterminada
                  return (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {column.format ? column.format(row[column.key]) : row[column.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgressTable;