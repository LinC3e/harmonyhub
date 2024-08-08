import { useSong } from '../../context/SongContext';
import { useEffect, useState } from 'react';
import { FaTimes, FaChevronDown, FaChevronUp, FaPlay, FaPause } from 'react-icons/fa';

const GlobalSongCard = () => {
  const { currentSong, setCurrentSong, currentTime, setCurrentTime } = useSong();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastSongTitle, setLastSongTitle] = useState('');

  useEffect(() => {
    const audioElement = document.getElementById('global-audio');
    if (audioElement) {
      if (currentSong.title !== lastSongTitle) {
        audioElement.pause();
        audioElement.currentTime = 0;
        setCurrentTime(0);
        audioElement.play();
        setIsPlaying(true);
        setIsMinimized(false);
        setLastSongTitle(currentSong.title);
        console.log(currentSong.title)
      }
    }
  }, [currentSong, lastSongTitle, setCurrentTime]);

  useEffect(() => {
    const audioElement = document.getElementById('global-audio');
    if (audioElement) {
      audioElement.currentTime = currentTime;
    }
  }, [currentTime]);

  useEffect(() => {
    const audioElement = document.getElementById('global-audio');
    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [setCurrentTime]);

  const handleClose = () => {
    setCurrentSong(null);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    const audioElement = document.getElementById('global-audio');
    setCurrentTime(audioElement.currentTime); // guardamos el current time cuando se minimiza
    setIsPlaying(false);
  };

  const handlePlay = () => {
    const audioElement = document.getElementById('global-audio');
    if (audioElement) {
      audioElement.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    const audioElement = document.getElementById('global-audio');
    if (audioElement) {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  if (!currentSong) return null;

  return (
    <div
      className={`bg-background border fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md text-white p-4 shadow-lg rounded-t-lg z-50 transition-all duration-300 ${isMinimized ? 'h-24' : 'h-auto'}`}
    >
      <div className="flex items-center justify-between">
        <h2 className={`text-lg font-semibold ${isMinimized ? 'text-center' : ''}`}>
          {currentSong.title}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleMinimize}
            className="text-white bg-primary hover:bg-green-700"
            aria-label={isMinimized ? 'Expandir' : 'Minimizar'}
          >
            {isMinimized ? <FaChevronDown size={20} /> : <FaChevronUp size={20} />}
          </button>
          <button
            onClick={handleClose}
            className="text-white bg-red-500 hover:text-white hover:bg-red-700"
            aria-label="Cerrar"
          >
            <FaTimes size={20} />
          </button>
        </div>
      </div>
      {!isMinimized && (
        <div className="mt-2 space-y-2">
          {currentSong.year && <p className="text-sm">Año: {currentSong.year}</p>}
          {currentSong.duration && <p className="text-sm">Duración: {currentSong.duration} segundos</p>}
          {currentSong.song_file && (
            <div className="mt-2">
              <audio controls className="w-full rounded-lg text-black" id="global-audio" autoPlay>
                <source src={currentSong.song_file} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
          )}
          {currentSong.album && <p className="text-sm">Álbum: {currentSong.album}</p>}
          <p className="text-sm">Propietario: {currentSong.owner}</p>
          {currentSong.artists && currentSong.artists.length > 0 && (
            <p className="text-sm">Artistas: {currentSong.artists.join(', ')}</p>
          )}
          {currentSong.genres && currentSong.genres.length > 0 && (
            <p className="text-sm">Géneros: {currentSong.genres.join(', ')}</p>
          )}
        </div>
      )}
      {isMinimized && currentSong.song_file && (
        <div className="mt-2 flex items-center justify-between p-1">
          <p className="text-sm mb-5">{currentSong.title}</p>
          <button
            onClick={isPlaying ? handlePause : handlePlay}
            className="text-white bg-blue-500 hover:text-gray-300 hover:bg-blue-700 mb-7"
          >
            {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
          </button>
          <audio className="w-24" id="global-audio">
            <source src={currentSong.song_file} type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      )}
    </div>
  );
};

export default GlobalSongCard;