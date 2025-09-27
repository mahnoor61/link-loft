
import { createContext, useContext, useState, useEffect } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isSoundOn, setIsSoundOn] = useState(true); // Default to true if no saved state

  useEffect(() => {
    // localStorage
    const storedSoundState = localStorage.getItem('isSoundOn');
    if (storedSoundState !== null) {
      setIsSoundOn(JSON.parse(storedSoundState));
    }
  }, []);

  const toggleSound = () => {
    const newState = !isSoundOn;
    setIsSoundOn(newState);
    localStorage.setItem('isSoundOn', JSON.stringify(newState)); // Save state to localStorage
  };

  return (
    <AudioContext.Provider value={{ isSoundOn, toggleSound }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);
