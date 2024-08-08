import { createContext, useState, useContext } from 'react';

const SongContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSong = () => useContext(SongContext);

// eslint-disable-next-line react/prop-types
export const SongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong, currentTime, setCurrentTime }}>
      {children}
    </SongContext.Provider>
  );
};
