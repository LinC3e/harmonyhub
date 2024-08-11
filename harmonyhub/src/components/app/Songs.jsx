import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { FaThumbsUp, FaRandom } from 'react-icons/fa';

const Songs = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error, callApi } = useAxios(`harmonyhub/songs/?page=${page}&page_size=10`, 'GET', []);

  useEffect(() => {
    callApi();
  }, [page, callApi]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.detail}</p>;

  const songs = data.results || [];

  return (
    <div className="p-4 mt-8">
      {/* Título "Canciones" */}
      <div className="flex items-center">
        <span className="text-base text-white mr-2">{'>'}</span>
        <h1 className="text-xl font-bold text-white">Canciones</h1>
      </div>
      <div className="mt-4"></div>

      {/* Contenedor de botones */}
      <div className="flex justify-between mb-4">
        {/* Botón "Subir Canción" */}
        <button className="flex items-center justify-center p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
          Subir Canción
        </button>

        {/* Botón de "Reproducción Aleatoria" */}
        <button className="flex items-center justify-center p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300">
          <FaRandom className="h-5 w-5 mr-2" />
          Reproducción Aleatoria
        </button>
      </div>

      {/* Lista de canciones */}
      <ul className="space-y-2">
        {songs.map((song) => (
          <li key={song.id} className="flex items-center justify-between p-2 bg-gray-900 rounded-lg hover:bg-gray-800 transition duration-300">
            <div className="flex items-center space-x-4">
              <img src={song.cover || '/images/default-cover.png'} alt={song.title} className="w-12 h-12 rounded-md object-cover" />
              <div>
                <p className="text-green-500 font-semibold hover:text-yellow-500 transition-colors duration-300">{song.title}</p>
                <p className="text-gray-400 text-sm">{song.artist}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-gray-400">{song.album}</p>
              <p className="text-gray-400">{song.duration}</p>
              <div className="flex items-center space-x-2">
                <FaThumbsUp className="text-gray-400 cursor-pointer hover:text-white transition duration-300" />
                <p className="text-gray-400">{song.view_count}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Paginación */}
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
    </div>
  );
};

export default Songs;
