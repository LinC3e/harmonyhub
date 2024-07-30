
import { useAuth } from "../../hooks/authContext"
import { FaBook, FaHome, FaUser, FaRegArrowAltCircleRight } from 'react-icons/fa';
import { Link } from "react-router-dom";
import logo from '/images/logo.png';

const Header = () => {
  const {logout}= useAuth ("actions")
  const { isAuthenticated } = useAuth("state")
  return (
    <header className="flex flex-col items-center py-4 min-h-screen bg-gray-900 text-white">
      <div className="mb-8">
        <Link to="/" className="text-2xl font-bold">
          <img src={logo} alt="Logo" className="w-40 h-40" /> {/* tamaño del logo */}
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
       
        {isAuthenticated && (
        <><Link to="/library" className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded">
            <FaBook className="mr-2" />Biblioteca
          </Link><button  onClick ={logout} className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded">
              <FaRegArrowAltCircleRight className="mr-2" />Log Out
            </button></>
        )}
      </nav>
    </header>
  )
}

export default Header;