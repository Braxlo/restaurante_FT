import React from 'react';
import { Line } from 'react-chartjs-2';

/**
 * Componente reutilizable para mostrar gráficos de línea progresiva
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.labels - Etiquetas para el eje X
 * @param {Array} props.datasets - Conjuntos de datos para el gráfico
 * @param {string} props.title - Título del gráfico (opcional)
 * @param {string} props.yAxisPrefix - Prefijo para los valores del eje Y (opcional)
 * @param {string} props.yAxisSuffix - Sufijo para los valores del eje Y (opcional)
 * @param {number} props.height - Altura del gráfico en píxeles (opcional, por defecto 300)
 * @param {boolean} props.showGrid - Mostrar cuadrícula (opcional, por defecto true)
 * @param {boolean} props.showLegend - Mostrar leyenda (opcional, por defecto true)
 * @param {string} props.legendPosition - Posición de la leyenda (opcional, por defecto 'top')
 */
const ProgressiveLineChart = ({
  labels,
  datasets,
  title,
  yAxisPrefix = '',
  yAxisSuffix = '',
  height = 300,
  showGrid = true,
  showLegend = true,
  legendPosition = 'top',
}) => {
  // Configuración de datos para el gráfico
  const data = {
    labels,
    datasets: datasets.map(dataset => ({
      ...dataset,
      tension: 0.4, // Hace que las líneas sean curvas para un aspecto más progresivo
      pointRadius: 2, // Tamaño de los puntos
      pointHoverRadius: 5, // Tamaño de los puntos al pasar el mouse
    })),
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: legendPosition,
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#374151', // text-gray-700
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.8)', // bg-gray-900 con opacidad
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += yAxisPrefix + context.parsed.y + yAxisSuffix;
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: showGrid,
          color: 'rgba(229, 231, 235, 0.5)', // bg-gray-200 con opacidad
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#6B7280', // text-gray-500
        },
      },
      y: {
        beginAtZero: false, // Permite que el eje Y se ajuste automáticamente a los datos
        grid: {
          display: showGrid,
          color: 'rgba(229, 231, 235, 0.5)', // bg-gray-200 con opacidad
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#6B7280', // text-gray-500
          callback: function(value) {
            return yAxisPrefix + value + yAxisSuffix;
          }
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        borderWidth: 1,
        backgroundColor: 'white',
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
      },
    },
  };

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressiveLineChart;