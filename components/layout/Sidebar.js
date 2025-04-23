import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaHome, 
  FaChair, 
  FaRobot, 
  FaWarehouse, 
  FaChartLine, 
  FaCog,
  FaSignOutAlt,
  FaUtensils,
  FaMoneyBillWave
} from 'react-icons/fa';

const SidebarIcon = ({ icon, text, active, link }) => {
  return (
    <Link href={link}>
      <div className={`sidebar-icon group ${active ? 'bg-primary-600 text-white rounded-xl' : ''}`}>
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
          {text}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg z-10">
      <div className="sidebar-logo flex items-center justify-center h-20 w-16 mb-4">
        <svg className="h-8 w-8 text-primary-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
          <path d="M15.88 8.29L10 14.17L8.12 12.29C7.73 11.9 7.1 11.9 6.71 12.29C6.32 12.68 6.32 13.31 6.71 13.7L9.3 16.29C9.69 16.68 10.32 16.68 10.71 16.29L17.3 9.7C17.69 9.31 17.69 8.68 17.3 8.29C16.91 7.9 16.27 7.9 15.88 8.29Z" fill="currentColor"/>
        </svg>
      </div>

      <SidebarIcon 
        icon={<FaHome size="28" />} 
        text="Inicio" 
        active={currentPath === '/' || currentPath === '/dashboard'}
        link="/dashboard"
      />
      <SidebarIcon 
        icon={<FaChair size="28" />} 
        text="Mesas" 
        active={currentPath === '/tables'}
        link="/tables"
      />
      <SidebarIcon 
        icon={<FaUtensils size="28" />} 
        text="Menú" 
        active={currentPath === '/menu'}
        link="/menu"
      />
      <SidebarIcon 
        icon={<FaRobot size="28" />} 
        text="Chatbot" 
        active={currentPath === '/chatbot'}
        link="/chatbot"
      />
      <SidebarIcon 
        icon={<FaWarehouse size="28" />} 
        text="Inventario" 
        active={currentPath === '/inventory'}
        link="/inventory"
      />
      <SidebarIcon 
        icon={<FaChartLine size="28" />} 
        text="Análisis" 
        active={currentPath === '/analytics'}
        link="/analytics"
      />
      <SidebarIcon 
        icon={<FaMoneyBillWave size="28" />} 
        text="Económico" 
        active={currentPath === '/economic'}
        link="/economic"
      />

      <div className="mt-auto mb-4">
        <SidebarIcon 
          icon={<FaCog size="28" />} 
          text="Configuración" 
          active={currentPath === '/settings'}
          link="/settings"
        />
        <SidebarIcon 
          icon={<FaSignOutAlt size="28" />} 
          text="Salir" 
          active={false}
          link="/logout"
        />
      </div>
    </div>
  );
};

export default Sidebar;