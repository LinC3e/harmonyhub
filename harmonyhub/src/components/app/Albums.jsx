// src/components/AlbumsList.jsx
import { useEffect } from 'react';
import useAxios from '../../hooks/useAxios';

const AlbumsList = () => {
  const { data, loading, error, callApi } = useAxios('/albums/', 'GET', []);

  useEffect(() => {
    callApi();
  }, [callApi]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data && data.length > 0 ? (
          data.map(album => (
            <li key={album.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold">{album.title}</h2>
              <p className="text-sm text-gray-600">Añadido el: {new Date(album.created_at).toLocaleString()}</p>
              {album.year && <p className="text-sm text-gray-600">Año: {album.year}</p>}
              {album.cover ? (
                <img src={album.cover} alt={album.title} className="w-32 h-32 object-cover mt-2" />
              ) : (
                <p className="text-sm text-gray-600">Sin imagen de portada</p>
              )}
              <p className="text-sm text-gray-600">ID de artista: {album.artist}</p>
              <p className="text-sm text-gray-600">ID del dueño: {album.owner}</p>
            </li>
          ))
        ) : (
          <p>No se encontraron álbumes.</p>
        )}
      </ul>
    </div>
  );
};

export default AlbumsList;
