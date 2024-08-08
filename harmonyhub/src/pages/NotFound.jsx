import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-textPrimary">
    
      <img src="/images/Error 404.png" alt="404 Not Found" className="w-1/3 h-auto mb-8" />


      <h1 className="text-3xl font-bold mb-4">Oops! Página no encontrada...</h1>
      <p className="text-lg mb-8">¡No deberías estar aqui!</p>
      <Link to="/" className="text-primary hover:text-accent">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;