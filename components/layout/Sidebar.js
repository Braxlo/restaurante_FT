import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaHome, 
  FaChair, 
  FaRobot, 
  FaWarehouse, 
  FaCog,
  FaSignOutAlt,
  FaUtensils,
  FaMoneyBillWave,
  FaChartBar,
  FaBell,
  FaUsers,
  FaClipboardList,
  FaCalendarAlt,
  FaFileAlt,
  FaTags,
  FaEllipsisH
} from 'react-icons/fa';

const SidebarIcon = ({ icon, text, active, link }) => {
  return (
    <Link href={link}>
      <div className={`sidebar-icon group ${active ? 'bg-primary-600 text-white rounded-xl shadow-lg' : 'hover:bg-gray-700'} transition-all duration-300 ease-in-out`}>
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
          {text}
          {active && <span className="block h-1 w-1/2 mx-auto mt-1 bg-primary-400 rounded-full"></span>}
        </span>
      </div>
    </Link>
  );
};

export const Sidebar = () => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;

  const mainIcons = [
    { icon: <FaHome size="24" />, text: "Inicio", path: "/dashboard" },
    { icon: <FaChair size="24" />, text: "Mesas", path: "/tables" },
    { icon: <FaUtensils size="24" />, text: "Menú", path: "/menu" },
    { icon: <FaRobot size="24" />, text: "Chatbot", path: "/chatbot" },
    { icon: <FaWarehouse size="24" />, text: "Inventario", path: "/inventory" },
    { icon: <FaMoneyBillWave size="24" />, text: "Económico", path: "/economic" },
  ];

  const secondaryIcons = [
    { icon: <FaChartBar size="24" />, text: "Progreso", path: "/progress" },
    { icon: <FaBell size="24" />, text: "Alertas", path: "/alertas" },
    { icon: <FaUsers size="24" />, text: "Clientes", path: "/clients" },
    { icon: <FaClipboardList size="24" />, text: "Pedidos", path: "/pedidos" },
    { icon: <FaCalendarAlt size="24" />, text: "Reservas", path: "/reservas" },
    { icon: <FaFileAlt size="24" />, text: "Reportes", path: "/reportes" },
    { icon: <FaTags size="24" />, text: "Promociones", path: "/promociones" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg z-10">
      <div className="sidebar-logo flex items-center justify-center h-20 w-16 mb-4">
        <svg className="h-8 w-8 text-primary-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
          <path d="M15.88 8.29L10 14.17L8.12 12.29C7.73 11.9 7.1 11.9 6.71 12.29C6.32 12.68 6.32 13.31 6.71 13.7L9.3 16.29C9.69 16.68 10.32 16.68 10.71 16.29L17.3 9.7C17.69 9.31 17.69 8.68 17.3 8.29C16.91 7.9 16.27 7.9 15.88 8.29Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Iconos principales */}
      {mainIcons.map((item, index) => (
        <SidebarIcon 
          key={index}
          icon={item.icon} 
          text={item.text} 
          active={currentPath === item.path}
          link={item.path}
        />
      ))}

      {/* Menú desplegable para iconos secundarios */}
      <div className="relative">
        <div 
          className="sidebar-icon group hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => setShowMoreMenu(!showMoreMenu)}
        >
          <FaEllipsisH size="24" />
          <span className="sidebar-tooltip group-hover:scale-100 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
            Más opciones
          </span>
        </div>

        {showMoreMenu && (
          <div className="absolute left-16 bottom-0 w-48 bg-gray-800 rounded-md shadow-xl z-20 overflow-hidden">
            {secondaryIcons.map((item, index) => (
              <Link href={item.path} key={index}>
                <div 
                  className={`px-4 py-3 text-sm text-white hover:bg-gray-700 flex items-center ${currentPath === item.path ? 'bg-gray-700' : ''}`}
                  onClick={() => setShowMoreMenu(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.text}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;