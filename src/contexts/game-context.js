import React, { createContext, useContext, useState } from 'react';

export const GameInstance = createContext();

export const GameInstanceProvider = ({ children }) => {
  const [instance, setInstance] = useState(null);

  return (
    <GameInstance.Provider value={{ instance, setInstance }}>
      {children}
    </GameInstance.Provider>
  );
};

export const useGameInstance = () => useContext(GameInstance);