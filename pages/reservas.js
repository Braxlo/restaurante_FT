import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaCalendarAlt, FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';

const Reservas = () => {
  const [reservas, setReservas] = useState([
    {
      id: 1,
      cliente: 'Juan Pérez',
      fecha: '2023-11-15',
      hora: '19:00',
      personas: 4,
      mesa: 5,
      estado: 'confirmada'
    },
    {
      id: 2,
      cliente: 'María Gómez',
      fecha: '2023-11-16',
      hora: '20:30',
      personas: 2,
      mesa: 3,
      estado: 'pendiente'
    }
  ]);

  const [nuevaReserva, setNuevaReserva] = useState({
    cliente: '',
    fecha: '',
    hora: '',
    personas: 2,
    mesa: '',
    estado: 'pendiente'
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtroFecha, setFiltroFecha] = useState('');

  const handleAgregarReserva = () => {
    setReservas([...reservas, { ...nuevaReserva, id: reservas.length + 1 }]);
    setNuevaReserva({
      cliente: '',
      fecha: '',
      hora: '',
      personas: 2,
      mesa: '',
      estado: 'pendiente'
    });
    setMostrarModal(false);
  };

  const handleEliminarReserva = (id) => {
    setReservas(reservas.filter(reserva => reserva.id !== id));
  };

  const reservasFiltradas = filtroFecha
    ? reservas.filter(reserva => reserva.fecha === filtroFecha)
    : reservas;

  return (
    <Layout title="Gestión de Reservas">
      <div className="grid grid-cols-1 gap-6">
        {/* Filtros y botón de nueva reserva */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="date"
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
                className="input pl-10"
              />
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button className="btn btn-secondary flex items-center">
              <FaFilter className="mr-2" /> Filtrar
            </button>
          </div>
          
          <button 
            onClick={() => setMostrarModal(true)}
            className="btn btn-primary flex items-center"
          >
            <FaPlus className="mr-2" /> Nueva Reserva
          </button>
        </div>

        {/* Tabla de reservas */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Cliente</th>
                <th className="py-3 px-4 text-left">Fecha</th>
                <th className="py-3 px-4 text-left">Hora</th>
                <th className="py-3 px-4 text-left">Personas</th>
                <th className="py-3 px-4 text-left">Mesa</th>
                <th className="py-3 px-4 text-left">Estado</th>
                <th className="py-3 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reservasFiltradas.map(reserva => (
                <tr key={reserva.id}>
                  <td className="py-3 px-4">{reserva.cliente}</td>
                  <td className="py-3 px-4">{reserva.fecha}</td>
                  <td className="py-3 px-4">{reserva.hora}</td>
                  <td className="py-3 px-4">{reserva.personas}</td>
                  <td className="py-3 px-4">{reserva.mesa}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${reserva.estado === 'confirmada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {reserva.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleEliminarReserva(reserva.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal para nueva reserva */}
        {mostrarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Nueva Reserva</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                  <input
                    type="text"
                    value={nuevaReserva.cliente}
                    onChange={(e) => setNuevaReserva({...nuevaReserva, cliente: e.target.value})}
                    className="input"
                    placeholder="Nombre del cliente"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={nuevaReserva.fecha}
                        onChange={(e) => setNuevaReserva({...nuevaReserva, fecha: e.target.value})}
                        className="input pl-10"
                      />
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                    <input
                      type="time"
                      value={nuevaReserva.hora}
                      onChange={(e) => setNuevaReserva({...nuevaReserva, hora: e.target.value})}
                      className="input"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Personas</label>
                    <input
                      type="number"
                      min="1"
                      value={nuevaReserva.personas}
                      onChange={(e) => setNuevaReserva({...nuevaReserva, personas: parseInt(e.target.value)})}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mesa</label>
                    <input
                      type="number"
                      min="1"
                      value={nuevaReserva.mesa}
                      onChange={(e) => setNuevaReserva({...nuevaReserva, mesa: parseInt(e.target.value)})}
                      className="input"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setMostrarModal(false)}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleAgregarReserva}
                  className="btn btn-primary"
                >
                  Guardar Reserva
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Reservas;