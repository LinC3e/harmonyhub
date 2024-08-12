import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSong } from "../context/SongContext";
import useAxios from "../hooks/useAxios";
import Loading from "../components/app/Loading";

const SongDetailPage = () => {
  const { id } = useParams();
  const { setCurrentSong } = useSong();
  
  const { data: songData, loading: songLoading, error: songError, callApi: getSong } = useAxios(`/harmonyhub/songs/${id}`, 'GET', []);
  const { data: ownerData, loading: ownerLoading, error: ownerError, callApi: getOwner } = useAxios(`/users/profiles/${songData.owner}`, 'GET', []);
  console.log(songData.owner)
  const [song, setSong] = useState(null);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    getSong();
  }, [getSong, id]);

  useEffect(() => {
    if (songData) {
      setSong(songData);
      if (songData.owner) {
        getOwner();
      }
    }
  }, [songData, getOwner]);

  useEffect(() => {
    if (ownerData) {
      setOwner(ownerData);
    }
  }, [ownerData]);

  if (songLoading || ownerLoading) return <Loading />;
  if (songError) return <p>Error al obtener canción: {songError.detail}</p>;
  if (ownerError) return <p>Error al obtener owner: {ownerError.detail}</p>;

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center">
      {song ? (
        <div className="max-w-3xl w-full bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-lg">
          {song.cover && (
            <div className="flex justify-center mb-6">
              <img
                src={song.cover}
                alt={`Portada de ${song.title}`}
                className="w-full max-w-xs h-auto rounded-lg border border-gray-600"
              />
            </div>
          )}
          <h2 className="text-3xl font-semibold text-green-400 mb-2">{song.title}</h2>
          {song.year && <p className="text-lg text-gray-300">Año: {song.year}</p>}
          {song.duration && <p className="text-lg text-gray-300">Duración: {song.duration} segundos</p>}
          
          {song.song_file && (
            <div className="w-full my-4">
              <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <audio
                  id="audio-player"
                  controls
                  className="w-full text-green-400"
                >
                  <source src={song.song_file} type="audio/mpeg" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>
            </div>
          )}
          
          {song.album && <p className="text-lg text-gray-300">Álbum: {song.album}</p>}

          {/* Tarjeta del propietario */}
          {owner && (
            <div className="mt-6 max-w-xs w-full bg-gray-700 p-4 border border-gray-600 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-400 mb-2">Propietario</h3>
              <p className="text-lg text-gray-300">Nombre de usuario: <span className="font-medium">{owner.username}</span></p>
              <p className="text-lg text-gray-300">Nombre: <span className="font-medium">{owner.first_name} {owner.last_name}</span></p>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setCurrentSong(song)}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Escuchar globalmente
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">No se encontró la canción.</p>
      )}
    </div>
  );
};

export default SongDetailPage;