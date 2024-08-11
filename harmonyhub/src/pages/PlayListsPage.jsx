import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { FaMusic } from "react-icons/fa";

const PlayListsPage = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error, callApi } = useAxios(`/harmonyhub/playlists/?page=${page}&page_size=15&ordering=-created_at`, 'GET', []);

  useEffect(() => {
    callApi();
  }, [page, callApi]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.detail}</p>;

  const playlists = data.results || [];

  return (
    <div className="flex flex-col min-h-screen p-4 mt-8 bg-gray-900">
      {/* tiulo "Playlists" */}
      <div className="flex items-center">
        <span className="text-base text-white mr-2">{'>'}</span>
        <h1 className="text-xl font-bold text-white">Playlists</h1>
      </div>
      <div className="mt-4 flex-grow">
        {/* grid de playlists */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center bg-gray-700 h-40 rounded-md">
                <FaMusic className="text-white text-4xl" />
              </div>
              <p className="text-lg font-semibold text-green-500 mt-2 text-center hover:text-yellow-500 transition-colors duration-300">
                {playlist.name}
              </p>
              <p className="text-sm text-gray-400 text-center mt-1">{`N° de canciones: ${playlist.entries.length}`}</p>
              <p className="text-sm text-gray-400 text-center">{`Creado el: ${new Date(playlist.created_at).toLocaleDateString()}`}</p>
            </div>
          ))}
        </div>
      </div>
      {/* paginacion */}
      <div className="flex justify-between items-center mt-8 px-4">
        <button
          disabled={!data.previous}
          onClick={() => setPage((page) => Math.max(page - 1, 1))}
          className="px-4 py-2 bg-gray-300 rounded-lg text-black disabled:bg-gray-400 disabled:text-gray-600 hover:bg-gray-400"
        >
          Anterior
        </button>
        <button
          disabled={!data.next}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded-lg text-black disabled:bg-gray-400 disabled:text-gray-600 hover:bg-gray-400"
        >
          Siguiente
        </button>
      </div>
      {/* Footer */}
      <footer className="mt-auto py-4">
        <div className="text-center text-gray-400">
          <p>© 2024 Desarrollado por: Costilla Matias, Diaz Carlos, Zurita Esteban</p>
          <div className="flex justify-center mt-2 space-x-4">
            <a href="#" className="text-green-500 hover:text-green-400">Facebook</a>
            <a href="#" className="text-green-500 hover:text-green-400">Twitter</a>
            <a href="#" className="text-green-500 hover:text-green-400">Instagram</a>
            <a href="#" className="text-green-500 hover:text-green-400">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlayListsPage;