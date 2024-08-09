import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const PlayListsPage = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error, callApi } = useAxios(`harmonyhub/playlists/?page=${page}&page_size=7`, 'GET', []);

  useEffect(() => {
    callApi();
  }, [page, callApi]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.detail}</p>;

  const playlists = data.results || [];

  return (
    <div>
      <ul>
        {playlists && playlists.length > 0 ? (
          playlists.map(playlist => (
            <li key={playlist.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <h2>Nombre de la PlayList: {playlist.name}</h2>
              <p>Descripcion: {playlist.description || 'No tiene'}</p>
              <p>N° de canciones: {playlist.entries.length}</p>
              {playlist.created_at && <p>Creado el: {new Date(playlist.created_at).toLocaleDateString()}</p>}
              {playlist.updated_at && <p>Actualizado el: {new Date(playlist.updated_at).toLocaleDateString()}</p>}
            </li>
          ))
        ) : (
          <p>No se encontraron playlists.</p>
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

export default PlayListsPage;