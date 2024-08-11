import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { FaGlobe, FaMusic, FaUser } from "react-icons/fa";

const PlayListDetailPage = () => {
  const { id } = useParams();
  const { data, loading, error, callApi } = useAxios(`/harmonyhub/playlists/${id}`, 'GET', []);

  useEffect(() => {
    callApi();
  }, [callApi, id]);

  if (loading) return <p className="text-white">Cargando...</p>;
  if (error) return <p className="text-red-500">Error: {error.detail}</p>;

  const playlist = data;

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen p-8 flex flex-col items-center justify-center">
      <div className="text-white mb-6">
        <h1 className="text-2xl font-bold text-center">&gt; Info PlayList</h1>
      </div>

      {playlist ? (
        <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-2xl w-full max-w-4xl transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-green-400 mb-2">{playlist.name}</h1>
            {playlist.description && (
              <p className="text-gray-400 italic">{playlist.description}</p>
            )}
          </div>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <FaUser className="text-green-400 text-2xl" />
              <p className="text-white text-lg font-semibold">{playlist.owner}</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaGlobe className={`text-2xl ${playlist.public ? 'text-blue-400' : 'text-red-400'}`} />
              <p className="text-white text-lg">{playlist.public ? "Pública" : "Privada"}</p>
            </div>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-inner">
            <h3 className="text-2xl font-semibold text-green-400 mb-4">Canciones</h3>
            {playlist.entries.length > 0 ? (
              <ul className="space-y-3">
                {playlist.entries.map((songId, index) => (
                  <li
                    key={songId}
                    className="bg-gray-700 p-4 rounded-md shadow-md flex items-center justify-between transition transform hover:scale-105 hover:bg-gray-600"
                  >
                    <div className="flex items-center">
                      <FaMusic className="text-green-400 mr-3" />
                      <p className="text-white text-lg font-medium">{`Canción #${index + 1}`}</p>
                    </div>
                    <span className="text-sm text-gray-400">ID: {songId}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-yellow-400">No hay canciones en esta lista de reproducción.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-white">No se encontró la lista de reproducción.</p>
      )}
    </div>
  );
};

export default PlayListDetailPage;
