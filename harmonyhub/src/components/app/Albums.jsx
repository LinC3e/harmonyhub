// src/components/AlbumsList.jsx
import { useEffect } from 'react';
import useAxios from '../../hooks/useAxios';

const AlbumsList = () => {
  const { data, loading, error, callApi } = useAxios('harmonyhub/albums?ordering=-created_at', 'GET', []);

  useEffect(() => {
    callApi();
  }, [callApi]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const albums = data.results || [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {albums && albums.length > 0 ? (
        albums.map(album => (
          <div key={album.id} className="p-4 border border-gray-200 rounded-lg">
            <h2 className="text-xl font-semibold">{album.title}</h2>
            <p className="text-sm text-gray-600">Añadido el: {new Date(album.created_at).toLocaleString()}</p>
            {album.year && <p className="text-sm text-gray-600">Año: {album.year}</p>}
            {album.cover ? (
              <img src={album.cover} alt={album.title} className="w-full h-32 object-cover mt-2" />
            ) : (
              <p className="text-sm text-gray-600">Sin imagen de portada</p>
            )}
            <p className="text-sm text-gray-600">ID de artista: {album.artist}</p>
            <p className="text-sm text-gray-600">ID del dueño: {album.owner}</p>
          </div>
        ))
      ) : (
        <p>No se encontraron álbumes.</p>
      )}
    </div>
  );
};

export default AlbumsList;
