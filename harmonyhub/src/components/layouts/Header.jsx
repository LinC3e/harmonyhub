import { Link } from "react-router-dom"
import { FaHome, FaBook, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex flex-col items-center py-4 min-h-screen bg-gray-900 text-white">
      <div className="mb-8">
        <Link to="/" className="text-2xl font-bold">
          <img src="" alt="Logo" className="w-12 h-12" />
        </Link>
      </div>
      <nav className="flex flex-col w-full px-4">
        <Link to="/login" className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded">
          <FaUser className="mr-2" /> Iniciar Sesion
        </Link>
        <Link to="/" className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded">
          <FaHome className="mr-2" /> Inicio
        </Link>
        <Link to="/library" className="flex items-center py-2 px-4 mb-2 hover:bg-gray-700 rounded">
          <FaBook className="mr-2" />Biblioteca
        </Link>
      </nav>
    </header>
  )
}

export default Header