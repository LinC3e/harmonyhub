import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const UserSongs = ({ userId }) => {
  const { data, loading, error, callApi } = useAxios(`/harmonyhub/songs?owner=${userId}`, 'GET');
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (userId) {
      callApi();
    }
  }, [userId, callApi]);

  useEffect(() => {
    if (data && data.results) {
      setSongs(data.results);
    }
  }, [data]);

  if (loading) return <p>Cargando canciones...</p>;
  if (error) return <p>Error al cargar las canciones: {error.detail}</p>;

  return (
    <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md h-96 overflow-y-auto">
      <h2 className="text-xl font-bold text-white mb-4 text-center">Canciones publicadas</h2>
      {songs.length > 0 ? (
        <ul className="space-y-2">
          {songs.map((song) => (
            <li key={song.id} className="bg-gray-900 p-4 rounded-lg flex items-center space-x-4">
              <img
                src={song.cover}
                alt={song.title}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <Link to={`/songs/${song.id}`}><p className="text-lg font-semibold text-green-400 hover:text-blue-600">{song.title}</p></Link>
                <p className="text-white">Año: {song.year}</p>
                <p className="text-white">Vistas: {song.view_count}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <><p className="text-white text-center">No hay canciones disponibles.</p>
        <p className='mt-5 p-5 bg-yellow-300 rounded-md font-medium text-yellow-800'>El usuario no cuenta con canciones publicadas.</p></>
      )}

    </div >
  );
};

export default UserSongs;