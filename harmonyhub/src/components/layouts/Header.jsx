import { FaAddressBook, FaBars, FaHome, FaMusic, FaSignOutAlt, FaTimes, FaUser } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/authContext";
//import logo from '/images/logo.png';
import { useState } from 'react';

const Header = () => {
  const { logout } = useAuth("actions")
  const { isAuthenticated } = useAuth("state")
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return  (
    <header className={`flex flex-col items-center py-4 min-h-screen bg-gray-900 text-white ${isOpen ? "w-80" : "w-20 border-r-2 border-primary"} transition-all duration-300`}>
      <div className="mb-8 w-full flex justify-between items-center px-4">
        <Link to="/" className="flex items-center justify-center py-2 mb-2 w-full">
          {isOpen && <span className="ml-2">HarmonyHub</span>}
        </Link>
        <button onClick={toggleMenu} className="text-xl focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav className="flex flex-col w-full px-2">
        {!isAuthenticated && (
          <>
            <Link to="/" className="flex items-center justify-center py-2 mb-2 hover:bg-gray-700 rounded-full w-full">
              <FaHome className="text-xl" />
              {isOpen && <span className="ml-2">Inicio</span>}
            </Link>
            <Link to="/login" className="flex items-center justify-center py-2 mb-2 hover:bg-gray-700 rounded-full w-full">
              <FaUser className="text-xl" />
              {isOpen && <span className="ml-2">Iniciar Sesión</span>}
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link to="/home" className="flex items-center justify-center py-2 mb-2 hover:bg-gray-700 rounded-full w-full">
              <FaHome className="text-xl" />
              {isOpen && <span className="ml-2">Inicio</span>}
            </Link>
            <Link to="/profile" className="flex items-center justify-center py-2 mb-2 hover:bg-gray-700 rounded-full w-full">
              <FaUser className="text-xl" />
              {isOpen && <span className="ml-2">Perfil</span>}
            </Link>
            <Link to="/artists" className="flex items-center justify-center py-2 mb-2 hover:bg-gray-700 rounded-full w-full">
              <FaAddressBook className="text-xl" />
              {isOpen && <span className="ml-2">Artistas</span>}
            </Link>
            <Link to="/songs" className="flex items-center justify-center py-2 mb-2 hover:bg-gray-700 rounded-full w-full">
              <FaMusic className="text-xl" />
              {isOpen && <span className="ml-2">Canciones</span>}
            </Link>
            <Link to="/albums" className="flex items-center justify-center py-2 mb-2 hover:bg-gray-700 rounded-full w-full">
              <FaAddressBook className="text-xl" />
              {isOpen && <span className="ml-2">Álbumes</span>}
            </Link>
            <button onClick={logout} className="flex items-center justify-center py-2 mb-2 bg-red-500 hover:bg-red-700 rounded-full w-full">
              <FaSignOutAlt className="text-xl" />
              {isOpen && <span className="ml-2">Log Out</span>}
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
export default Header;