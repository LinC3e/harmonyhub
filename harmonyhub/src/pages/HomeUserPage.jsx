import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { FaAngleRight, FaMusic } from "react-icons/fa";
import { GiMicrophone, GiMusicalNotes } from "react-icons/gi";
import { Link } from "react-router-dom";

const HomeUserPage = () => {
  const { data: artistsData, loading: artistsLoading, error: artistsError, callApi: fetchArtists } = useAxios(`/harmonyhub/artists?page_size=9`, 'GET', []);
  const { data: songsData, loading: songsLoading, error: songsError, callApi: fetchSongs } = useAxios(`/harmonyhub/songs?page_size=9`, 'GET', []);
  const { data: playlistsData, loading: playlistsLoading, error: playlistsError, callApi: fetchPlaylist } = useAxios(`/harmonyhub/playlists?page_size=9`, 'GET', []);

  useEffect(() => {
    fetchArtists();
    fetchSongs();
    fetchPlaylist();
  }, [fetchArtists, fetchPlaylist, fetchSongs]);

  if (artistsLoading || songsLoading || playlistsLoading) return <p>Cargando...</p>;
  if (artistsError) return <p>Error en artistas: {artistsError.detail}</p>;
  if (songsError) return <p>Error en canciones: {songsError.detail}</p>;
  if (playlistsError) return <p>Error en playlists: {playlistsError.detail}</p>

  const artists = artistsData.results || [];
  const songs = songsData.results || [];
  const playlists = playlistsData.results || [];

  return (
    <div>
      {/* Artistas */}
      <div className="p-4 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FaAngleRight color="white" size={24} className="mr-2" />
            <h3 className="font-bold text-xl">Últimos Artistas</h3>
          </div>
          <Link
            to="/artists"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Mostrar Todos
          </Link>
        </div>
        <div className="inline-flex gap-4">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="inline-flex flex-col items-center bg-[#121212] p-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-[#1d1d1d] w-40"
            >
              {artist.image ? (
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <GiMicrophone className="text-gray-400 text-3xl" />
                </div>
              )}
              <h3 className="text-sm font-semibold text-center truncate">{artist.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Canciones */}
      <div className="p-4 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FaAngleRight color="white" size={24} className="mr-2" />
            <h3 className="font-bold text-xl">Últimas Canciones</h3>
          </div>
          <Link
            to="/songs"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Mostrar Todos
          </Link>
        </div>
        <div className="inline-flex gap-4">
        {songs.map((song) => (
            <Link
              key={song.id}
              to={`/songs/${song.id}`}
              className="inline-flex flex-col items-center bg-[#121212] p-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-[#1d1d1d] hover:text-yellow-400 w-40"
            >
              {song.cover ? (
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <GiMusicalNotes className="text-gray-400 text-3xl" />
                </div>
              )}
              <h3 className="text-sm font-semibold text-center truncate">{song.title}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* PlayLists */}
      <div className="p-4 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FaAngleRight color="white" size={24} className="mr-2" />
            <h3 className="font-bold text-xl">Últimas PlayLists</h3>
          </div>
          <Link
            to="/playlists"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Mostrar Todos
          </Link>
        </div>
        <div className="inline-flex gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="inline-flex flex-col items-center bg-[#121212] p-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-[#1d1d1d] w-40"
            >
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <FaMusic className="text-gray-400 text-3xl" />
            </div>
              <h3 className="text-sm font-semibold text-center truncate">{playlist.name}</h3>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default HomeUserPage;