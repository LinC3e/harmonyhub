import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { FaMusic } from 'react-icons/fa';

const ArtistDetailPage = () => {
  const { id } = useParams();
  const { data, loading, error, callApi } = useAxios(`/harmonyhub/artists/${id}`, 'GET', []);
  
  useEffect(() => {
    callApi();
  }, [callApi, id]);

  if (loading) return <p className="text-white">Cargando...</p>;
  if (error) return <p className="text-red-500">Error: {error.detail}</p>;

  const artist = data;

  return (
    <div className="bg-gray-900 min-h-screen p-6" style={{ paddingLeft: '3cm', paddingRight: '3cm' }}>
      <div className="flex items-center mb-6">
        <span className="text-white mr-2">{'>'}</span>
        <h1 className="text-xl font-bold text-white">Info Artista</h1>
      </div>
      {artist ? (
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">{artist.name}</h2>
            {artist.website && (
              <a href={artist.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {artist.website}
              </a>
            )}
          </div>
          <div className="flex flex-col lg:flex-row">
            {/* Imagen del Artista */}
            {artist.image ? (
              <img src={artist.image} alt={artist.name} className="w-full lg:w-1/2 rounded-lg object-cover shadow-lg mb-6 lg:mb-0 lg:mr-6" />
            ) : (
              <div className="w-full lg:w-1/2 h-48 bg-gray-700 rounded-lg flex items-center justify-center shadow-lg mb-6 lg:mb-0 lg:mr-6">
                <FaMusic className="text-gray-400 text-6xl" />
              </div>
            )}
            {/* Información del Artista */}
            <div className="flex-1">
              {artist.bio && (
                <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-4">
                  <h3 className="text-lg font-semibold text-green-400">Biografía:</h3>
                  <p className="text-white">{artist.bio}</p>
                </div>
              )}
              <div className="bg-gray-900 p-4 rounded-lg shadow-md mb-4">
                <h3 className="text-lg font-semibold text-green-400">Propietario:</h3>
                <p className="text-white">{artist.owner}</p>
              </div>
              {artist.songs && artist.songs.length > 0 && (
                <div className="bg-gray-900 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-green-400">Canciones:</h3>
                  <ul className="list-disc list-inside text-white">
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
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white">No se encontró el artista.</p>
      )}
    </div>
  );
};

export default ArtistDetailPage;