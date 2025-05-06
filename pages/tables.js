import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { FaCircle, FaEye, FaHistory, FaUtensils, FaTimes } from 'react-icons/fa';

// Estilos para el modal y fondo oscurecido
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
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    padding: '2rem',
    minWidth: '340px',
    maxWidth: '95vw',
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
  },
};

const Tables = () => {
  // Estado para controlar qué mesa está seleccionada para ver detalles
  const [selectedTable, setSelectedTable] = useState(null);
  // Estado para actualizar el estado de la mesa seleccionada
  const [selectedTableStatus, setSelectedTableStatus] = useState(null);
  // Estado para el filtro de mesas
  const [filterStatus, setFilterStatus] = useState('all');
  // Estado para las mesas (declaración agregada al inicio)
  const [tables, setTables] = useState([
    { id: 1, number: 1, capacity: 4, section: 'Principal', shape: 'circular', status: 'free' },
    { id: 2, number: 2, capacity: 2, section: 'Principal', shape: 'rectangular', status: 'occupied' },
    { id: 3, number: 3, capacity: 6, section: 'Terraza', shape: 'circular', status: 'reserved' },
    { id: 4, number: 4, capacity: 4, section: 'Principal', shape: 'circular', status: 'attended' },
    { id: 5, number: 5, capacity: 2, section: 'Terraza', shape: 'rectangular', status: 'free' },
    { id: 6, number: 6, capacity: 6, section: 'Principal', shape: 'circular', status: 'occupied' },
    { id: 7, number: 7, capacity: 4, section: 'Principal', shape: 'circular', status: 'reserved' },
    { id: 8, number: 8, capacity: 2, section: 'Terraza', shape: 'rectangular', status: 'free' },
    { id: 9, number: 9, capacity: 6, section: 'Principal', shape: 'circular', status: 'attended' },
    { id: 10, number: 10, capacity: 4, section: 'Terraza', shape: 'circular', status: 'free' }
  ]);

  // Filtrado de mesas según el estado seleccionado
  const filteredTables = filterStatus === 'all' ? tables : tables.filter(table => table.status === filterStatus);

  // Panel de resumen de estados de mesas
  const statusSummary = [
    { label: 'Libres', icon: <FaCircle style={{color:'#22c55e'}} />, count: tables.filter(t => t.status === 'free').length },
    { label: 'Ocupadas', icon: <FaCircle style={{color:'red'}} />, count: tables.filter(t => t.status === 'occupied').length },
    { label: 'Reservadas', icon: <FaCircle style={{color:'#f59e42'}} />, count: tables.filter(t => t.status === 'reserved').length },
    { label: 'Atendidas', icon: <FaCircle style={{color:'#3b82f6'}} />, count: tables.filter(t => t.status === 'attended').length },
  ];
  // Hooks de estado para los modales
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  // Estado para la orden simulada
  const [orderItems, setOrderItems] = useState([
    { name: 'Lomo Saltado', quantity: 1, price: 35 },
    { name: 'Ceviche', quantity: 0, price: 40 },
    { name: 'Chicha Morada', quantity: 0, price: 8 },
    { name: 'Arroz con Mariscos', quantity: 0, price: 45 },
  ]);

  // Funciones para modificar cantidades en la orden simulada
  const handleAddItem = (index) => {
    setOrderItems(orderItems.map((item, i) => i === index ? { ...item, quantity: item.quantity + 1 } : item));
  };
  const handleRemoveItem = (index) => {
    setOrderItems(orderItems.map((item, i) => i === index && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item));
  };
  
  // Datos simulados del historial de pedidos para la mesa seleccionada
  const orderHistory = [
    {
      id: 1,
      tableNumber: 3,
      date: '2023-10-25',
      time: '1:15 PM',
      items: [
        { name: 'Lomo Saltado', quantity: 2, price: 'S/. 35.00', total: 'S/. 70.00' },
        { name: 'Ceviche', quantity: 1, price: 'S/. 40.00', total: 'S/. 40.00' },
        { name: 'Chicha Morada', quantity: 3, price: 'S/. 8.00', total: 'S/. 24.00' },
        { name: 'Arroz con Mariscos', quantity: 1, price: 'S/. 45.00', total: 'S/. 45.00' },
      ],
      total: 'S/. 179.00',
      status: 'En proceso',
    },
    {
      id: 2,
      tableNumber: 3,
      date: '2023-10-24',
      time: '7:30 PM',
      items: [
        { name: 'Ají de Gallina', quantity: 2, price: 'S/. 30.00', total: 'S/. 60.00' },
        { name: 'Causa Rellena', quantity: 1, price: 'S/. 25.00', total: 'S/. 25.00' },
        { name: 'Inca Kola', quantity: 2, price: 'S/. 7.00', total: 'S/. 14.00' },
      ],
      total: 'S/. 99.00',
      status: 'Completado',
    },
    {
      id: 3,
      tableNumber: 3,
      date: '2023-10-22',
      time: '1:00 PM',
      items: [
        { name: 'Ceviche', quantity: 3, price: 'S/. 40.00', total: 'S/. 120.00' },
        { name: 'Chicha Morada', quantity: 3, price: 'S/. 8.00', total: 'S/. 24.00' },
      ],
      total: 'S/. 144.00',
      status: 'Completado',
    },
  ];

  // Función para obtener el color según el estado de la mesa
  const getStatusColor = (status) => {
    switch (status) {
      case 'free': return 'status-free';
      case 'occupied': return 'status-occupied';
      case 'reserved': return 'status-reserved';
      case 'attended': return 'status-attended';
      default: return 'bg-gray-500';
    }
  };

  // Función para obtener el texto según el estado de la mesa
  const getStatusText = (status) => {
    switch (status) {
      case 'free': return 'Libre';
      case 'occupied': return 'Ocupada';
      case 'reserved': return 'Reservada';
      case 'attended': return 'Atendida';
      default: return 'Desconocido';
    }
  };

  // Animaciones CSS
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideDown { from { transform: translateY(-40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      .btn-modal-primary { background: #2563eb; color: #fff; border-radius: 8px; padding: 0.5rem 1.5rem; font-weight: 600; transition: background 0.2s; border: none; }
      .btn-modal-primary:hover { background: #1d4ed8; }
      .btn-modal-secondary { background: #f3f4f6; color: #374151; border-radius: 8px; padding: 0.5rem 1.5rem; font-weight: 600; border: none; transition: background 0.2s; }
      .btn-modal-secondary:hover { background: #e5e7eb; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Modal reutilizable
  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    return (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <button style={modalStyles.closeBtn} onClick={onClose} aria-label="Cerrar">
            <FaTimes />
          </button>
          <h2 style={{fontSize:'1.5rem',fontWeight:700,marginBottom:'1rem',color:'#1e293b'}}>{title}</h2>
          <div>{children}</div>
        </div>
      </div>
    );
  };

  // Opciones de estado de mesa
  const tableStatusOptions = [
    { value: 'free', label: 'Libre' },
    { value: 'occupied', label: 'Ocupada' },
    { value: 'reserved', label: 'Reservada' },
    { value: 'attended', label: 'Atendida' },
  ];

  // Modal de Tomar Orden con ejemplo visual
  const OrderModalContent = () => {
    const mesaSeleccionada = tables.find(t => t.id === selectedTable);
    const platosConImagen = [
      { name: 'Lomo Saltado', img: 'https://cdn.pixabay.com/photo/2017/01/22/19/20/lomo-saltado-2009597_1280.jpg', desc: 'Salteado de carne con papas, cebolla y tomate.' },
      { name: 'Ceviche', img: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/ceviche-1239306_1280.jpg', desc: 'Pescado fresco marinado en limón con cebolla y ají.' },
      { name: 'Chicha Morada', img: 'https://cdn.pixabay.com/photo/2017/06/02/18/24/chicha-2367022_1280.jpg', desc: 'Bebida tradicional de maíz morado.' },
      { name: 'Arroz con Mariscos', img: 'https://cdn.pixabay.com/photo/2017/01/22/19/20/arroz-con-mariscos-2009596_1280.jpg', desc: 'Arroz con mariscos y especias peruanas.' },
    ];
    const [confirmacion, setConfirmacion] = React.useState(false);
    // Nueva función para manejar el cambio de estado según el flujo
    const cambiarEstadoMesa = (mesa, accion) => {
      let nuevoEstado = mesa.status;
      if (mesa.status === 'free' && accion === 'tomarOrden') nuevoEstado = 'occupied';
      else if (mesa.status === 'occupied' && accion === 'finalizarAtencion') nuevoEstado = 'attended';
      else if (mesa.status === 'attended' && accion === 'nuevaOrden') nuevoEstado = 'free';
      else if (mesa.status === 'reserved' && accion === 'registrarLlegada') nuevoEstado = 'occupied';
      else if ((mesa.status === 'occupied' || mesa.status === 'attended') && accion === 'sacarCuenta') nuevoEstado = 'free';
      setTables(tables.map(t => t.id === mesa.id ? { ...t, status: nuevoEstado } : t));
    };
    const handleConfirmar = () => {
      setConfirmacion(true);
      setTimeout(() => {
        setConfirmacion(false);
        setShowOrderModal(false);
      }, 1800);
    };
    // Personalización según estado de la mesa
    let contenidoEstado = null;
    if (!mesaSeleccionada) return null;
    switch (mesaSeleccionada.status) {
      case 'free':
        contenidoEstado = (
          <>
            <p className="mb-4 text-green-700 font-semibold">Esta mesa está libre. Puedes tomar una nueva orden para los clientes que acaban de llegar.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {orderItems.map((item, idx) => {
                const plato = platosConImagen.find(p => p.name === item.name);
                return (
                  <div key={item.name} className="flex bg-gray-50 rounded-lg p-3 shadow-sm items-center">
                    <img src={plato?.img} alt={item.name} className="w-16 h-16 object-cover rounded mr-3 border" />
                    <div className="flex-1">
                      <div className="font-bold text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-500 mb-1">{plato?.desc}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <button className="btn-modal-secondary px-2" onClick={() => handleRemoveItem(idx)}>-</button>
                        <span className="font-semibold text-lg">{item.quantity}</span>
                        <button className="btn-modal-primary px-2" onClick={() => handleAddItem(idx)}>+</button>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm text-gray-600">S/. {item.price.toFixed(2)}</div>
                      <div className="font-bold text-primary-700">S/. {(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end font-bold text-lg mb-2">
              Total: S/. {orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </div>
            <div className="flex justify-end mt-2">
              <button className="btn-modal-primary" onClick={() => { cambiarEstadoMesa(mesaSeleccionada, 'tomarOrden'); setShowOrderModal(false); }} disabled={orderItems.every(i => i.quantity === 0)}>
                Confirmar Orden
              </button>
            </div>
            {confirmacion && (
              <div className="mt-4 flex justify-center animate-fadeIn">
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold shadow">
                  ¡Orden registrada exitosamente!
                </div>
              </div>
            )}
          </>
        );
        break;
      case 'occupied':
        contenidoEstado = (
          <>
            <p className="mb-4 text-red-700 font-semibold">Esta mesa está ocupada. Puedes agregar más platos a la orden actual o finalizar la atención.</p>
            <div className="mb-2 text-gray-700">Resumen de la orden en curso:</div>
            <ul className="mb-4">
              {orderHistory[0].items.map((item, idx) => (
                <li key={idx} className="flex justify-between border-b py-1">
                  <span>{item.quantity} x {item.name}</span>
                  <span>{item.total}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end font-bold text-lg mb-2">
              Total: {orderHistory[0].total}
            </div>
            <div className="flex justify-end mt-2 gap-2">
              <button className="btn-modal-primary" onClick={() => setShowOrderDetails(true)}>
                Agregar más platos
              </button>
              <button className="btn-modal-secondary" onClick={() => { cambiarEstadoMesa(mesaSeleccionada, 'finalizarAtencion'); setShowOrderModal(false); setTimeout(() => { alert('¡Atención finalizada! La mesa ha sido marcada como atendida.'); }, 300); }}>
                Finalizar atención
              </button>
              <button className="btn-modal-secondary" onClick={() => setShowHistoryModal(true)}>
                Ver historial
              </button>
            </div>
            {showOrderDetails === 'bill' && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2">Resumen de la cuenta</h3>
                <ul className="mb-2">
                  {orderHistory[0].items.map((item, idx) => (
                    <li key={idx} className="flex justify-between border-b py-1">
                      <span>{item.quantity} x {item.name}</span>
                      <span>{item.total}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end font-bold text-lg mb-2">
                  Total: {orderHistory[0].total}
                </div>
                <div className="flex justify-end mt-2">
                  <button className="btn-modal-primary" style={{background:'#22c55e', color:'#fff'}} onClick={() => { cambiarEstadoMesa(mesaSeleccionada, 'sacarCuenta'); setShowOrderDetails(false); setShowOrderModal(false); }}>
                    Marcar como pagada y liberar mesa
                  </button>
                </div>
              </div>
            )}
            {confirmacion && (
              <div className="mt-4 flex justify-center animate-fadeIn">
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold shadow">
                  ¡Orden actualizada exitosamente!
                </div>
              </div>
            )}
          </>
        );
        break;
      case 'attended':
        contenidoEstado = (
          <>
            <p className="mb-4 text-blue-700 font-semibold">Esta mesa ya fue atendida. Puedes ver el historial de pedidos, sacar la cuenta o iniciar una nueva orden si llegan nuevos clientes.</p>
            <div className="mb-2 text-gray-700">Última orden registrada:</div>
            <ul className="mb-4">
              {orderHistory[1].items.map((item, idx) => (
                <li key={idx} className="flex justify-between border-b py-1">
                  <span>{item.quantity} x {item.name}</span>
                  <span>{item.total}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end font-bold text-lg mb-2">
              Total: {orderHistory[1].total}
            </div>
            <div className="flex justify-end mt-2 gap-2">
              <button className="btn-modal-primary" onClick={() => { cambiarEstadoMesa(mesaSeleccionada, 'nuevaOrden'); setShowOrderModal(false); }}>
                Nueva orden
              </button>
              <button className="btn-modal-secondary" onClick={() => setShowHistoryModal(true)}>
                Ver historial
              </button>
              <button className="btn-modal-primary" style={{background:'#f59e42', color:'#fff'}} onClick={() => setShowOrderDetails('bill')}>Sacar cuenta</button>
            </div>
            {showOrderDetails === 'bill' && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2">Resumen de la cuenta</h3>
                <ul className="mb-2">
                  {orderHistory[1].items.map((item, idx) => (
                    <li key={idx} className="flex justify-between border-b py-1">
                      <span>{item.quantity} x {item.name}</span>
                      <span>{item.total}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end font-bold text-lg mb-2">
                  Total: {orderHistory[1].total}
                </div>
                <div className="flex justify-end mt-2">
                  <button className="btn-modal-primary" style={{background:'#22c55e', color:'#fff'}} onClick={() => { cambiarEstadoMesa(mesaSeleccionada, 'sacarCuenta'); setShowOrderDetails(false); setShowOrderModal(false); }}>
                    Marcar como pagada y liberar mesa
                  </button>
                </div>
              </div>
            )}
            {confirmacion && (
              <div className="mt-4 flex justify-center animate-fadeIn">
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold shadow">
                  ¡Nueva orden iniciada!
                </div>
              </div>
            )}
          </>
        );
        break;
      case 'reserved':
        contenidoEstado = (
          <>
            <p className="mb-4 text-yellow-700 font-semibold">Esta mesa está reservada. Puedes registrar la llegada del cliente y tomar su orden.</p>
            <div className="mb-2 text-gray-700">Detalles de la reserva:</div>
            <div className="mb-4 p-2 bg-yellow-50 rounded">
              <span className="font-semibold">Reserva para las 8:00 PM</span><br />
              <span>Nombre: Juan Pérez</span><br />
              <span>Personas: {mesaSeleccionada.capacity}</span>
            </div>
            <div className="flex justify-end mt-2">
              <button className="btn-modal-primary" onClick={() => { cambiarEstadoMesa(mesaSeleccionada, 'registrarLlegada'); setShowOrderModal(false); }}>
                Registrar llegada y tomar orden
              </button>
            </div>
            {confirmacion && (
              <div className="mt-4 flex justify-center animate-fadeIn">
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold shadow">
                  ¡Reserva confirmada y orden iniciada!
                </div>
              </div>
            )}
          </>
        );
        break;
      case 'attended':
        contenidoEstado = (
          <>
            <p className="mb-4 text-blue-700 font-semibold">Esta mesa ya fue atendida. Puedes ver el historial de pedidos o iniciar una nueva orden si llegan nuevos clientes.</p>
            <div className="mb-2 text-gray-700">Última orden registrada:</div>
            <ul className="mb-4">
              {orderHistory[1].items.map((item, idx) => (
                <li key={idx} className="flex justify-between border-b py-1">
                  <span>{item.quantity} x {item.name}</span>
                  <span>{item.total}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end font-bold text-lg mb-2">
              Total: {orderHistory[1].total}
            </div>
            <div className="flex justify-end mt-2 gap-2">
              <button className="btn-modal-primary" onClick={() => { cambiarEstadoMesa(mesaSeleccionada, 'nuevaOrden'); setShowOrderModal(false); }}>
                Nueva orden
              </button>
              <button className="btn-modal-secondary" onClick={() => setShowHistoryModal(true)}>
                Ver historial
              </button>
            </div>
            {confirmacion && (
              <div className="mt-4 flex justify-center animate-fadeIn">
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold shadow">
                  ¡Nueva orden iniciada!
                </div>
              </div>
            )}
          </>
        );
        break;
      default:
        contenidoEstado = <p className="text-gray-500">Estado de mesa no reconocido.</p>;
    }
    return (
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-semibold text-primary-700">Mesa {mesaSeleccionada?.number}</span>
          <span className="text-sm text-gray-500">Capacidad: {mesaSeleccionada?.capacity} personas</span>
        </div>
        {contenidoEstado}
      </div>
    );
  };

  // Modal de Historial de Pedidos con ejemplo visual
  const HistoryModalContent = () => (
    <div>
      <p className="mb-4 text-gray-700">Historial de pedidos recientes para la mesa seleccionada:</p>
      <table className="w-full mb-4 text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Fecha</th>
            <th>Hora</th>
            <th>Platos</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((order) => (
            <tr key={order.id} className="border-b">
              <td>{order.date}</td>
              <td>{order.time}</td>
              <td>
                {order.items.map((item, idx) => (
                  <span key={item.name}>{item.quantity} x {item.name}{idx < order.items.length - 1 ? ', ' : ''}</span>
                ))}
              </td>
              <td>{order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Layout title="Mapa de Mesas">
      {/* Filtros de estado */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button
          className={`px-4 py-2 rounded-lg font-semibold border ${filterStatus === 'all' ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition`}
          onClick={() => setFilterStatus('all')}
        >
          Todas
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold border ${filterStatus === 'free' ? 'bg-green-500 text-white' : 'bg-white text-green-600 border-green-500 hover:bg-green-50'} transition`}
          onClick={() => setFilterStatus('free')}
        >
          Libres
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold border ${filterStatus === 'occupied' ? 'bg-red-500 text-white' : 'bg-white text-red-600 border-red-500 hover:bg-red-50'} transition`}
          onClick={() => setFilterStatus('occupied')}
        >
          Ocupadas
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold border ${filterStatus === 'reserved' ? 'bg-yellow-400 text-white' : 'bg-white text-yellow-600 border-yellow-400 hover:bg-yellow-50'} transition`}
          onClick={() => setFilterStatus('reserved')}
        >
          Reservadas
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold border ${filterStatus === 'attended' ? 'bg-blue-500 text-white' : 'bg-white text-blue-600 border-blue-500 hover:bg-blue-50'} transition`}
          onClick={() => setFilterStatus('attended')}
        >
          Atendidas
        </button>
      </div>
      {/* Panel de resumen de estados */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {statusSummary.map((s, idx) => (
          <div key={idx} className="flex items-center bg-white rounded-lg shadow px-4 py-2 min-w-[120px]">
            <span className="mr-2 text-lg">{s.icon}</span>
            <span className="font-bold text-xl mr-2">{s.count}</span>
            <span className="text-gray-700">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mapa de mesas */}
        <div className="lg:w-2/3">
          <div className="dashboard-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Mapa de Mesas</h2>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full status-free mr-2"></div>
                  <span className="text-sm text-gray-600">Libre</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full status-occupied mr-2"></div>
                  <span className="text-sm text-gray-600">Ocupada</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full status-reserved mr-2"></div>
                  <span className="text-sm text-gray-600">Reservada</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full status-attended mr-2"></div>
                  <span className="text-sm text-gray-600">Atendida</span>
                </div>
              </div>
            </div>
            {/* Aquí se debe usar filteredTables en vez de tables para mostrar solo las mesas filtradas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredTables.map(table => (
                <div 
                  key={table.id} 
                  className={`relative p-4 rounded-lg border-2 border-gray-200 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${selectedTable === table.id ? 'ring-2 ring-primary-500' : 'hover:border-primary-300'}`}
                  onClick={() => setSelectedTable(table.id)}
                >
                  <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getStatusColor(table.status)}`}></div>
                  <div className="text-3xl font-bold text-gray-700 mb-1">{table.number}</div>
                  <div className="text-sm text-gray-500 mb-1">{table.capacity} personas</div>
                  <div className="text-xs font-medium text-gray-600">{getStatusText(table.status)}</div>
                  {table.lastOrder && (
                    <div className="text-xs text-gray-500 mt-1">Última orden: {table.lastOrder}</div>
                  )}
                  {table.reservationTime && (
                    <div className="text-xs text-gray-500 mt-1">Reserva: {table.reservationTime}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Detalles de la mesa seleccionada */}
        <div className="lg:w-1/3">
          <div className="dashboard-card h-full">
            {selectedTable ? (
              <div>
                {/* Información de la mesa */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Mesa {tables.find(t => t.id === selectedTable)?.number}</h2>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(tables.find(t => t.id === selectedTable)?.status)}`}>{getStatusText(tables.find(t => t.id === selectedTable)?.status)}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Capacidad</div>
                      <div className="text-lg font-medium">{tables.find(t => t.id === selectedTable)?.capacity} personas</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-500">Estado</div>
                      <div className="text-lg font-medium">{getStatusText(tables.find(t => t.id === selectedTable)?.status)}</div>
                    </div>
                  </div>
                  {/* Acciones para la mesa */}
                  <div className="flex space-x-2 mb-6">
                    <button className="btn-modal-primary flex items-center" onClick={() => setShowOrderModal(true)}>
                      <FaUtensils className="mr-2" /> Tomar Orden
                    </button>
                    <button className="btn-modal-secondary flex items-center" onClick={() => setShowHistoryModal(true)}>
                      <FaHistory className="mr-2" /> Ver Historial
                    </button>
                  </div>
                </div>
                {/* Orden actual o historial */}
                {(tables.find(t => t.id === selectedTable)?.status === 'occupied' || tables.find(t => t.id === selectedTable)?.status === 'attended') ? (
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-3">Orden Actual</h3>
                    <div className="space-y-2 mb-4">
                      {orderHistory[0].items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500">Cantidad: {item.quantity}</div>
                          </div>
                          <div className="text-right">
                            <div>{item.total}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FaEye className="text-5xl mb-4" />
                <span>Selecciona una mesa para ver detalles</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal para tomar orden */}
      <Modal show={showOrderModal} onClose={() => setShowOrderModal(false)} title="Tomar Orden">
        <OrderModalContent />
      </Modal>
      {/* Modal para historial */}
      <Modal show={showHistoryModal} onClose={() => setShowHistoryModal(false)} title="Historial de Pedidos">
        <div className="mb-4">
          <p className="text-gray-700">Aquí puedes ver el historial de pedidos de la mesa seleccionada. (Contenido de ejemplo)</p>
        </div>
        <div className="flex justify-end">
          <button className="btn-modal-primary" onClick={() => setShowHistoryModal(false)}>Cerrar</button>
        </div>
      </Modal>
      {/* Modal para sacar la cuenta */}
      <Modal show={showOrderDetails === 'bill'} onClose={() => setShowOrderDetails(false)} title="Cuenta de la Mesa">
        <div>
          <div className="mb-2 font-semibold text-primary-700">Resumen de la cuenta:</div>
          <ul className="mb-4">
            {orderHistory[0].items.map((item, idx) => (
              <li key={idx} className="flex justify-between border-b py-1">
                <span>{item.quantity} x {item.name}</span>
                <span>{item.total}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-end font-bold text-lg mb-2">
            Total: {orderHistory[0].total}
          </div>
          <div className="flex justify-end mt-2">
            <button className="btn-modal-primary" style={{background:'#22c55e'}} onClick={() => {
              setTables(tables.map(t => t.id === selectedTable ? { ...t, status: 'free' } : t));
              setShowOrderDetails(false);
              setShowOrderModal(false);
              alert('¡Cuenta pagada! La mesa ha sido liberada.');
            }}>
              Marcar como pagada y liberar mesa
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default Tables;