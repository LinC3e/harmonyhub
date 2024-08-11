import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const Artists = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error, callApi } = useAxios(`/harmonyhub/artists/?page=${page}&page_size=7&ordering=-created_at`, 'GET', []);

  useEffect(() => {
    callApi();
  }, [page, callApi]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.detail}</p>;

  const artists = data.results || [];

  return (
    <div className="p-4 mt-8">
      {/* Título "Artistas" */}
      <div className="flex items-center">
        <span className="text-base text-white mr-2">{'>'}</span>
        <h1 className="text-xl font-bold text-white">Artistas</h1>
      </div>
      <div className="mt-4"></div> {/* Margen adicional después del título */}

      {/* Lista de artistas */}
      <ul className="space-y-4">
        {artists && artists.length > 0 ? (
          artists.map((artist) => (
            <li key={artist.id} className="flex items-center p-4 bg-gray-900 rounded-lg shadow-md hover:bg-gray-800 transition duration-300">
              {artist.image ? (
                <img
                  src={artist.image}
                  alt={`${artist.name} profile`}
                  className="w-16 h-16 object-cover rounded-full mr-4"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl font-bold">
                    {artist.name ? artist.name.charAt(0) : '?'}
                  </span>
                </div>
              )}
              <div>
                <p className="text-green-500 font-semibold hover:text-yellow-500 transition-colors duration-300">{artist.name}</p>
                {artist.website && (
                  <p>
                    <a href={artist.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                      {artist.website}
                    </a>
                  </p>
                )}
                <p className="text-gray-400 text-sm">
                  Creado: {new Date(artist.created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-400 text-sm">
                  Actualizado: {new Date(artist.updated_at).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-white">No se encontraron artistas.</p>
        )}
      </ul>

      {/* Paginación */}
      <div className="flex justify-between mt-8">
        <button
          disabled={!data.previous}
          onClick={() => setPage((page) => Math.max(page - 1, 1))}
          className="px-4 py-2 bg-gray-300 rounded-lg text-black disabled:bg-gray-400 disabled:text-gray-600 hover:bg-gray-400"
        >
          Anterior
        </button>
        <button
          disabled={!data.next}
          onClick={() => setPage((page) => page + 1)}
          className="px-4 py-2 bg-gray-300 rounded-lg text-black disabled:bg-gray-400 disabled:text-gray-600 hover:bg-gray-400"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Artists;
