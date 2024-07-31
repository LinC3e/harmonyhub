import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";

const Songs = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error, callApi } = useAxios(`harmonyhub/songs/?page=${page}&page_size=7`, 'GET', []);

  useEffect(() => {
    callApi();
  }, [page, callApi]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const songs = data.results || [];

  return (
    <div>
      <ul>
        {songs && songs.length > 0 ? (
          songs.map(cancion => (
            <li key={cancion.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <Link to={`/songs/${cancion.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
                {cancion.title}
              </Link>
              {cancion.year && <p>Año: {cancion.year}</p>}
              {cancion.duration && <p>Duración: {cancion.duration} segundos</p>}
            </li>
          ))
        ) : (
          <p>No se encontraron canciones.</p>
        )}
      </ul>
      <div className="flex justify-between mt-4">
        <button 
          disabled={!data.previous} 
          onClick={() => setPage(page => Math.max(page - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-70 text-black"
        >
          Anterior
        </button>
        <button 
          disabled={!data.next} 
          onClick={() => setPage(page => page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Songs;