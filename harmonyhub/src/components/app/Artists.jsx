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
    <div>
      <ul>
        {artists && artists.length > 0 ? (
          artists.map((artist) => (
            <li key={artist.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
              {artist.image && (
                <img
                  src={artist.image}
                  alt={`${artist.name} profile`}
                  className="w-24 h-24 object-cover rounded-full mb-4"
                />
              )}
              {artist.name && <p>Nombre: {artist.name}</p>}
              {artist.website && (
                <p>
                  Website:{" "}
                  <a href={artist.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    {artist.website}
                  </a>
                </p>
              )}
              {artist.created_at && <p>Creado el: {new Date(artist.created_at).toLocaleDateString()}</p>}
              {artist.updated_at && <p>Actualizado el: {new Date(artist.updated_at).toLocaleDateString()}</p>}
            </li>
          ))
        ) : (
          <p>No se encontraron artistas.</p>
        )}
      </ul>
      <div className="flex justify-between mt-4">
        <button
          disabled={!data.previous}
          onClick={() => setPage((page) => Math.max(page - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-70 text-black"
        >
          Anterior
        </button>
        <button
          disabled={!data.next}
          onClick={() => setPage((page) => page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Artists;