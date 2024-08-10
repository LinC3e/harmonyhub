import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useSong } from "../context/SongContext";

const SongDetailPage = () => {
  const { id } = useParams();
  const { setCurrentSong } = useSong();
  const { data, loading, error, callApi } = useAxios(`/harmonyhub/songs/${id}`, 'GET', []);
  
  useEffect(() => {
    callApi();
  }, [callApi, id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.detail}</p>;

  const handlePlayGlobally = () => {
    setCurrentSong(song);
  };

  const song = data;

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      {song ? (
        <>
          <h2 className="text-xl font-semibold">{song.title}</h2>
          {song.year && <p>Año: {song.year}</p>}
          {song.duration && <p>Duración: {song.duration} segundos</p>}
          {song.song_file && (
            <audio controls>
              <source src={song.song_file} type="audio/mpeg" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          )}
          {song.album && <p>Álbum: {song.album}</p>}
          <p>Propietario: {song.owner}</p>
          {song.artists && song.artists.length > 0 && (
            <p>Artistas: {song.artists.join(', ')}</p>
          )}
          {song.genres && song.genres.length > 0 && (
            <p>Géneros: {song.genres.join(', ')}</p>
          )}
          <button
            onClick={handlePlayGlobally}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Escuchar globalmente
          </button>
        </>
      ) : (
        <p>No se encontró la canción.</p>
      )}
    </div>
  );
};

export default SongDetailPage;