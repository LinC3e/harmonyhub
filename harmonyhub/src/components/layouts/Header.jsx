import { FaAddressBook, FaHome, FaMusic, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/authContext";
import logo from '/images/logo.png';

const Header = () => {
  const { logout } = useAuth("actions")
  const { isAuthenticated } = useAuth("state")
  return (
    <header className="flex flex-col items-center py-4 min-h-screen bg-gray-900 text-white w-80"> {/* Aumenta el ancho aquí */}
      <div className="mb-8">
        <Link to="/" className="text-2xl font-bold">
          <img src={logo} alt="Logo" className="w-50 h-50" /> {/* tamaño del logo */}
        </Link>
      </div>
      <nav className="flex flex-col w-full px-4">
        {/* sin credenciales*/}
        {!isAuthenticated && (
          <Link to="/login" className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded">
            <FaUser className="mr-2" /> Iniciar Sesion
          </Link>
        )}
        <Link to="/" className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded">
          <FaHome className="mr-2" /> Inicio
        </Link>
        {/* con credenciales*/}
        {isAuthenticated && (
          <>
<<<<<<< HEAD
            <Link to="/songs" className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded">
              <FaMusic className="mr-2" />Canciones
            </Link>
=======
          <Link to="/profile" className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded">
            <FaUser className="mr-2" />Perfil
          </Link>
          <Link to="/artists" className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded">
              <FaAddressBook className="mr-2" />Artistas
            </Link>
          <Link to="/songs" className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded">
            <FaMusic className="mr-2" />Canciones
          </Link>
>>>>>>> router-private
            <Link to="/albums" className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded">
              <FaAddressBook className="mr-2" />Albumes
            </Link>
            <button onClick={logout} className="flex items-center py-2 px-4 mb-2 bg-red-500 hover:bg-red-700 rounded font-bold">
              <FaSignOutAlt className="mr-2" />Log Out
            </button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header;