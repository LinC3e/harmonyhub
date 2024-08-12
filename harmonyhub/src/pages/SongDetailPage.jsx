import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSong } from "../context/SongContext";
import useAxios from "../hooks/useAxios";

const SongDetailPage = () => {
  const { id } = useParams();
  const { setCurrentSong } = useSong();
  const { data, loading, error, callApi } = useAxios(`/harmonyhub/songs/${id}`, 'GET', []);
  
  useEffect(() => {
    callApi();
  }, [callApi, id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.detail}</p>;

  const song = data;

  return (
    <div className="mt-32 p-6 border border-gray-200 rounded-lg flex flex-col items-center bg-gray-800 text-white space-y-4 animate-fade-in">
      {song ? (
        <>
          <h2 className="text-xl font-semibold text-green-500 animate-slide-down">{song.title}</h2>
          {song.year && <p className="text-base">Año: {song.year}</p>}
          {song.duration && <p className="text-base">Duración: {song.duration} segundos</p>}
          {song.song_file && (
            <div className="w-full flex flex-col items-center">
              <div className="relative w-full max-w-md bg-gray-900 border border-gray-600 rounded-lg shadow-lg p-4 hover:shadow-xl hover:border-green-500 transition-all duration-300 transform hover:scale-105 animate-slide-in">
                <audio
                  id="audio-player"
                  controls
                  className="w-full text-green-500"
                >
                  <source src={song.song_file} type="audio/mpeg" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>
            </div>
          )}
          {song.album && <p className="text-base">Álbum: {song.album}</p>}
          <p className="text-base">Propietario: {song.owner}</p>
          {song.artists && song.artists.length > 0 && (
            <p className="text-base">Artistas: {song.artists.join(', ')}</p>
          )}
          {song.genres && song.genres.length > 0 && (
            <p className="text-base">Géneros: {song.genres.join(', ')}</p>
          )}
          <button
            onClick={() => setCurrentSong(song)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:scale-105 transition-transform duration-300 animate-pulse-once"
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