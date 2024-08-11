import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";

const PlayListDetailPage = () => {
  const { id } = useParams();
  const { data, loading, error, callApi } = useAxios(`/harmonyhub/playlists/${id}`, 'GET', []);

  useEffect(() => {
    callApi();
  }, [callApi, id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.detail}</p>;

  const playlist = data;

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      {playlist ? (
        <>
          <h2 className="text-2xl font-semibold mb-2">Nombre de la PlayList: {playlist.name}</h2>
          {playlist.description && <p className="mb-2"><strong>Descripción:</strong> {playlist.description}</p>}
          <p className="mb-2">
            <strong>{playlist.public ? "Pública" : "Privada"}</strong>
          </p>
          <p className="mb-2">
            <strong>Propietario:</strong> {playlist.owner}
          </p>
          <h3>Canciones:</h3>
          {playlist.entries.length > 0 ? (
            <ul className="list-disc pl-5">
              {playlist.entries.map((songId) => (
                <li key={songId}>Canción ID: {songId}</li>
              ))}
            </ul>
          ) : (
            <p>No hay canciones en esta lista de reproducción.</p>
          )}
        </>
      ) : (
        <p>No se encontró la lista de reproducción.</p>
      )}
    </div>
  );
};

export default PlayListDetailPage;