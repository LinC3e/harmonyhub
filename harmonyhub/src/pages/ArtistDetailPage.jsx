import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";

const ArtistDetailPage = () => {
  const { id } = useParams();
  const { data, loading, error, callApi } = useAxios(`/harmonyhub/artists/${id}`, 'GET', []);
  
  useEffect(() => {
    callApi();
  }, [callApi, id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.detail}</p>;

  const artist = data;

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      {artist ? (
        <>
          <h2 className="text-xl font-semibold">{artist.name}</h2>
          {artist.bio && <p>Biografía: {artist.bio}</p>}
          {artist.website && (
            <p>
              Página web: <a href={artist.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{artist.website}</a>
            </p>
          )}
          {artist.image && (
            <div className="mt-4">
              <img src={artist.image} alt={artist.name} className="w-full max-w-xs rounded-md object-cover" />
            </div>
          )}
          <p>Propietario: {artist.owner}</p>
          {artist.songs && artist.songs.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Canciones:</h3>
              <ul className="list-disc list-inside">
                {artist.songs.map((songId) => (
                  <li key={songId}>
                    <Link to={`/songs/${songId}`} className="text-blue-500 hover:underline">
                      Canción {songId}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p>No se encontró el artista.</p>
      )}
    </div>
  );
};

export default ArtistDetailPage;