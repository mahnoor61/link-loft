import React, { createContext, useState } from 'react';

export const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContext.Provider value={{ isOpen, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};
